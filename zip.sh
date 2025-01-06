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

# Check if required directories exist
if [ ! -d "vendor" ]; then
    error "vendor directory not found. Have you run composer install?"
    exit 1
fi

status "Starting build process for $PLUGIN_SLUG"

# Remove existing build directory and create a new one
rm -rf "$BUILD_DIR"
mkdir -p "$BUILD_DIR"

status "Generating build..."
if ! npm run build:production && npm run build:dev; then
    error "Build failed"
    exit 1
fi

status "Copying files to build directory..."

# Create vendor directory structure
mkdir -p "$BUILD_DIR/vendor"

# Copy composer autoloader and dependencies
if [ -f "vendor/autoload.php" ]; then
    cp "vendor/autoload.php" "$BUILD_DIR/vendor/"

    # Ensure composer directory exists and copy it
    if [ -d "vendor/composer" ]; then
        mkdir -p "$BUILD_DIR/vendor/composer"
        cp -R vendor/composer/* "$BUILD_DIR/vendor/composer/"
    else
        error "vendor/composer directory not found"
        exit 1
    fi
else
    error "vendor/autoload.php not found"
    exit 1
fi

# Define files and directories to copy
FILES_AND_DIRS=(
    "$PLUGIN_SLUG.php"
    "assets"
    "helpers"
    "includes"
    "scoped"
    "readme.txt"
    "CONTRIBUTING.md"
)

# Copy files and directories
for item in "${FILES_AND_DIRS[@]}"; do
    if [ -e "$item" ]; then
        if [ -d "$item" ]; then
            cp -R "$item" "$BUILD_DIR"
            # Remove hidden files and directories from copied directory
            find "$BUILD_DIR/$item" -type f -name ".*" -delete
            find "$BUILD_DIR/$item" -type d -name ".*" -exec rm -rf {} +
        elif [ -f "$item" ]; then
            cp "$item" "$BUILD_DIR"
        fi
    else
        warning "Optional item not found: $item"
    fi
done

status "Creating archive..."
(
    cd "$BUILD_DIR" || exit 1
    zip -r -q "../$PLUGIN_SLUG.zip" .
)

status "Cleaning up..."
rm -rf "$BUILD_DIR"/*

status "Moving archive to build directory..."
mv "$PLUGIN_SLUG.zip" "$BUILD_DIR/"

success "Build complete! Archive created at $BUILD_DIR/$PLUGIN_SLUG.zip"
