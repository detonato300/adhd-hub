# ADHD OS - Init System (Windows PowerShell)
Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-FreePort([int]$startPort) {
    $port = $startPort
    while ($true) {
        $connection = Test-NetConnection -ComputerName localhost -Port $port -WarningAction SilentlyContinue
        if (-not $connection.TcpTestSucceeded) {
            return $port
        }
        $port++
    }
}

function Generate-Password([int]$length = 32) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    $password = ""
    for ($i = 0; $i -lt $length; $i++) {
        $password += $chars[(Get-Random -Maximum $chars.Length)]
    }
    return $password
}

try {
    Write-Output "--- ADHD OS - System Status ---"
    
    # 1. Check Docker Status
    $dockerContainers = docker ps --format "{{.Names}} | {{.Ports}}"
    $activeContainers = @(docker ps -q)
    $activeCount = $activeContainers.Count
    
    $adhdContainers = @($dockerContainers | Where-Object { $_ -match "adhdos" })
    
    Write-Output "[i] Active Docker containers: $activeCount"
    if ($adhdContainers.Count -gt 0) {
        Write-Output "[i] Current ADHD OS Ports: $adhdContainers"
    } else {
        Write-Output "[i] ADHD OS not running."
    }

    # 2. Port Detection with conflict resolution
    $DB_PORT = Get-FreePort 5432
    $APP_PORT = Get-FreePort 3000
    $PGADMIN_PORT = Get-FreePort 8080

    Write-Output "-------------------------------"
    Write-Output "[+] Target Configuration:"
    Write-Output "    App Port: $APP_PORT"
    Write-Output "    DB Port: $DB_PORT"
    Write-Output "    pgAdmin: $PGADMIN_PORT"

    # 3. Credentials (only if .env doesn't exist to avoid overwriting)
    if (-not (Test-Path ".env")) {
        $DB_PASSWORD = Generate-Password
        $PGADMIN_PASSWORD = Generate-Password
        $JWT_SECRET = Generate-Password 64
        $N8N_SECRET = Generate-Password 32

        $envContent = @"
# --- ADHD OS AUTO-GENERATED ---
ADHDOS_DB_PORT=$DB_PORT
ADHDOS_APP_PORT=$APP_PORT
ADHDOS_PGADMIN_PORT=$PGADMIN_PORT
POSTGRES_PASSWORD=$DB_PASSWORD
PGADMIN_DEFAULT_PASSWORD=$PGADMIN_PASSWORD
JWT_SECRET=$JWT_SECRET

# --- N8N AUTOMATION (VPS) ---
# URL do Twojego n8n na VPS (np. https://n8n.twoja-domena.pl/webhook/uuid)
N8N_WEBHOOK_URL=change_me_in_env
# Klucz przesyłany w nagłówku X-ADHD-HUB-KEY
N8N_API_KEY=$N8N_SECRET
"@
        $envContent | Out-File -FilePath ".env" -Encoding UTF8
        Write-Output "[+] New .env file generated with secure passwords."
    } else {
        Write-Output "[i] .env file already exists. Skipping password generation."
    }

    Write-Output "[OK] Ready to launch. Run 'docker compose up -d'"
}
catch {
    Write-Error "[!] Error: $_"
}
