# Contributing to Sheet Wise Plugin

We appreciate your interest in contributing to the **Sheet Wise Plugin**, a tool that seamlessly syncs WordPress data to Google Sheets. This guide will help you get started with contributing, whether you're fixing bugs, adding new features, or improving documentation.

## Table of Contents

- [Getting Started](#getting-started)
- [Forking the Repository](#forking-the-repository)
- [Making Changes](#making-changes)
- [Commit Messages](#commit-messages)
- [Submitting Your Pull Request](#submitting-your-pull-request)
- [Code of Conduct](#code-of-conduct)

## Getting Started

Before contributing, make sure you have the following:

1. **Node.js v18** (required for running build scripts and development tasks).
2. **PHP 7.4** or higher (required to run WordPress and the plugin).
3. A local copy of the **Sheet Wise** plugin repository.

### Setting Up the Project

1. **Clone the repository**:
    ```bash
    git clone https://github.com/sapayth/sheet-wise.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd sheet-wise
    ```

3. **Install PHP and Composer dependencies**:
   If you don't have Composer installed, download and install it from [getcomposer.org](https://getcomposer.org).
    ```bash
    composer install
    ```

4. **Install JavaScript (Node.js) dependencies**:
    ```bash
    npm install
    ```

5. **Set up the plugin** in your local WordPress environment.

## Forking the Repository

To contribute, please fork the repository and create a pull request with your changes:

1. **Fork the repository**: Click the "Fork" button at the top-right of the GitHub page.
2. **Clone your fork** to your local machine:
    ```bash
    git clone https://github.com/your-username/sheet-wise.git
    ```

## Making Changes

When making changes, follow these guidelines:

### Code Style

- Follow **WordPress coding standards** for PHP, JavaScript, and CSS.
- Ensure **consistent indentation** (4 spaces per indentation level).
- Provide **descriptive commit messages** explaining the purpose of the changes.
- Use **predefined placeholders** (like `[[first_name]]`, `[[user_login]]`) when mapping WordPress data to Google Sheets, as seen in the integration setup guide.

### New Features or Bug Fixes

1. Create a **new branch** for each feature or bug fix:
    ```bash
    git checkout -b feature/your-feature-name
    ```

2. Implement your changes, ensuring that the new feature or fix works with the existing hooks and Google API integrations.

3. **Test thoroughly**. Use the provided hooks like `user_register`, `save_post`, and `wp_insert_comment` to test data synchronization with Google Sheets.

4. **Commit your changes**:
    ```bash
    git add .
    git commit -m "feat: Add new hook for syncing comments"
    ```

### Documentation

If you're updating or adding documentation:

- Ensure that the **step-by-step guide** in `readme.txt` is clear.
- Update the **FAQ section** if needed to answer common questions.
- Ensure that all instructions related to **Google API setup** are up-to-date.

## Commit Messages

We follow a consistent commit message format:

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation updates.
- **style**: Formatting changes (no code changes).
- **refactor**: Refactor code (no changes to functionality).
- **perf**: Performance improvements.
- **test**: Add or modify tests.


## Submitting Your Pull Request

Once you're ready to submit your changes:

1. **Push your changes** to your fork:
    ```bash
    git push origin feature/your-feature-name
    ```

2. Open a **pull request** (PR) to the main repository, describing your changes in detail.

3. Ensure your PR is linked to any relevant **issues**.

4. The maintainers will review your PR and may request changes.

## Code of Conduct

By participating in this project, you agree to abide by the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/0/code_of_conduct/).

