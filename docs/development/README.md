# Development Guide

This guide covers everything you need to know about developing the Professional Pipeline Dashboard.

## 🏗️ Project Architecture

### Monorepo Structure

```
pipeline-dashboard/
├── apps/dashboard/           # Main React application
├── packages/                 # Shared packages
│   ├── api-client/          # GHL API integration
│   ├── ui-components/       # Reusable UI components  
│   ├── utils/               # Shared utilities
│   └── types/               # TypeScript definitions
├── services/                # Backend services (future)
├── tools/                   # Development & diagnostic tools
├── tests/                   # Organized test suites
└── examples/                # Implementation examples
```

### Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion, Headless UI
- **State Management**: Zustand, React Context
- **API Client**: Custom GHL integration
- **Build Tool**: Vite with workspace support
- **Package Manager**: NPM with workspaces

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- NPM 8.0.0 or higher
- Git

### Initial Setup

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd pipeline-dashboard
   npm install
   ```

2. **Environment configuration**
   ```bash
   cp apps/dashboard/.env.example apps/dashboard/.env.local
   # Edit .env.local with your GHL credentials
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

### Environment Variables

Create `apps/dashboard/.env.local`:

```env
# GoHighLevel API Configuration
VITE_GHL_API_BASE_URL=https://services.leadconnectorhq.com
VITE_GHL_API_TOKEN=your_api_token
VITE_GHL_LOCATION_ID=your_location_id

# Development settings
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
```

## 🏃‍♂️ Development Workflow

### Available Scripts

```bash
# Development
npm run dev                    # Start dashboard dev server
npm run dev:dashboard         # Explicit dashboard dev mode

# Building
npm run build                 # Build all workspaces  
npm run build:dashboard       # Build dashboard only

# Code Quality
npm run lint                  # Lint all workspaces
npm run lint:fix             # Fix linting issues
npm run format               # Format code

# Maintenance
npm run clean                # Clean all build outputs
npm run install:all          # Install all workspace deps
npm run update:all           # Update all dependencies
```

### Project Structure Details

#### Apps Directory (`/apps`)

Contains the main applications:

```
apps/dashboard/
├── src/
│   ├── api/                 # API integration layer
│   ├── components/          # React components
│   │   ├── features/        # Feature-specific components
│   │   ├── forms/           # Form components
│   │   ├── layout/          # Layout components
│   │   └── ui/              # Base UI components
│   ├── context/             # React Context providers
│   ├── hooks/               # Custom hooks
│   ├── pages/               # Page components
│   ├── styles/              # Global styles
│   └── utils/               # App-specific utilities
├── public/                  # Static assets
├── package.json             # App dependencies
└── vite.config.js          # Vite configuration
```

#### Packages Directory (`/packages`)

Shared code across the monorepo:

- **`api-client/`**: GHL API integration library
- **`ui-components/`**: Reusable UI components
- **`utils/`**: Shared utility functions
- **`types/`**: TypeScript type definitions

#### Tools Directory (`/tools`)

Development and diagnostic tools:

- **`scripts/`**: Build and deployment scripts  
- **`diagnostics/`**: GHL API diagnostic tools
- **`config/`**: Shared configuration files

## 🔧 Configuration

### Vite Configuration

The main Vite config is in `apps/dashboard/vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Tailwind Configuration

Tailwind is configured in `apps/dashboard/tailwind.config.js` with:

- Custom color palette
- Professional design tokens
- Component-specific utilities
- Responsive breakpoints

### ESLint & Prettier

Code quality tools are configured at workspace level:

- **ESLint**: React, TypeScript, and accessibility rules
- **Prettier**: Consistent code formatting
- **Git hooks**: Pre-commit linting and formatting

## 🧩 Component Architecture

### Component Organization

```
src/components/
├── features/              # Feature-specific components
│   ├── admin-dashboard/   # Admin-specific features
│   ├── general-dashboard/ # General user features  
│   ├── partnership-dashboard/ # Partner features
│   └── pipeline/          # Pipeline management
├── forms/                 # Form components
├── layout/                # Layout & navigation
├── shared/                # Shared feature components
└── ui/                    # Base UI components
```

### Component Guidelines

1. **Use TypeScript**: All components must be TypeScript
2. **Props Interface**: Define clear prop interfaces
3. **Accessibility**: Follow WCAG guidelines
4. **Performance**: Use React.memo, useMemo, useCallback appropriately
5. **Styling**: Use Tailwind CSS classes, avoid inline styles

### Example Component

```typescript
interface PipelineCardProps {
  lead: Lead;
  onUpdate: (lead: Lead) => void;
  className?: string;
}

export const PipelineCard: React.FC<PipelineCardProps> = React.memo(({
  lead,
  onUpdate,
  className
}) => {
  // Component implementation
});
```

## 🔌 API Integration

### GHL API Client

The API client is located in `packages/api-client/`:

```javascript
import { ghlApiClient } from '@packages/api-client';

// Calendar operations
const calendars = await ghlApiClient.calendar.list();
const freeSlots = await ghlApiClient.calendar.getFreeSlots(calendarId, date);

// Appointment operations  
const appointment = await ghlApiClient.appointments.create(appointmentData);
```

### Error Handling

All API calls include comprehensive error handling:

```javascript
try {
  const result = await ghlApiClient.calendar.list();
  return result;
} catch (error) {
  if (error.status === 401) {
    // Handle authentication error
  } else if (error.status === 429) {
    // Handle rate limiting
  }
  throw error;
}
```

## 🎨 Styling Guidelines

### Tailwind CSS

Use Tailwind utility classes:

```jsx
<div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
  <h2 className="text-xl font-semibold text-gray-900 mb-4">
    Pipeline Stage
  </h2>
</div>
```

### Design Tokens

Custom design tokens are defined in Tailwind config:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6', 
        900: '#1e3a8a'
      }
    }
  }
}
```

### Animation Guidelines

Use Framer Motion for animations:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  Content
</motion.div>
```

## 🧪 Testing Strategy

### Test Organization

```
tests/
├── unit/                  # Unit tests
├── integration/           # Integration tests
├── e2e/                   # End-to-end tests
└── fixtures/              # Test data and fixtures
```

### Testing Tools

- **Jest**: Unit testing framework
- **React Testing Library**: Component testing
- **Cypress**: E2E testing
- **MSW**: API mocking

## 🚀 Deployment

### Build Process

```bash
# Production build
npm run build

# Build outputs
apps/dashboard/dist/       # Dashboard build output
packages/*/dist/          # Package build outputs
```

### Deployment Targets

- **Vercel**: Recommended for React applications
- **Netlify**: Alternative static hosting
- **AWS S3 + CloudFront**: Enterprise hosting
- **Docker**: Containerized deployment

## 📋 Best Practices

### Code Quality

1. **TypeScript**: Use strict TypeScript configuration
2. **ESLint**: Follow configured linting rules  
3. **Prettier**: Consistent code formatting
4. **Comments**: Document complex business logic
5. **Git**: Use conventional commit messages

### Performance

1. **Bundle Size**: Monitor and optimize bundle size
2. **Code Splitting**: Use React.lazy for route splitting
3. **Memoization**: Use React.memo, useMemo, useCallback
4. **API Optimization**: Implement caching and batching

### Security

1. **Environment Variables**: Never commit secrets
2. **API Keys**: Use proper key rotation
3. **Input Validation**: Validate all user inputs
4. **CORS**: Configure proper CORS policies

## 🆘 Common Issues

### Port Already in Use

The app automatically finds available ports (5180, 5181, etc.)

### Path Too Long (Windows)

Consider moving project to shorter path like `C:\projects\dashboard`

### Dependencies Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Workspace-specific install
npm install --workspace=apps/dashboard
```

### GHL API Issues

Check the diagnostic tools in `tools/diagnostics/` for API troubleshooting.

## 📞 Getting Help

- **Documentation**: Check `/docs` directory
- **Issues**: Create GitHub issues for bugs
- **Discussions**: Use GitHub Discussions for questions
- **Code Review**: All PRs require review
