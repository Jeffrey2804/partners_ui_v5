# Professional Pipeline Dashboard

A modern, enterprise-grade dashboard application built with React, Vite, and Tailwind CSS. This monorepo provides comprehensive pipeline management, calendar integration, and business analytics for professional operations.

## 🚀 Features

- **Pipeline Management**: Visual Kanban-style pipeline with drag-and-drop lead management
- **Calendar Integration**: Full GoHighLevel (GHL) calendar integration with appointment management  
- **Task Management**: Organized task tracking with categories, priorities, and due dates
- **Real-time Analytics**: Live metrics, performance tracking, and business insights
- **Role-based Dashboards**: Specialized views for admin, partner, and general users
- **Responsive Design**: Mobile-first approach with professional UI/UX
- **Professional Architecture**: Monorepo structure with shared packages and services

## 🏗️ Project Architecture

This is a professional monorepo with the following structure:

```
pipeline-dashboard/
├── apps/                     # Applications
│   └── dashboard/           # Main React dashboard
├── packages/                # Shared packages
│   ├── api-client/         # GHL API client
│   ├── ui-components/      # Reusable UI components
│   ├── utils/              # Shared utilities
│   └── types/              # TypeScript types
├── services/               # Backend services
├── tools/                  # Development tools & diagnostics
├── tests/                  # Organized test suites
├── examples/               # Code examples & demos
└── docs/                   # Comprehensive documentation
```

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS, Framer Motion, Headless UI
- **State Management**: Zustand, React Context API  
- **API Integration**: GoHighLevel (GHL) Calendar & CRM APIs
- **UI Components**: Radix UI, Lucide React Icons
- **Charts & Analytics**: Recharts, Chart.js, Nivo
- **Development**: ESLint, Prettier, Vite
- **Architecture**: Monorepo with NPM workspaces

## 📦 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pipeline-dashboard
   ```

2. **Install all dependencies**
   ```bash
   npm install
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Environment Variables

Create `.env.local` in `apps/dashboard/`:

```env
VITE_GHL_API_BASE_URL=https://services.leadconnectorhq.com
VITE_GHL_API_TOKEN=your_ghl_api_token
VITE_GHL_LOCATION_ID=your_location_id
```

### API Integration

The dashboard integrates with GoHighLevel (GHL) APIs:
- **Calendar API**: Appointment and slot management
- **CRM API**: Lead and contact management  
- **Webhook API**: Real-time updates

## 🎯 Key Features

### Pipeline Management
- **Visual Kanban Board**: Drag-and-drop lead management across stages
- **Real-time Metrics**: Conversion rates, velocity, and performance tracking
- **Tag-based Organization**: Smart categorization and filtering
- **Automated Workflows**: Stage progression and notifications

### Calendar Integration  
- **GHL Calendar Sync**: Full integration with GoHighLevel calendars
- **Appointment Management**: Create, update, and manage appointments
- **Free Slot Detection**: Real-time availability checking
- **Multi-calendar Support**: Handle multiple calendar configurations

### Analytics Dashboard
- **Performance Metrics**: Revenue, conversion rates, lead velocity
- **Custom Reports**: Exportable analytics and insights  
- **Real-time Updates**: Live data synchronization
- **Role-based Views**: Tailored dashboards for different user types

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory:

- **[Development Guide](docs/development/)** - Setup, contribution, and development
- **[API Documentation](docs/api/)** - GHL API integration and usage
- **[User Guides](docs/guides/)** - Feature usage and best practices
- **[Examples](examples/)** - Code examples and implementation demos

## 🧪 Testing

```bash
# Run linting
npm run lint

# Fix linting issues  
npm run lint:fix

# Run tests (when implemented)
npm test

# Run all workspace commands
npm run build        # Build all packages
npm run clean        # Clean all packages
```

## 🚀 Deployment

The application can be deployed to various platforms:

- **Vercel**: Optimal for Vite/React applications
- **Netlify**: Easy static site deployment
- **AWS S3 + CloudFront**: Enterprise-grade hosting
- **Docker**: Containerized deployment option

## 🤝 Contributing

1. Read our [Development Guide](docs/development/contributing.md)
2. Fork the repository
3. Create a feature branch: `git checkout -b feature/amazing-feature`
4. Make your changes following our coding standards
5. Add tests if applicable
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check `/docs` directory for detailed guides
- **Issues**: Create an issue in the repository for bugs or feature requests
- **Development**: See [Troubleshooting Guide](docs/development/troubleshooting.md)

## 🏆 Professional Features

This dashboard is built with enterprise standards:

- **Monorepo Architecture**: Scalable, maintainable codebase
- **TypeScript Support**: Type-safe development
- **Professional UI/UX**: Modern, accessible design system  
- **Performance Optimized**: Efficient rendering and API usage
- **Error Handling**: Comprehensive error tracking and recovery
- **Security**: Secure API integration and data handling

 