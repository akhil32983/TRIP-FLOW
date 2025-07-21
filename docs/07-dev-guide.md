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
> | Aspect              | Description                                                                 |
> | ------------------- | --------------------------------------------------------------------------- |
> | Type                | Progressive Web App (PWA) with a client-server architecture.                |
> | Technologies        | React, React Router, TypeScript, Spring Boot, PostgreSQL, OpenRouter API.   |
> | Tools               | Visual Studio Code, Git, Docker, Postman.                                   |
> | Quality Assurance   | Unit testing (JUnit, Vitest), Integration testing (Puppeteer), E2E testing. |
> | Deployment          | Docker containers (Backend + PostgreSQL), Serverless deployment (Vercel).   |
> | Development Process | Iterative and incremental, Git version control, GitHub Actions for CI/CD.   |

---

### 🧰 Technology Stack

> **🔧 Backend**
> 
> *🚀 Spring Boot*
> Java framework for building RESTful services with embedded server and production-ready features.
> [Spring Boot](https://spring.io/projects/spring-boot)
> 
> *🔐 Spring Security*
> Framework for securing Spring Boot applications, providing authentication and authorization.
> [Spring Security](https://spring.io/projects/spring-security)
>
> *☕️ Java*
> Object-oriented programming language used for backend services.
> [Java](https://www.oracle.com/java/)
>
> *📦 Maven*
> Build automation tool for managing dependencies and building Java projects.
> [Maven](https://maven.apache.org/)
> 
> *🐘 PostgreSQL*
> Relational database management system known for its robustness and scalability.
> [PostgreSQL](https://www.postgresql.org/)
>
> *🤖 OpenRouter API*
> AI service that provides free access to various AI models for itinerary generation and optimization.
> [OpenRouter](https://openrouter.ai/)

> ---

> **⚛️ Frontend**
>
> *⚛️ React*
> JavaScript library for building user interfaces, allowing the creation of dynamic and interactive web applications.
> [React](https://reactjs.org/)
>
> *🔗 React Router*
> Declarative routing for React applications, enabling navigation and URL management.
> [React Router](https://reactrouter.com/)
> 
> *🛠️ TypeScript*
> Language that extends JavaScript with static types, enhancing code quality and maintainability.
> [TypeScript](https://www.typescriptlang.org/)
>
> *📦 Vite*
> Build tool that provides a fast development environment and optimized production builds for modern web applications.
> [Vite](https://vitejs.dev/)
>
> *📡 Axios*
> Library for making HTTP requests in a simplified way from the browser.
> [Axios](https://axios-http.com/)

> ---

> **🐳 DevOps**
>
> *🐳 Docker*
> Containerization platform for packaging applications and their dependencies into portable containers.
> [Docker](https://www.docker.com/)
>
> *🐳 Docker Compose*
> Tool for defining and running multi-container Docker applications.
> [Docker Compose](https://docs.docker.com/compose/)

---

### 🛠️ Tools

---

### 🏗️ Architecture

---

### ✅ Quality Assurance

---

### 🔄 Development Process

---

### ▶️ Code Execution and Environment Setup

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

---

[👉 Go back](/README.md)