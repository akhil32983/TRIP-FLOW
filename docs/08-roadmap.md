# 🗺️ TripFlow - Development Roadmap

> **Project Deadline**: June 2026
>
> This roadmap outlines the development phases and tasks for the TripFlow TFG project.
> Each phase might be modified based on project progress and requirements.

---

## 📅 Basic Functionality - MVP (deadline: 15 December 2025)

### 🔧 Backend

- [x] {API} Health Check endpoint - `GET /api/health`
- [x] {DB} PostgreSQL database setup and integration with Spring Boot JPA
- [x] Spring Boot security configuration with JWT
  - [x] {Model} User entity with roles
  - [x] {API} Register endpoint - `POST /api/auth/register`
  - [x] {API} Login endpoint - `POST /api/auth/login`
  - [x] {API} Logout endpoint - `POST /api/auth/logout`
  - [x] {API} Refresh Token endpoint - `POST /api/auth/refresh`
- [x] Itinerary management logic
  - [x] {Model} Itinerary entity
  - [x] {Model} Itinerary Day entity
  - [x] {Model} Activity entity
  - [x] {Model} Location entity
  - [x] {API} Create Itinerary endpoint - `POST /api/v1/itineraries`
  - [x] {API} Get Itineraries endpoint - `GET /api/v1/itineraries`
  - [x] {API} Get Itinerary by ID endpoint - `GET /api/v1/itineraries/{id}`
  - [x] {API} Update Itinerary endpoint - `PUT /api/v1/itineraries/{id}`
  - [x] {API} Delete Itinerary endpoint - `DELETE /api/v1/itineraries/{id}`
- [x] Stats logic
  - [x] {API} User Stats endpoint - `GET /api/v1/stats/user`

### ⚛️ Frontend

- [x] {UI} Landing page with basic information - `/`
- [x] {UI} User registration form - `/signup`
- [x] {UI} User login form - `/login`
- [x] {UI} User dashboard - `/dashboard`
- [x] {UI} Itineraries list view - `/itineraries`
- [x] {UI} Itinerary details view - `/itineraries/{id}`
- [x] {UI} Itinerary edit form - `/itineraries/{id}/edit`
- [x] {UI} Itinerary creation form - `/itineraries/new`
- [x] {UI} Profile page (simplified) for logout - `/profile`
- [x] {UI} 404 Not Found page - `/404`
- [x] {UI} Demo mode
- [x] {API} Integration with backend endpoints

### ⚙️ Testing

- [x] {Unit-Backend} User service tests (registration, login, logout, token refresh)
- [x] {Unit-Backend} Itinerary service tests (CRUD operations)
- [x] {Unit-Backend} JWT Security tests (token generation, validation)
- [x] {Unit-Frontend} Component tests for landing page, buttons, headers, etc.
- [x] {Unit-Frontend} Authentication form validation tests
- [x] {Unit-Frontend} Itinerary creation and editing tests
- [x] {Component-Frontend} Navigation and routing tests
- [x] {Integration-Backend} API endpoint tests (RestAssured + Postman)
  - [x] {Integration-Backend} User authentication endpoints
  - [x] {Integration-Backend} Itinerary endpoints
- [x] {Integration-Frontend} Frontend-backend communication tests
- [x] {E2E} User flow tests (Puppeteer)
- [x] {Security} Authorization tests for protected resources

---

## 📦 Docker + CI/CD (deadline: 15 December 2025)

- [x] {Docker} Dockerfile for backend service
- [x] {Docker} Dockerfile for frontend service
- [x] {Docker} Docker Compose setup for development environment
- [x] {CI/CD} GitHub Actions pipeline for testing
- [x] {CI/CD} GitHub Actions pipeline for building and deploying Docker images

---

## 🚀 Advanced Features V1 (deadline: 1 March 2026)

### 🔧 Backend

- [x] {Feature} AI-Powered Itinerary Generation (OpenRouter)
  - [x] {API} AI Generation endpoint - `POST /api/v1/ai/generate`
  - [x] {Model} AI Logs entity for tracking requests and usage
  - [x] {Pattern} AI response rate limiting (daily limit per user)
  - [ ] {API} AI logs endpoint - `GET /api/v1/ai/logs`
- [ ] {Feature} User profile management
  - [ ] {API} Avatar upload endpoint - `POST /api/v1/users/{id}/avatar`
  - [ ] {API} Avatar retrieval endpoint - `GET /api/v1/users/{id}/avatar`
  - [ ] {API} User profile endpoint - `GET /api/v1/users/{id}`
  - [ ] {API} User profile update endpoint - `PUT /api/v1/users/{id}`
  - [ ] {API} User account deletion endpoint - `DELETE /api/v1/users/{id}`
- [ ] {Feature} Admin Panel Backend
  - [ ] {API} Get all users - `GET /api/v1/admin/users`
  - [ ] {API} Delete user - `DELETE /api/v1/admin/users/{id}`
  - [ ] {API} Get all itineraries - `GET /api/v1/admin/itineraries`
  - [ ] {Security} Role-based access control `ROLE_ADMIN`
  - [ ] {Model} Admin audit logs
- [x] {Feature} Microservices Architecture (Kafka + WebSocket)
  - [x] {Infra} Kafka setup in Docker Compose
  - [x] {Service} API Service (main REST API)
  - [x] {Service} AI Service (AI generation microservice)
  - [x] {Service} Notification Service (WebSocket notifications)
  - [x] {Module} Common module for shared DTOs and utilities
  - [x] {Event} `AIRequestMessage` (API → AI Service)
  - [x] {Event} `AIGenerationMessage` (AI Service → API Service)
  - [x] {Event} `NotificationMessage` (API Service → Notification Service)
  - [x] {Kafka} API Service: Produces `ai-request`, `notification`; Consumes `ai-generation`
  - [x] {Kafka} AI Service: Consumes `ai-request`; Produces `ai-generation`
  - [x] {Kafka} Notification Service: Consumes `notification`
  - [x] {DB} Separate PostgreSQL databases per microservice
- [x] {Feature} Real-time Notifications System
  - [x] {Model} Notification entity (in Notification Service)
  - [x] {WebSocket} STOMP WebSocket configuration
  - [x] {WebSocket} JWT authentication for WebSocket connections
  - [x] {WebSocket} User-specific notification queues
  - [x] {Service} WebSocket notification push service
  - [x] {Optimization} Configurable heartbeat intervals (1000ms for low latency)
- [ ] {Feature} Unsplash API Integration
  - [ ] {Service} Unsplash API client for destination images
  - [ ] {Cache} Results caching for image queries
  - [ ] {API} Image search endpoint - `GET /api/v1/images/search?query=...`


### ⚛️ Frontend

- [x] {Feature} AI Itinerary Generation UI
  - [x] {UI} AI Generation form in dashboard - `/dashboard`
  - [x] {UI} Advanced options (budget, pace, accommodation)
  - [ ] {UI} AI usage tracking and rate limit display
  - [x] {UI} Loading states and error handling
- [ ] {Feature} User Profile Component
  - [ ] {UI} Avatar upload and display
  - [ ] {UI} User profile details and editable form
  - [ ] {UI} Account deletion UI
- [x] {Feature} Real-time Notifications UI
  - [x] {Provider} WebSocket provider with STOMP client
  - [x] {Provider} Notification provider for UI notifications
  - [x] {Hook} `useWebSocketNotifications` - Generic hook for WebSocket subscriptions
  - [x] {Hook} `useNotifications` - Visual notification display
  - [x] {UI} Toast notifications with customizable duration
  - [x] {Feature} Auto-refresh on notifications
    - [x] Itineraries list auto-refresh on `ITINERARY_GENERATED`
    - [x] Recent itineraries auto-refresh on `ITINERARY_GENERATED`
    - [x] User stats auto-refresh on `ITINERARY_GENERATED`
- [ ] {Feature} Admin Panel UI
  - [ ] {UI} Admin dashboard - `/admin`
  - [ ] {UI} Users table (delete, filter)
  - [ ] {UI} Itineraries table
  - [ ] {Security} Admin-only route guards
- [ ] {Feature} Unsplash Integration UI
  - [ ] {UI} Replace itinerary icons with Unsplash images
  - [ ] {UI} Lazy loading + placeholders


### ⚙️ Testing

- [x] {Unit-Backend} AI Generation service tests (OpenRouter integration, rate limiting)
- [x] {Unit-Backend} AI Logs service tests (request tracking and retrieval)
- [x] {Unit-Backend} Kafka producer/consumer tests
- [ ] {Unit-Backend} Notifications service tests
- [ ] {Unit-Backend} User profile service tests (avatar upload, profile CRUD)
- [ ] {Unit-Backend} Admin backend tests (role restrictions, data access)
- [ ] {Unit-Backend} Unsplash service tests (API + caching)
- [ ] {Integration-Backend} AI Generation endpoint tests
- [ ] {Integration-Backend} AI Logs endpoint tests
- [ ] {Integration-Backend} User profile endpoints tests (file upload, data validation)
- [ ] {Integration-Backend} Notifications endpoints tests
- [ ] {Integration-Backend} Admin endpoints tests
- [ ] {Integration-Backend} Unsplash endpoint tests
- [ ] {Unit-Frontend} User profile component tests (avatar upload, form handling)
- [ ] {Unit-Frontend} Notifications component tests
- [ ] {Unit-Frontend} Admin panel component tests
- [ ] {Integration-Frontend} AI workflow tests (generate → display → save)
- [ ] {Integration-Frontend} Profile management workflow tests (upload → update → delete)
- [ ] {Integration-Frontend} Notifications workflow tests
- [ ] {Integration-Frontend} Admin panel workflow tests
- [ ] {E2E} Complete AI itinerary generation flow
- [ ] {E2E} Complete user profile management flow
- [ ] {E2E} Complete notifications flow
- [ ] {E2E} Complete admin panel flow

---

## 🛠️ Advanced Features V2 (deadline: 15 April 2026)

### 🔧 Backend

- [ ] {Feature} Preferences management for AI generation
  - [ ] {Model} User Preferences entity
  - [ ] {API} Preferences endpoint - `GET /api/v1/users/{id}/preferences`
  - [ ] {API} Update Preferences endpoint - `PUT /api/v1/users/{id}/preferences`
- [ ] {Feature} Route optimization algorithms
  - [ ] {Algorithm} TSP optimization (?)
  - [ ] {API} Route optimization endpoint - `POST /api/v1/route/optimize`
- [ ] {Feature} Achievements and experience points system
  - [ ] {Model} Achievement entity
  - [ ] {API} Achievements endpoint - `GET /api/v1/achievements?status={ALL|USER}`
  - [ ] {API} Headers based achievement tracking

### ⚛️ Frontend

- [ ] {Feature} Preferences UI for AI generation
  - [ ] {UI} Preferences Component for managing user preferences - `settings`
- [ ] {Feature} Route optimization UI
  - [ ] {UI} Route optimization interface and controls
  - [ ] {Component} Route optimization results display
  - [ ] {Integration} Integration with route optimization API
- [ ] {Feature} Achievements and gamification UI
  - [ ] {Component} Achievement progress tracking and display
  - [ ] {Component} Achievement notification system
  - [ ] {UI} User experience points and level display
- [ ] {PWA} Progressive Web App features
  - [ ] {Feature} Available to install on mobile devices

### ⚙️ Testing

- [ ] {Unit-Backend} User Preferences service tests (CRUD operations)
- [ ] {Unit-Backend} Route optimization algorithm tests (TSP implementation)
- [ ] {Unit-Backend} Achievement service tests
- [ ] {Unit-Frontend} Preferences component tests
- [ ] {Unit-Frontend} Route optimization UI tests
- [ ] {Unit-Frontend} Achievement components tests
- [ ] {Integration-Backend} Preferences endpoints tests
- [ ] {Integration-Backend} Achievement system tests
- [ ] {Integration-Frontend} Preferences workflow tests
- [ ] {E2E} Complete preferences management flow
- [ ] {E2E} Complete route optimization flow (select → optimize → save)

---

## ⭐ Nice-to-Have Features (not prioritized)

- [ ] {Feature} PDF Export of itineraries
- [ ] {Feature} Offline access to itineraries
- [ ] {Feature} Nominatim integration for location search

---

[👉 Go back](/README.md)
