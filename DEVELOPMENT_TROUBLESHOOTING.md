# LibreChat Development Troubleshooting Guide

This guide helps resolve common development issues encountered when working with LibreChat.

## 🚨 Common Issues & Solutions

### Backend Won't Start

**Symptoms:** 
- `npm run backend:dev` hangs or fails
- Missing module errors
- Database connection issues

**Solutions:**

1. **Try alternative backend commands:**
   ```bash
   # Direct node execution (bypasses nodemon issues)
   npm run backend:dev:direct
   
   # Use Node.js built-in watching (Node 18.11+)
   npm run backend:dev:watch
   ```

2. **Fix missing dependencies:**
   ```bash
   npm run health-check
   npm run fix-deps
   ```

3. **Clean restart:**
   ```bash
   npm run reinstall
   npm run build:data-provider
   npm run build:data-schemas
   npm run build:api
   ```

### Missing Dependencies

**Symptoms:**
- "Cannot find module" errors
- Peer dependency warnings

**Solutions:**

1. **Run dependency health check:**
   ```bash
   npm run health-check
   ```

2. **Manual workspace fix:**
   ```bash
   cd api && npm install --legacy-peer-deps
   cd ../client && npm install --legacy-peer-deps
   ```

3. **Full reinstall with legacy peer deps:**
   ```bash
   rm -rf node_modules package-lock.json
   rm -rf */node_modules */package-lock.json
   npm install --legacy-peer-deps
   ```

### Database Connection Issues

**Symptoms:**
- "Please define the MONGO_URI environment variable"
- Database connection timeouts

**Solutions:**

1. **Check environment file:**
   ```bash
   # Ensure .env exists and contains:
   MONGO_URI=mongodb://127.0.0.1:27017/LibreChat
   ```

2. **Start database services:**
   ```bash
   # For local MongoDB via Docker
   docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d mongodb
   ```

3. **Verify database connectivity:**
   ```bash
   # Check if MongoDB is running
   docker ps | grep mongodb
   # Test connection
   curl -I http://localhost:27017
   ```

### Build Failures

**Symptoms:**
- Memory errors during build
- TypeScript compilation errors
- Package build failures

**Solutions:**

1. **Increase Node.js memory:**
   ```bash
   export NODE_OPTIONS="--max-old-space-size=8192"
   npm run build:api
   ```

2. **Build packages individually:**
   ```bash
   npm run build:data-schemas
   npm run build:data-provider
   npm run build:api
   npm run build:client-package
   ```

### Security Vulnerabilities

**Symptoms:**
- npm audit warnings
- Critical security alerts

**Solutions:**

1. **Check security status:**
   ```bash
   npm audit --audit-level=high
   ```

2. **Fix automatically:**
   ```bash
   npm audit fix --force
   ```

3. **Manual updates for critical packages:**
   - Replace `xmldom` with `@xmldom/xmldom`
   - Update vulnerable dependencies in package.json

## 🛠️ Development Commands Reference

### Primary Development
```bash
npm run backend:dev          # Standard nodemon development server
npm run backend:dev:direct   # Direct node execution (no nodemon)
npm run backend:dev:watch    # Node.js native watching
npm run frontend:dev         # Frontend development server
```

### Dependency Management
```bash
npm run health-check         # Check all workspace dependencies
npm run fix-deps            # Fix dependency issues automatically
npm run reinstall           # Clean reinstall all dependencies
```

### Build Commands
```bash
npm run build:data-provider  # Build data provider package
npm run build:data-schemas   # Build data schemas package  
npm run build:api           # Build API package
npm run frontend            # Build complete frontend
```

### Database & Docker
```bash
# Start only database services
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d mongodb

# Full Docker stack
docker compose up -d

# Check running containers
docker ps
```

## 🔧 Environment Setup

### Required Files
- `.env` - Environment variables (copy from `.env.example`)
- `.npmrc` - NPM configuration for dependency resolution
- `librechat.yaml` - Application configuration

### Node.js & NPM Versions
- **Node.js**: 18.11+ (for built-in --watch support)
- **NPM**: 9+ (for improved workspace handling)

### Environment Variables
Essential variables in `.env`:
```bash
MONGO_URI=mongodb://127.0.0.1:27017/LibreChat
NODE_ENV=development
PORT=3080
```

## 📋 Maintenance Scripts

Run these periodically to maintain project health:

```bash
# Weekly dependency check
npm run health-check

# Monthly full cleanup
npm run reinstall
npm run build:api
npm audit fix

# Before major updates
npm run fix-deps
npm test
```

## 🆘 When All Else Fails

1. **Complete reset:**
   ```bash
   git stash
   rm -rf node_modules */node_modules package-lock.json */package-lock.json
   npm install --legacy-peer-deps
   npm run build:data-provider
   npm run build:data-schemas  
   npm run build:api
   ```

2. **Check GitHub Issues:**
   - Search for similar problems in LibreChat repository
   - Check for known compatibility issues

3. **Use Docker for development:**
   ```bash
   docker compose up -d
   # Access at http://localhost:3080
   ```

This approach bypasses local dependency issues entirely.

---

*Last updated: 2025-01-15 - Keep this guide updated as new issues are discovered*