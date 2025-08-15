# Contributing Guide

Thank you for your interest in contributing to the Professional Pipeline Dashboard! This guide will help you get started with contributing to our project.

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- NPM 8.0.0 or higher  
- Git
- A GoHighLevel account for API testing

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/pipeline-dashboard.git
   cd pipeline-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example apps/dashboard/.env.local
   # Edit .env.local with your GHL credentials
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

## 📋 Development Workflow

### Branching Strategy

We use a Git Flow approach:

- **`main`** - Production-ready code
- **`develop`** - Integration branch for features  
- **`feature/*`** - New features
- **`bugfix/*`** - Bug fixes
- **`hotfix/*`** - Critical production fixes

### Creating a Feature

1. **Create a feature branch**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow our coding standards
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   # Create pull request on GitHub
   ```

## 🎯 Coding Standards

### JavaScript/TypeScript

- **Use TypeScript** for all new files
- **ESLint configuration** must pass without errors
- **Prettier formatting** is enforced
- **Function naming**: camelCase
- **Component naming**: PascalCase  
- **File naming**: camelCase for utilities, PascalCase for components

### React Components

```typescript
// ✅ Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = React.memo(({ 
  variant, 
  onClick, 
  children, 
  className 
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
```

### API Integration

```javascript
// ✅ Good - Proper error handling
export const fetchCalendars = async () => {
  try {
    const response = await ghlApiClient.calendar.list();
    return response.calendars;
  } catch (error) {
    logger.error('Failed to fetch calendars', error);
    
    if (error.status === 401) {
      throw new Error('Authentication failed. Please check your API token.');
    }
    
    if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    
    throw new Error('Failed to fetch calendars. Please try again.');
  }
};
```

### Styling

- **Use Tailwind CSS** utility classes
- **Avoid inline styles** - use Tailwind instead
- **Responsive design** - mobile-first approach
- **Consistent spacing** - use Tailwind spacing scale
- **Accessibility** - follow WCAG guidelines

```jsx
// ✅ Good
<div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">
    Card Title
  </h2>
  <p className="text-gray-600 leading-relaxed">
    Card content goes here.
  </p>
</div>

// ❌ Bad
<div style={{padding: '24px', backgroundColor: 'white', borderRadius: '8px'}}>
  <h2 style={{fontSize: '20px', fontWeight: 'bold', color: '#111'}}>
    Card Title  
  </h2>
</div>
```

## 🧪 Testing Guidelines

### Unit Tests

Write unit tests for:
- Utility functions
- Custom hooks  
- Complex component logic
- API client methods

```javascript
// Example unit test
describe('formatCurrency', () => {
  it('should format currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(-100)).toBe('-$100.00');
  });
});
```

### Integration Tests  

Write integration tests for:
- API integrations
- Form submissions
- User workflows
- Component interactions

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📝 Documentation

### Code Documentation

- **JSDoc comments** for functions and classes
- **README files** for packages and major features
- **API documentation** for new endpoints
- **Inline comments** for complex business logic

```javascript
/**
 * Calculates the conversion rate for a pipeline stage
 * @param {number} converted - Number of converted leads
 * @param {number} total - Total number of leads in stage
 * @returns {number} Conversion rate as percentage (0-100)
 */
export const calculateConversionRate = (converted, total) => {
  if (total === 0) return 0;
  return Math.round((converted / total) * 100 * 100) / 100;
};
```

### Updating Documentation

When adding new features:
1. Update relevant README files
2. Add API documentation if applicable  
3. Update the main project README
4. Add examples to `/examples` directory
5. Update troubleshooting guides if needed

## 🐛 Bug Reports

### Before Submitting

1. **Check existing issues** - avoid duplicates
2. **Reproduce the bug** - ensure it's consistent  
3. **Check latest version** - bug might be fixed
4. **Try troubleshooting guide** - common issues have solutions

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior  
What actually happened

## Environment
- OS: [e.g. Windows 11, macOS 13]
- Node.js version: [e.g. 18.17.0]
- Browser: [e.g. Chrome 120]
- Dashboard version: [e.g. 1.2.0]

## Additional Context
Any additional information, screenshots, or logs
```

## ✨ Feature Requests

### Feature Request Template

```markdown
## Feature Summary
Brief description of the feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this work?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Any additional information or mockups
```

## 🔍 Code Review Process

### Pull Request Guidelines

1. **Fill out PR template** completely
2. **Link related issues** using keywords (fixes #123)
3. **Add tests** for new functionality  
4. **Update documentation** as needed
5. **Ensure CI passes** all checks

### Review Checklist

Reviewers will check:
- ✅ Code follows our standards
- ✅ Tests are included and passing
- ✅ Documentation is updated
- ✅ No breaking changes (or properly documented)
- ✅ Performance considerations addressed
- ✅ Security implications reviewed
- ✅ Accessibility guidelines followed

### After Review

1. **Address feedback** promptly
2. **Update PR** with changes
3. **Respond to comments** with clarifications
4. **Request re-review** when ready

## 🏆 Recognition

Contributors are recognized in:
- Project README contributors section
- Release notes for significant contributions
- Annual contributor appreciation posts

## 📞 Getting Help

- **GitHub Discussions** - Ask questions
- **GitHub Issues** - Report bugs  
- **Documentation** - Check `/docs` directory
- **Discord** - Real-time community support (if available)

## 📋 Commit Message Format

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- **feat**: New feature
- **fix**: Bug fix  
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Build process or auxiliary tool changes

### Examples

```
feat(calendar): add appointment reschedule functionality

fix(pipeline): resolve drag and drop performance issue

docs(api): update authentication guide

style(dashboard): improve responsive design for mobile

refactor(utils): extract common date formatting functions

test(calendar): add unit tests for slot booking

chore(deps): update React to version 19
```

## 🎉 Thank You

Thank you for contributing to the Professional Pipeline Dashboard! Your contributions help make this project better for everyone.

Happy coding! 🚀
