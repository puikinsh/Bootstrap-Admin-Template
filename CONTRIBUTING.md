# Contributing to Metis Admin Template

Thank you for your interest in contributing to the Metis Admin Template! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Reporting Issues](#reporting-issues)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment. Please:

- Be respectful and considerate in all interactions
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Accept differing viewpoints gracefully

---

## Getting Started

### Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **Code editor** - We recommend [VS Code](https://code.visualstudio.com/)

### Fork and Clone

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

```bash
git clone https://github.com/YOUR_USERNAME/Bootstrap-Admin-Template-3.git
cd Bootstrap-Admin-Template-3
```

3. **Add upstream remote**:

```bash
git remote add upstream https://github.com/puikinsh/Bootstrap-Admin-Template-3.git
```

---

## Development Setup

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The development server will start at `http://localhost:3000` with hot module replacement enabled.

### Useful Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run check        # Run lint + format check
```

---

## Making Changes

### Branch Naming

Create a descriptive branch name:

```bash
# Features
git checkout -b feature/add-dark-mode-toggle

# Bug fixes
git checkout -b fix/sidebar-collapse-issue

# Documentation
git checkout -b docs/update-readme

# Refactoring
git checkout -b refactor/improve-chart-performance
```

### Commit Messages

Follow conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Maintenance tasks

**Examples:**

```bash
feat(sidebar): add collapsible menu sections

fix(charts): resolve memory leak on page navigation

docs(readme): update installation instructions

style(forms): improve input field spacing
```

### Keep Commits Atomic

- Each commit should represent a single logical change
- Avoid mixing unrelated changes in one commit
- Keep commits small and focused

---

## Submitting Changes

### Before Submitting

1. **Sync with upstream**:

```bash
git fetch upstream
git rebase upstream/main
```

2. **Run checks**:

```bash
npm run check
npm run build
```

3. **Test your changes**:
   - Test in multiple browsers (Chrome, Firefox, Safari)
   - Test responsive layouts
   - Test dark/light mode

### Pull Request Process

1. **Push your branch**:

```bash
git push origin feature/your-feature-name
```

2. **Create Pull Request** on GitHub

3. **Fill out the PR template**:
   - Describe what changes you made
   - Reference any related issues
   - Include screenshots for UI changes

4. **Address review feedback** if requested

### PR Title Format

```
type(scope): description
```

Examples:
- `feat(dashboard): add real-time notifications`
- `fix(forms): resolve validation error display`
- `docs: add deployment guide`

---

## Style Guidelines

### JavaScript

- Use ES6+ features (arrow functions, destructuring, etc.)
- Use meaningful variable and function names
- Keep functions small and focused
- Add comments for complex logic

```javascript
// Good
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price, 0);
};

// Avoid
const calc = (i) => i.reduce((s, x) => s + x.p, 0);
```

### SCSS

- Follow BEM naming convention
- Use variables for colors, spacing, etc.
- Keep selectors specific but not overly nested

```scss
// Good
.card {
  &__header {
    padding: $spacer;
  }

  &__title {
    font-weight: $font-weight-semibold;
  }

  &--primary {
    border-color: $primary;
  }
}

// Avoid deep nesting
.card {
  .header {
    .title {
      .text {
        // Too deep!
      }
    }
  }
}
```

### HTML

- Use semantic HTML elements
- Include ARIA labels for accessibility
- Keep indentation consistent (2 spaces)

```html
<!-- Good -->
<nav aria-label="Main navigation">
  <ul class="nav-list">
    <li class="nav-item">
      <a href="#" class="nav-link">Home</a>
    </li>
  </ul>
</nav>

<!-- Avoid -->
<div onclick="navigate()">
  <div>
    <div>Home</div>
  </div>
</div>
```

### Alpine.js Components

- Keep components focused and reusable
- Use descriptive data property names
- Document complex logic

```javascript
Alpine.data('searchComponent', () => ({
  query: '',
  results: [],
  isLoading: false,

  async search() {
    if (!this.query.trim()) return;

    this.isLoading = true;
    try {
      this.results = await this.fetchResults(this.query);
    } finally {
      this.isLoading = false;
    }
  },

  async fetchResults(query) {
    // Implementation
  }
}));
```

---

## Reporting Issues

### Before Reporting

1. Search existing issues to avoid duplicates
2. Try the latest version to see if it's already fixed
3. Gather relevant information

### Issue Template

**Bug Report:**

```markdown
## Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen.

## Actual Behavior
What actually happens.

## Environment
- Browser: Chrome 120
- OS: macOS 14
- Node.js: 20.10.0

## Screenshots
If applicable, add screenshots.
```

**Feature Request:**

```markdown
## Description
A clear description of the feature.

## Use Case
Why this feature would be useful.

## Proposed Solution
How you think it could be implemented.

## Alternatives Considered
Other approaches you've considered.
```

---

## Questions?

If you have questions about contributing:

1. Check existing [GitHub Discussions](https://github.com/puikinsh/Bootstrap-Admin-Template-3/discussions)
2. Open a new discussion for general questions
3. Open an issue for bugs or feature requests

---

Thank you for contributing to Metis Admin Template!
