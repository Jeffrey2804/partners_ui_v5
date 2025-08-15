# Troubleshooting Guide

This guide helps you resolve common issues when developing or deploying the Professional Pipeline Dashboard.

## 🚀 Development Issues

### Installation Problems

#### Node Version Issues
```bash
# Check your Node version
node --version

# Should be 18.0.0 or higher
# Use nvm to switch versions
nvm use 18
nvm install 18
```

#### NPM Workspace Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Install workspace dependencies
npm install --workspaces
```

#### Port Already in Use
```bash
# Dashboard automatically finds available ports
# Default: 5180, fallback: 5181, 5182, etc.

# To use specific port:
PORT=3000 npm run dev
```

### Build Issues

#### Vite Build Failures
```bash
# Clear Vite cache
rm -rf apps/dashboard/dist
rm -rf apps/dashboard/node_modules/.vite

# Rebuild
npm run build:dashboard
```

#### TypeScript Errors
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Fix common TS issues
npm run lint:fix
```

#### Import Path Issues
```javascript
// Use proper relative imports
import { Button } from '../ui/Button'

// Use workspace imports for packages
import { apiClient } from '@packages/api-client'
```

### Runtime Issues

#### Environment Variables Not Loading
```bash
# Check .env.local exists in apps/dashboard/
ls -la apps/dashboard/.env.local

# Verify variable names start with VITE_
VITE_GHL_API_TOKEN=your_token  # ✅ Correct
GHL_API_TOKEN=your_token       # ❌ Wrong
```

#### API Connection Issues
```javascript
// Check network tab in browser dev tools
// Verify API endpoints and authentication

// Test API connection
npm run test:api
```

## 🔌 API Integration Issues

### GoHighLevel (GHL) API Problems

#### Authentication Errors (401)
```bash
# Verify API token in .env.local
VITE_GHL_API_TOKEN=your_actual_token

# Check token permissions in GHL dashboard
# Ensure token has calendar and appointment permissions
```

#### Rate Limiting (429)
```javascript
// Implement exponential backoff
const retryRequest = async (fn, retries = 3) => {
  try {
    return await fn()
  } catch (error) {
    if (error.status === 429 && retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000 * (4 - retries)))
      return retryRequest(fn, retries - 1)
    }
    throw error
  }
}
```

#### Calendar Not Found (404)
```bash
# Use diagnostic tools to verify calendars
cd tools/diagnostics
node fetch_calendars.js

# Check location ID and calendar permissions
```

#### CORS Issues
```javascript
// CORS is handled by GHL API
// If issues persist, check:
// 1. API endpoint URLs
// 2. Request headers
// 3. Authentication method
```

### Calendar Integration Issues

#### Free Slots Not Loading
```bash
# Check calendar diagnostic
node tools/diagnostics/calendar_diagnostic.js

# Common issues:
# 1. Calendar not active
# 2. Wrong timezone
# 3. Date format issues
```

#### Appointment Creation Failing
```javascript
// Verify required fields
const appointmentData = {
  calendarId: 'required',
  startTime: 'ISO string required',
  endTime: 'ISO string required', 
  title: 'required',
  // ... other required fields
}
```

#### Timezone Problems
```javascript
// Always use proper timezone handling
import { format, parseISO } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'

// Convert to UTC for API
const utcTime = zonedTimeToUtc(localTime, timezone)

// Convert from UTC for display
const localTime = utcToZonedTime(utcTime, timezone)
```

## 🎨 UI/UX Issues

### Styling Problems

#### Tailwind Classes Not Working
```bash
# Restart dev server after tailwind.config.js changes
npm run dev

# Verify Tailwind is processing correctly
# Check browser dev tools for compiled CSS
```

#### Dark Mode Issues
```javascript
// Ensure proper dark mode configuration
// Check tailwind.config.js for darkMode setting
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

#### Animation Performance
```javascript
// Use optimized animations
import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 } // Keep short
  }
}
```

### Responsiveness Issues

#### Mobile Layout Problems
```css
/* Use proper responsive design */
.container {
  @apply px-4 sm:px-6 lg:px-8;
  @apply text-sm sm:text-base;
}
```

#### Touch Interactions
```javascript
// Ensure touch-friendly interactions
<button className="min-h-[44px] min-w-[44px] touch-manipulation">
  Touch Target
</button>
```

## 📊 Performance Issues

### Bundle Size Problems

#### Large Bundle Size
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer apps/dashboard/dist

# Common solutions:
# 1. Code splitting with React.lazy
# 2. Tree shaking verification
# 3. Remove unused dependencies
```

#### Slow Loading Times
```javascript
// Implement code splitting
const LazyComponent = React.lazy(() => import('./Component'))

// Use with Suspense
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

### Runtime Performance

#### Slow Rendering
```javascript
// Use React.memo for expensive components
export const ExpensiveComponent = React.memo(({ data }) => {
  // Component logic
})

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data)
}, [data])
```

#### Memory Leaks
```javascript
// Clean up subscriptions and timers
useEffect(() => {
  const timer = setInterval(() => {
    // Timer logic
  }, 1000)

  return () => {
    clearInterval(timer)
  }
}, [])
```

## 🔍 Debugging Tips

### Browser DevTools

#### Network Tab
- Check API requests and responses
- Verify request headers and authentication
- Look for failed requests or slow responses

#### Console
```javascript
// Use structured logging
console.group('API Request')
console.log('Endpoint:', endpoint)
console.log('Data:', data)
console.log('Response:', response)
console.groupEnd()
```

#### React DevTools
- Install React Developer Tools extension
- Check component props and state
- Identify unnecessary re-renders

### Logging

#### Enable Debug Mode
```env
# In .env.local
VITE_DEBUG_MODE=true
VITE_LOG_LEVEL=debug
```

#### Custom Logging
```javascript
import { logger } from '@utils/logger'

logger.debug('Debug info', { data })
logger.info('Info message')
logger.warn('Warning message')
logger.error('Error message', error)
```

## 🚨 Emergency Fixes

### Critical Issues

#### App Won't Start
```bash
# Nuclear option - full reset
rm -rf node_modules package-lock.json
rm -rf apps/dashboard/node_modules
rm -rf apps/dashboard/dist
npm install
npm run dev
```

#### Build Failing in Production
```bash
# Check production build locally
NODE_ENV=production npm run build
npm run preview

# Common production issues:
# 1. Environment variables missing
# 2. Import path case sensitivity
# 3. TypeScript strict mode errors
```

#### API Completely Down
```javascript
// Implement fallback mode
const useFallbackData = () => {
  return {
    leads: mockLeads,
    calendars: mockCalendars,
    isOffline: true
  }
}
```

## 📞 Getting Help

### Before Asking for Help

1. **Check this guide** for common solutions
2. **Search existing issues** in the repository
3. **Check browser console** for errors
4. **Try incognito mode** to rule out extensions
5. **Test with fresh npm install**

### When Reporting Issues

Include:
- **Operating System** and version
- **Node.js version** (`node --version`)
- **NPM version** (`npm --version`)
- **Browser** and version
- **Error messages** (full stack trace)
- **Steps to reproduce** the issue
- **Expected vs actual behavior**

### Useful Commands for Issue Reports

```bash
# System info
node --version
npm --version
git --version

# Project info
npm list
npm run info # if available

# Check for updates
npm outdated
```

### Emergency Contacts

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and help
- **Documentation**: Check `/docs` directory first
- **API Issues**: Use diagnostic tools in `/tools/diagnostics`

## 🛠️ Advanced Debugging

### Performance Profiling

```javascript
// Use React Profiler
import { Profiler } from 'react'

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration)
}

<Profiler id="PipelineSection" onRender={onRenderCallback}>
  <PipelineSection />
</Profiler>
```

### Memory Debugging

```javascript
// Monitor memory usage
if (process.env.NODE_ENV === 'development') {
  setInterval(() => {
    console.log('Memory:', performance.memory)
  }, 5000)
}
```

### Network Debugging

```javascript
// Log all API calls
const originalFetch = window.fetch
window.fetch = (...args) => {
  console.log('Fetch:', args[0])
  return originalFetch(...args)
}
```
