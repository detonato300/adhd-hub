import json
import sys
import os

def search_skills(query, catalog_path):
    if not os.path.exists(catalog_path):
        print(f"Error: Catalog not found at {catalog_path}")
        return

    with open(catalog_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    skills = data.get('skills', [])
    results = []

    query = query.lower()
    for skill in skills:
        # Search in name, description, tags, and triggers
        search_fields = [
            skill.get('name', ''),
            skill.get('description', ''),
            " ".join(skill.get('tags', [])),
            " ".join(skill.get('triggers', []))
        ]
        
        if any(query in field.lower() for field in search_fields):
            results.append(skill)

    if not results:
        print(f"No skills found for query: '{query}'")
    else:
        print(f"--- Found {len(results)} skills for '{query}' ---")
        for s in results:
            print(f"ID: {s['id']}")
            print(f"Name: {s['name']}")
            print(f"Desc: {s['description'][:100]}...")
            print(f"Path: {s['path']}")
            print("-" * 30)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python search-skills.py <keyword>")
    else:
        catalog_path = "Skills DBs/antigravity-awesome-skills/data/catalog.json"
        search_skills(sys.argv[1], catalog_path)
