#!/usr/bin/env bash

# Exit if any command fails
set -e

# Change to the script's directory
cd "$(dirname "$0")"
DIR=$(pwd)
BUILD_DIR="$DIR/build"
PLUGIN_SLUG="sheet-wise"

# Color codes for prettier console output
BLUE_BOLD='\033[1;34m'
GREEN_BOLD='\033[1;32m'
RED_BOLD='\033[1;31m'
YELLOW_BOLD='\033[1;33m'
COLOR_RESET='\033[0m'

# Helper functions for colorful console output
error() { echo -e "\n${RED_BOLD}$1${COLOR_RESET}\n"; }
status() { echo -e "\n${BLUE_BOLD}$1${COLOR_RESET}\n"; }
success() { echo -e "\n${GREEN_BOLD}$1${COLOR_RESET}\n"; }
warning() { echo -e "\n${YELLOW_BOLD}$1${COLOR_RESET}\n"; }

status "Starting build process for $PLUGIN_SLUG"

# Remove existing build directory and create a new one
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

status "Generating build..."
npm run build

status "Copying files to build directory..."
FILES_AND_DIRS=(
    "$PLUGIN_SLUG.php"
    "assets"
    "helpers"
    "includes"
    "libs"
    "scoped"
)

for item in "${FILES_AND_DIRS[@]}"; do
    if [[ -e "$item" && ! "$item" =~ /\..* ]]; then
        if [ -d "$item" ]; then
            cp -R "$item" "$BUILD_DIR"
            # Remove hidden files and directories from copied directory
            find "$BUILD_DIR/$item" -name ".*" -exec rm -rf {} +
        elif [ -f "$item" ]; then
            cp "$item" "$BUILD_DIR"
        fi
    else
        warning "Item not found or is hidden: $item"
    fi
done

status "Creating archive..."
(cd "$BUILD_DIR" && zip -r -q "../$PLUGIN_SLUG.zip" .)

status "Cleaning up build directory..."
rm -rf "$BUILD_DIR"/*

status "Moving archive to build directory..."
mv "$PLUGIN_SLUG.zip" "$BUILD_DIR"

success "Build complete! Archive created at $BUILD_DIR/$PLUGIN_SLUG.zip"
