# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Primary Development Commands
```bash
# Start backend development server
npm run backend:dev

# Start frontend development server  
npm run frontend:dev

# Build all packages and frontend for production
npm run frontend

# Run linting
npm run lint

# Run tests
npm run test:api        # Backend tests
npm run test:client     # Frontend tests

# E2E testing
npm run e2e            # Run end-to-end tests
npm run e2e:headed     # Run e2e tests with browser UI
```

### Package Management
```bash
# Install dependencies (handles monorepo)
npm install

# Reinstall all dependencies 
npm run reinstall

# Update dependencies with migration handling
npm run update

# Clean and rebuild package-lock
npm run rebuild:package-lock
```

### Docker Development
```bash
# Start full stack with Docker
docker compose up -d

# Start deployed version
npm run start:deployed

# Stop deployed version  
npm run stop:deployed

# Update deployed version
npm run update:deployed
```

### User Management
```bash
# Create new user
npm run create-user

# List users
npm run list-users

# Ban/delete users
npm run ban-user
npm run delete-user

# Manage user balances
npm run add-balance
npm run list-balances
```

## Architecture Overview

LibreChat is a **modern full-stack AI chat application** built with a **monorepo architecture** using npm workspaces.

### High-Level Structure
- **Frontend**: React 18 + Vite + TypeScript (SPA)
- **Backend**: Node.js + Express + MongoDB + Redis
- **Packages**: Modular TypeScript packages for shared functionality
- **Database**: MongoDB for persistent data, Redis for sessions/caching
- **Search**: MeilSearch for conversation/message search
- **RAG**: Vector database (PostgreSQL + pgvector) for RAG functionality

### Monorepo Workspace Structure
```
LibreChat/
├── api/                    # Backend Express.js application
├── client/                 # React frontend application  
├── packages/
│   ├── api/               # MCP (Model Context Protocol) services
│   ├── client/            # Reusable React components library
│   ├── data-provider/     # Data layer & API client
│   └── data-schemas/      # Mongoose schemas & TypeScript types
├── config/                # Build scripts and configuration utilities
├── e2e/                   # Playwright end-to-end tests
└── docs/                  # Documentation
```

### Core Architecture Patterns

**Data Flow:**
1. **Client** → `data-provider` → **API** → `data-schemas` → **MongoDB**
2. **Shared Types**: `data-schemas` provides TypeScript definitions across the stack
3. **Component Library**: `@librechat/client` provides reusable React components
4. **MCP Integration**: `packages/api` handles Model Context Protocol services

**Key Technologies:**
- **Frontend**: React, TypeScript, Tailwind CSS, React Query, Jotai (state)
- **Backend**: Express.js, Mongoose, Passport (auth), Winston (logging)
- **Build**: Vite (frontend), Rollup (packages), Docker
- **Testing**: Jest (unit), Playwright (e2e)
- **AI Integration**: OpenAI, Anthropic, Google, Azure, AWS Bedrock, Custom endpoints

## Backend Architecture (`/api`)

### Core Components
- **`server/index.js`**: Main Express server entry point
- **`app/`**: Express application setup and middleware
- **`models/`**: Mongoose schemas and database models
- **`routes/`**: API route handlers organized by feature
- **`controllers/`**: Business logic separated from routes
- **`services/`**: External service integrations (OpenAI, Anthropic, etc.)
- **`strategies/`**: Authentication strategies (OAuth, LDAP, etc.)
- **`utils/`**: Shared utilities and helpers

### Key Features
- **Multi-provider AI Support**: Unified interface for 15+ AI providers
- **Conversation Management**: Branching, forking, message history
- **File Processing**: Upload, analysis, and RAG integration
- **Real-time Updates**: Server-sent events for streaming responses
- **Advanced Auth**: OAuth2, LDAP, JWT, session management
- **Search Integration**: MeilSearch for full-text search
- **Moderation**: Content filtering and user management
- **Plugin System**: Extensible architecture for tools and integrations

### Environment Configuration
Key environment variables (see `.env.example`):
- **`MONGO_URI`**: MongoDB connection string
- **`OPENAI_API_KEY`**: OpenAI API key (can be `user_provided`)
- **`ANTHROPIC_API_KEY`**: Anthropic API key
- **`GOOGLE_KEY`**: Google AI/Vertex API key
- **AI Provider Keys**: Support for 15+ providers via `librechat.yaml` config

## Frontend Architecture (`/client`)

### Core Structure
- **`src/components/`**: React components organized by feature
- **`src/hooks/`**: Custom React hooks
- **`src/utils/`**: Frontend utilities and helpers
- **`src/store/`**: Jotai atoms for state management
- **`src/api/`**: API layer using React Query
- **`src/localization/`**: i18n translations (25+ languages)

### Key Features
- **Modern React**: Hooks, Suspense, Error Boundaries
- **Advanced UI**: Radix UI components, Tailwind CSS, Framer Motion
- **State Management**: Jotai for atomic state management
- **Real-time**: SSE integration for streaming AI responses
- **Internationalization**: Full i18n support with react-i18next
- **Accessibility**: WCAG compliant with comprehensive a11y testing
- **PWA Support**: Progressive Web App capabilities

### Build System
- **Vite**: Lightning-fast development server and optimized builds
- **TypeScript**: Full type safety across the frontend
- **Tailwind CSS**: Utility-first styling with custom design system
- **PostCSS**: Advanced CSS processing

## Package System

### `packages/data-provider`
**Purpose**: Unified data layer and API client
- **API Integration**: Centralized HTTP client with React Query
- **Type Safety**: Full TypeScript integration with backend types
- **Caching**: Intelligent caching and data synchronization
- **Error Handling**: Consistent error handling across the app

### `packages/data-schemas`
**Purpose**: Shared MongoDB schemas and TypeScript types
- **Mongoose Models**: Database schema definitions
- **TypeScript Types**: Shared types between frontend/backend
- **Validation**: Zod schemas for runtime validation
- **Migrations**: Database migration utilities

### `packages/api`
**Purpose**: Model Context Protocol (MCP) services
- **MCP Integration**: Tools and server implementations
- **Service Definitions**: Reusable AI service patterns
- **Tool System**: Extensible tool architecture

### `packages/client`
**Purpose**: Reusable React component library
- **Design System**: Consistent UI components
- **Theming**: Customizable theme system
- **Accessibility**: WCAG compliant components

## Development Workflow

### Getting Started
1. **Setup**: Copy `.env.example` to `.env` and configure
2. **Install**: Run `npm install` (handles all workspaces)
3. **Database**: Start MongoDB (locally or via Docker)
4. **Development**: Run `npm run backend:dev` and `npm run frontend:dev`

### Testing Strategy
- **Unit Tests**: Jest for both frontend and backend
- **E2E Tests**: Playwright for full application testing
- **A11y Tests**: Automated accessibility testing with axe-core
- **CI/CD**: GitHub Actions for automated testing and deployment

### Configuration Files
- **`librechat.yaml`**: Main application configuration (AI endpoints, plugins, etc.)
- **`.env`**: Environment variables and secrets
- **`docker-compose.yml`**: Container orchestration
- **`vite.config.ts`**: Frontend build configuration

### Common Development Tasks

**Adding New AI Provider:**
1. Add provider configuration to `librechat.yaml`
2. Implement service in `api/app/clients/`
3. Add environment variables to `.env.example`
4. Update frontend provider selection UI

**Database Changes:**
1. Update schemas in `packages/data-schemas`
2. Create migration script in `api/models/`
3. Update TypeScript types
4. Test with both local and production data

**Adding New Features:**
1. Design API endpoints in `api/routes/`
2. Implement controllers and services
3. Update data schemas and types
4. Build frontend components and integrate with backend
5. Add comprehensive tests (unit + e2e)

### Performance Considerations
- **Frontend**: Code splitting, lazy loading, virtual scrolling for large conversations
- **Backend**: Connection pooling, Redis caching, efficient database queries
- **Real-time**: Optimized SSE for streaming responses
- **Bundle Size**: Tree shaking, dynamic imports, package optimization

### Security Features
- **Authentication**: Multiple strategies (OAuth2, LDAP, local)
- **Authorization**: Role-based access control
- **Input Validation**: Comprehensive request validation
- **Rate Limiting**: API rate limiting and abuse prevention
- **Content Filtering**: Built-in moderation capabilities
- **Session Management**: Secure session handling with Redis

This architecture supports LibreChat's goal of being the most comprehensive, self-hosted AI chat platform with enterprise-grade features and extensive customization options.