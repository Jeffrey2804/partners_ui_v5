# Development Guide

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 8+

### Quick Commands

#### Start Dashboard Development

```bash
# From root directory
npm run dev

# Or directly from dashboard
cd apps/dashboard
npm run dev
```

#### Build Everything

```bash
npm run build
```

#### Code Quality

```bash
npm run lint          # Check for issues
npm run lint:fix      # Fix auto-fixable issues
npm run format        # Format code
```

## 📁 Folder Purpose

| Folder      | Purpose               | When to Use                 |
| ----------- | --------------------- | --------------------------- |
| `apps/`     | Frontend applications | Adding new apps/websites    |
| `packages/` | Shared libraries      | Reusable code across apps   |
| `services/` | Backend services      | API services, microservices |
| `docs/`     | Documentation         | Guides, API docs, examples  |
| `tools/`    | Development tools     | Build scripts, utilities    |
| `scripts/`  | Automation scripts    | Deploy, setup, maintenance  |

## 🎯 Current Status

✅ **Dashboard**: Running at http://localhost:5180/
✅ **Project Structure**: Organized monorepo
✅ **Development Setup**: Ready for development

## 🔄 Next Steps

1. **Development**: Continue building dashboard features
2. **Organization**: Add more shared components to `packages/`
3. **Services**: Implement backend services as needed
4. **Documentation**: Update docs as project grows

## 🆘 Common Issues

**Port Already in Use**

- Dashboard automatically finds available port (5180, 5181, etc.)

**Path Too Long**

- Consider moving project to shorter path like `C:\projects\dashboard`

**Dependencies**

- Run `npm install` in root and `apps/dashboard/` if needed
