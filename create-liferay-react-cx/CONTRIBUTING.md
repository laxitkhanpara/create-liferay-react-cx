# Contributing to create-liferay-react-cx

Thank you for your interest in contributing! 🎉

## How to Contribute

### Reporting Bugs

1. Check if the issue already exists in [Issues](https://github.com/laxitkhanpara/create-liferay-react-cx/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Your environment (Node version, OS, npm version)

### Suggesting Features

Open an issue with:
- Clear use case
- Expected behavior
- Why it benefits users

### Pull Requests

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/your-feature-name`
3. **Make changes** and test thoroughly
4. **Commit** with clear messages: `git commit -m "feat: add XYZ feature"`
5. **Push**: `git push origin feature/your-feature-name`
6. **Open a PR** with a clear description

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/create-liferay-react-cx.git
cd create-liferay-react-cx

# Install dependencies
npm install

# Test the CLI locally
node bin/index.js test-project

# Clean up
rm -rf test-project
```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation changes
- `chore:` maintenance tasks
- `refactor:` code refactoring

### Code Style

- Use ES modules (`import`/`export`)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and small

### Testing

Before submitting:

```bash
# Test with different arguments
node bin/index.js my-app
node bin/index.js --name test-app --react-version 18.2.0
node bin/index.js --help
```

## Questions?

Feel free to open an issue for any questions or discussions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.