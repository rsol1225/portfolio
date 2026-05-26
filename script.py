import json
import os
import re
import subprocess

# REPLACE HTML WITH CONTENT.JSON

# Your current directory setup
TEMPLATE_DIR = "."
OUTPUT_DIR = "generated/"
DATA_FILE = "data/content.json"

# Load JSON data
with open(DATA_FILE, "r") as f:
    data = json.load(f)


# Resolve dot-notation like "thinking.reading.topic"
def resolve_path(data, path):
    keys = path.split(".")
    current = data

    for key in keys:
        if isinstance(current, dict) and key in current:
            current = current[key]
        else:
            return f"{{MISSING:{path}}}"

    return current


# Replace {{...}} in HTML
def render(html, data):
    pattern = r"\{\{(.*?)\}\}"

    matches = re.findall(pattern, html)

    for match in matches:
        value = resolve_path(data, match.strip())
        html = html.replace(f"{{{{{match}}}}}", str(value))

    return html

# GITHUB PUSH
def push_to_github():
    commands = [
        ["git", "add", "-u"],
        ["git", "diff", "--cached", "--quiet"],  # check if anything is staged
    ]
    
    # Stage files
    subprocess.run(commands[0], capture_output=True, text=True)
    
    # Check if there's anything to commit
    check = subprocess.run(commands[1], capture_output=True, text=True)
    if check.returncode == 0:
        print("Nothing to commit, skipping push.")
        return
    
    # Commit and push
    for cmd in [
        ["git", "commit", "-m", "Update rendered HTML"],
        ["git", "push"],
    ]:
        result = subprocess.run(cmd, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"Error running {' '.join(cmd)}:\n{result.stderr}")
            break
        else:
            print(result.stdout.strip())


# Create output folder if it doesn't exist
os.makedirs(OUTPUT_DIR, exist_ok=True)


# Process all HTML files in current directory
for filename in os.listdir(TEMPLATE_DIR):
    if filename.endswith(".html"):
        input_path = os.path.join(TEMPLATE_DIR, filename)
        output_path = os.path.join(OUTPUT_DIR, filename)

        with open(input_path, "r") as f:
            html = f.read()

        rendered_html = render(html, data)

        with open(output_path, "w") as f:
            f.write(rendered_html)

        print(f"Rendered: {filename}")

print("Done rendering.")
print("Pushing to github...")
push_to_github()




