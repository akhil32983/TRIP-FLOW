## 🛠️ Development Guide

### 📊 Table of Contents

1. [Introduction](#-introduction)
2. [Technology Stack](#-technology-stack)
3. [Tools](#-tools)
4. [Architecture](#-architecture)
5. [Quality Assurance](#-quality-assurance)
6. [Development Process](#-development-process)
7. [Code Execution and Environment Setup](#-code-execution-and-environment-setup)

---

### 🚀 Introduction

> **📖 Overview**
>
> This web application follows a Progressive Web App (PWA) model with a client-server architecture.
>
> As a PWA, it offers a smooth experience in the browser, including offline capabilities, installability, and fast performance.
>
> The client manages the user interface dynamically, while the server handles data processing, business logic, and persistence through RESTful APIs.
>
> The application consists of three main components:
>
> - **Client:** React + TypeScript + Vite PWA.
> - **Server:** Spring Boot backend exposing REST APIs.
> - **Database:** PostgreSQL for data storage.
>
> This architecture allows scalability and maintainability by separating concerns between the client and server.

> ---

> **📝 Summary**
>
> | Aspect              | Description                                                                                |
> | ------------------- | ------------------------------------------------------------------------------------------ |
> | Type                | Progressive Web App (PWA) with a client-server architecture.                               |
> | Technologies        | React, React Router, TypeScript, Spring Boot, PostgreSQL, OpenRouter API.                  |
> | Tools               | Visual Studio Code, Git, Docker, Postman.                                                  |
> | Quality Assurance   | Unit testing (JUnit, Vitest), Integration testing (RestAssured), E2E testing (Playwright). |
> | Deployment          | TBD                                                                                        |
> | Development Process | Iterative and incremental, Git version control, GitHub Actions for CI/CD.                  |

---

### 🧰 Technology Stack

> **🔧 Backend**
>
> _🚀 Spring Boot_
>
> Java framework for building RESTful services with embedded server and production-ready features.
>
> [Spring Boot](https://spring.io/projects/spring-boot)
>
> _🔐 Spring Security_
>
> Framework for securing Spring Boot applications, providing authentication and authorization.
>
> [Spring Security](https://spring.io/projects/spring-security)
>
> _☕️ Java_
>
> Object-oriented programming language used for backend services.
>
> [Java](https://www.oracle.com/java/)
>
> _📦 Maven_
>
> Build automation tool for managing dependencies and building Java projects.
>
> [Maven](https://maven.apache.org/)
>
> _🐘 PostgreSQL_
>
> Relational database management system known for its robustness and scalability.
>
> [PostgreSQL](https://www.postgresql.org/)
>
> _🤖 OpenRouter API_
>
> AI service that provides free access to various AI models for itinerary generation and optimization.
>
> [OpenRouter](https://openrouter.ai/)

> ---

> **⚛️ Frontend**
>
> _⚛️ React_
>
> JavaScript library for building user interfaces, allowing the creation of dynamic and interactive web applications.
>
> [React](https://reactjs.org/)
>
> _🔗 React Router_
>
> Declarative routing for React applications, enabling navigation and URL management.
>
> [React Router](https://reactrouter.com/)
>
> _🛠️ TypeScript_
>
> Language that extends JavaScript with static types, enhancing code quality and maintainability.
>
> [TypeScript](https://www.typescriptlang.org/)
>
> _📦 Vite_
>
> Build tool that provides a fast development environment and optimized production builds for modern web applications.
>
> [Vite](https://vitejs.dev/)
>
> _📡 Axios_
>
> Library for making HTTP requests in a simplified way from the browser.
>
> [Axios](https://axios-http.com/)

> ---

> **🐳 DevOps**
>
> _🐳 Docker_
>
> Containerization platform for packaging applications and their dependencies into portable containers.
>
> [Docker](https://www.docker.com/)
>
> _🐳 Docker Compose_
>
> Tool for defining and running multi-container Docker applications.
>
> [Docker Compose](https://docs.docker.com/compose/)

---

### 🛠️ Tools

> **🖥️ Visual Studio Code**
> IDE for code editing with support for TypeScript, Java, and Docker.
> [Visual Studio Code](https://code.visualstudio.com/)

> ---

> **📦 Postman**
> API Rest Client for testing and interacting with RESTful APIs.
> [Postman](https://www.postman.com/)

> ---

> **🔧 Git**
> Version control system for tracking changes in source code during software development.
> [Git](https://git-scm.com/)

> ---

> **📦 GitHub**
> Cloud-based repository hosting service for version control and collaboration.
> [GitHub](https://github.com/)

---

### 🏗️ Architecture

---

### ✅ Quality Assurance

---

### 🔄 Development Process

> **🎯 Development Methodology**
>
> TripFlow follows an **iterative and incremental development process** based on Agile principles from the Agile Manifesto. The development approach incorporates selected best practices from **Extreme Programming (XP)** and **Kanban** methodologies.
>
> _XP Practices Implemented:_
>
> - Continuous integration with automated testing.
> - Refactoring for code quality improvement.
> - Simple design and clean code principles.
>
> _Kanban Elements:_
>
> - Visual workflow management through GitHub Projects.
> - Work-in-progress (WIP) limits.

> ---

> **📋 Task Management**
>
> _GitHub Projects_
>
> Project organization is managed through GitHub Projects, providing progress tracking and reporting dashboards. The project board is divided into columns representing different stages of the development process:
>
> - **🎯 To Do:** Prioritized tasks ready for development. Limited to 15 TODO tasks.
> - **⚙️ In Progress:** Currently being worked on. Limited to 5 tasks in progress.
> - **✅ Done:** Completed and deployed features. Tasks are moved here after finishing and merging.

> ---

> **🌿 Git Workflow & Branching Strategy**
>
> _🔀 Branching Workflow_
>
> 1. **Feature Development:** Create `feat-*` branches from `develop`
> 2. **Integration:** Regular merges to `develop` branch
> 3. **Release:** Periodic merges from `develop` to `main`
>
> _📊 Git Metrics_
>
> | Metric                  | Value |
> | ----------------------- | ----- |
> | Total Commits           | TBD   |
> | Total Branches          | TBD   |
> | Active Feature Branches | TBD   |
> | Contributors            | TBD   |
> | Average Commits/Week    | TBD   |
> | Code Review Coverage    | TBD   |

> ---

> **🔄 Continuous Integration (CI/CD)**
>
> _⚙️ GitHub Actions Workflows_
>
> The project implements automated CI/CD pipelines using GitHub Actions with the following workflows:
>
> **1. Unit Tests Workflow (`ci-unit-tests.yaml`):**
>
> **Triggers:**
>
> - Push to `main`, `develop`, and `feat-*` branches
> - Pull requests to `main` and `develop`
> - Manual workflow dispatch
> - Path-based filtering for backend and frontend changes
>
> **Backend Unit Testing:**
>
> - ☕️ Java 21 with Temurin distribution setup
> - 📦 Maven dependency caching for faster builds
> - 🧪 Unit tests execution with `mvn test -Dgroups=unit`
> - 🔐 Secure environment variables (JWT_SECRET, POSTGRES_PASSWORD)
>
> **Frontend Unit Testing:**
>
> - 🟢 Node.js 24 environment setup
> - 📦 NPM dependency installation and caching
> - 🧪 Vitest test execution with `npm run test --watch=false`
>
> **2. Integration Tests Workflow (`ci-integration-tests.yaml`):**
>
> **Triggers:**
>
> - Push to `main` and `develop` branches
> - Pull requests to `main` branch
> - Backend code changes only (path filtering)
> - Manual workflow dispatch
>
> **Backend Integration Testing:**
>
> - 🐘 PostgreSQL database integration testing
> - 🧪 Integration tests with `mvn test -Dgroups=integration`
> - 🔐 Environment-specific configuration
> - 📊 Comprehensive test result reporting

---

### ▶️ Code Execution and Environment Setup

> **📥 Clone and access the Repository**
> You can clone the repository using the following command:
>
> ```bash
> git clone https://github.com/codeurjc-students/2025-TripFlow.git TripFlow
> cd TripFlow
> ```

> ---

> **🚀 Running a SQL PostgreSQL Database**
>
> To run the application locally, you need to have a PostgreSQL database set up. You can use Docker to quickly create a PostgreSQL container. Here’s how to do it:
>
> ```bash
> docker run --name tripflow-postgres -e POSTGRES_USER=YOUR_USER -e POSTGRES_PASSWORD=YOUR_PASSWORD -e POSTGRES_DB=tripflow_db -p 5432:5432 -d postgres:latest
> ```
>
> Replace `YOUR_USER` and `YOUR_PASSWORD` with your desired PostgreSQL username and password.
>
> This command will create a new PostgreSQL container with the specified user, password, and database name.
>
> Make sure to replace `application.properties` file in the backend with your database credentials:
>
> ```properties
> spring.datasource.url=${POSTGRES_URL:jdbc:postgresql://localhost:5432/tripflow_db}
> spring.datasource.username=${POSTGRES_USER:YOUR_USER}
> spring.datasource.password=${POSTGRES_PASSWORD:YOUR_PASSWORD}
> spring.datasource.driver-class-name=org.postgresql.Driver
> spring.jpa.hibernate.ddl-auto=create-drop // for development, change to 'update' for production
> ```

> ---

> **🛠️ Environment Variables**
>
> In order to use environment variables from a `.env` file, you need to have the `dotenv-java` dependency in your backend project.
> This allows to define sensitive information and configuration settings without hardcoding them into the source code.
> A `.env.example` file is provided in the backend directory. You can create a `.env` file based on this example and fill in your specific values.

> ---

> **🚀 Running the backend**
> To run the backend api, navigate to the `backend` directory and run the following command:
>
> ```bash
> # For Linux and MacOS
> ./mvnw spring-boot:run
>
> # For Windows
> mvnw.cmd spring-boot:run
> ```

> ---

> **🚀 Running the frontend**
> To run the frontend application, navigate to the `frontend` directory and run the following commands:
>
> ```bash
> npm install
> npm run dev
> ```

> ---

> **🌐 Accessing the Application**
> Once both the backend and frontend are running, you can access the application in your web browser at:
>
> ```
> http://localhost:5173
> ```

> ---

> **🪧 Postman Usage**
> If you want to test the backend API endpoints, you can use Postman. Import the provided Postman collection root directory `TripFlow.postman_collection.json` into Postman and start testing the API endpoints.
>
> If you don't have Postman installed, you can download it from [here](https://www.postman.com/downloads/).

> ---

> **🧪 Running Tests**
> To run the following tests, we recommend having Docker Desktop installed and running for Windows or MacOS and Docker Engine for Linux.
> 
> Navigate to the `scripts` directory where you will find the test scripts for backend, frontend, and E2E tests.
> 
> Here are the commands to run the different types of tests included in the project:
>
> _Backend Tests:_
> ```bash
> # For Linux and MacOS
> ./run-backend-test.sh
>
> # For Windows
> run-backend-test.cmd
> ```
>
> _Frontend Tests:_
> ```bash
> # For Linux and MacOS
> ./run-frontend-test.sh
>
> # For Windows
> .\run-frontend-test.cmd
> ```
>
> _E2E Tests:_
> ```bash
> # For Linux and MacOS
> ./run-e2e-test.sh
>
> # For Windows
> .\run-e2e-test.cmd
> ```
>
> Backend and Frontend test scripts will generate coverage reports in the `docs/coverage` directory. You can open the `index.html` files in your web browser to view the coverage reports.

---

[👉 Go back](/README.md)
