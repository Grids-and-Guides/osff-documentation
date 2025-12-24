# Contributing to OSFF Documentation

Thank you for your interest in contributing to the OSFF Documentation! We welcome contributions from everyone. Here's how you can help:

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Reporting Issues](#reporting-issues)
- [License](#license)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** the project to your own machine
3. **Commit** changes to your own branch
4. **Push** your work back up to your fork
5. Submit a **Pull Request** so that we can review your changes

## Development Setup

1. **Fork and Clone**
   - First, fork the repository on GitHub
   - Then clone your forked repository:
     ```bash
     git clone https://github.com/your-username/osff-documentation.git
     cd osff-documentation
     ```

2. **Create and Checkout New Branch**
   - Create and switch to a new branch for your changes:
     ```bash
     git checkout -b feature/your-feature-name
     ```
     or for bug fixes:
     ```bash
     git checkout -b bugfix/description-of-fix
     ```

3. **Install Dependencies**
   - Install dependencies using frozen lockfile:
     ```bash
     pnpm install --frozen-lockfile
     ```

4. **Run Development Server and Type Checking**
   - Start the development server in one terminal:
     ```bash
     pnpm dev
     ```
   - In another terminal, run type checking:
     ```bash
     pnpm type
     ```
   - Open `http://localhost:5173` in your browser

5. **Make Your Changes**
   - Implement your changes following the project's coding standards
   - Test your changes thoroughly

6. **Commit Your Changes**
   - Stage your changes:
     ```bash
     git add .
     ```
   - Commit with a clear, descriptive message:
     ```bash
     git commit -m "feat: add new feature"
     # or
     git commit -m "fix: resolve issue with component"
     ```

7. **Create a Pull Request**
   - Push your changes to your fork:
     ```bash
     git push origin your-branch-name
     ```
   - Use GitHub CLI to create a pull request:
     ```bash
     gh pr create
     ```
   - If you don't have GitHub CLI, you can create the PR through GitHub's web interface

## Pull Request Process

1. Ensure any install or build dependencies are removed before the end of the layer when doing a build
2. Update the README.md with details of changes to the interface, this includes new environment variables, exposed ports, useful file locations and container parameters
3. Increase the version numbers in any examples files and the README.md to the new version that this Pull Request would represent
4. Your pull request should target the `main` branch
5. Ensure the test suite passes
6. You may merge the Pull Request once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you

## Code Style

- Follow the existing code style in the project
- Use meaningful variable and function names
- Keep functions small and focused on a single task
- Add comments to explain complex logic
- Ensure all tests pass before submitting a pull request

## Reporting Issues

When creating an issue, please include:

- A clear title and description
- Steps to reproduce the issue
- Expected vs. actual behavior
- Any relevant error messages
- Your environment (OS, Node.js version, etc.)

## License

By contributing, you agree that your contributions will be licensed under the project's [LICENSE](LICENSE) file.

## Thank You!

Your contributions to open source, large or small, make great projects like this possible. Thank you for taking the time to contribute!
