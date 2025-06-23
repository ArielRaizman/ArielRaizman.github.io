#!/bin/bash

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "Error: 'jq' is not installed. Please install it to run this script."
    echo "  On Debian/Ubuntu: sudo apt-get install jq"
    echo "  On macOS: brew install jq"
    exit 1
fi

# Check if a directory argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <directory_path>"
    echo "Example: $0 /path/to/your/images"
    exit 1
fi

TARGET_DIR="$1"
OUTPUT_FILE="image_data.json"
TEMP_FILE=$(mktemp) # Create a temporary file for intermediate JSON objects

echo "Processing images in: $TARGET_DIR"
echo "Output will be saved to: $OUTPUT_FILE"

# Initialize the JSON array
echo "[" > "$TEMP_FILE"

# Find all JPG files and process them
find "$TARGET_DIR" -type f -iname "*.jpg" -o -iname "*.jpeg" | while read -r filepath; do
    # Get the image name (basename)
    image_name=$(basename "$filepath")

    # Get the subdirectory path relative to the target directory
    # Remove the target directory prefix and ensure it's relative
    location=$(dirname "$filepath" | sed "s|^${TARGET_DIR}/||")

    # If the image is directly in the target directory, location will be "" or "."
    # We want it to be empty string for the top level.
    if [ "$location" = "." ]; then
        location=""
    fi

    # Create a JSON object for the current image
    jq -n --arg name "$image_name" --arg loc "$location" '{"image_name": $name, "location": $loc}' >> "$TEMP_FILE"
    echo "," >> "$TEMP_FILE" # Add a comma for the next object
done

# Remove the last comma from the temporary file (if any images were found)
sed -i '$s/,$//' "$TEMP_FILE"

# Close the JSON array
echo "]" >> "$TEMP_FILE"

# Move the temporary file to the final output file
mv "$TEMP_FILE" "$OUTPUT_FILE"

echo "Done! Image data saved to $OUTPUT_FILE"