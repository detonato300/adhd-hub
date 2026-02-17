#!/usr/bin/env bash
# ADHD OS - Init System (Unix Bash)
set -Eeuo pipefail

get_free_port() {
    local port=$1
    while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; do
        port=$((port+1))
    done
    echo "$port"
}

generate_password() {
    local length=${1:-32}
    LC_ALL=C tr -dc 'A-Za-z0-9' < /dev/urandom | head -c "$length"
}

printf "--- ADHD OS - System Status ---\n"

# 1. Check Docker Status
if command -v docker >/dev/null 2>&1; then
    ACTIVE_COUNT=$(docker ps -q | wc -l)
    printf "[i] Active Docker containers: %s\n" "$ACTIVE_COUNT"
    
    ADHD_CONTAINERS=$(docker ps --format "{{.Names}} | {{.Ports}}" | grep "adhdos" || true)
    if [ -n "$ADHD_CONTAINERS" ]; then
        printf "[i] Current ADHD OS Ports:\n%s\n" "$ADHD_CONTAINERS"
    else
        printf "[i] ADHD OS not running.\n"
    fi
else
    printf "[!] Docker not found. Please install Docker.\n"
fi

# 2. Port Detection
DB_PORT=$(get_free_port 5432)
APP_PORT=$(get_free_port 3000)
PGADMIN_PORT=$(get_free_port 8080)

printf "-------------------------------\n"
printf "[+] Target Configuration:\n"
printf "    App Port: %s\n" "$APP_PORT"
printf "    DB Port: %s\n" "$DB_PORT"
printf "    pgAdmin: %s\n" "$PGADMIN_PORT"

# 3. Credentials
if [ ! -f .env ]; then
    DB_PASSWORD=$(generate_password)
    PGADMIN_PASSWORD=$(generate_password)
    JWT_SECRET=$(generate_password 64)

    cat <<EOF > .env
# --- ADHD OS AUTO-GENERATED ---
ADHDOS_DB_PORT=$DB_PORT
ADHDOS_APP_PORT=$APP_PORT
ADHDOS_PGADMIN_PORT=$PGADMIN_PORT
POSTGRES_PASSWORD=$DB_PASSWORD
PGADMIN_DEFAULT_PASSWORD=$PGADMIN_PASSWORD
JWT_SECRET=$JWT_SECRET
EOF
    printf "[+] New .env file generated.\n"
else
    printf "[i] .env file already exists. Skipping generation.\n"
fi

printf "[OK] Ready to launch. Run 'docker compose up -d'\n"
