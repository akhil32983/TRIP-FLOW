<div align="center">
  <img src="docs/assets/banner.svg" alt="TripFlow Banner" />
</div>

---

> **🧭 Overview**
> 
> **TripFlow** is an innovative Progressive Web App (PWA) designed for comprehensive travel itinerary management and intelligent route optimization. Built with modern web technologies, it empowers travelers to create, customize, and optimize their journeys with the help of artificial intelligence and advanced algorithms.
> 
> This **Final Degree Project (TFG)** develops a travel planning application using Spring Boot and React, with AI-powered itinerary generation and route optimization algorithms. The project demonstrates the integration of modern web technologies to solve real-world travel planning challenges.
> 
> This project is developed as part of the Final Degree Project (TFG) for the **Bachelor’s Degree in Software Engineering** at **ETSII - Universidad Rey Juan Carlos**.


> ---

> **⚙️ Methodology**
> 
> This TFG will follow an incremental and iterative development model following the next phases:
> 
> | Phase   | Description                                 | Deadline          |
> | ------- | ------------------------------------------- | ----------------- |
> | Phase 1 | Functionality Definition and prototype      | 15 September 2025 |
> | Phase 2 | Repository setup, testing and CI/CD         | 15 October 2025   |
> | Phase 3 | v0.1 - Basic functionality and Docker setup | 15 December 2025  |
> | Phase 4 | v0.2 - Intermediate functionality           | 1 March 2026      |
> | Phase 5 | v1.0 - Advanced functionality               | 15 April 2026     |
> | Phase 6 | TFG Memory                                  | 15 May 2026       |
> | Phase 7 | Final Presentation and Defense              | 15 June 2026      |
> 
> See the [Roadmap](docs/roadmap.md) for detailed project features and timelines.
> 
> You can also check my [Medium Blog](https://medium.com/@cub1z) for more information about the project development and updates.


---

## 👥 Project Team

| Role        | Name                 | GitHub                                                   | LinkedIn                                                            |
| ----------- | -------------------- | -------------------------------------------------------- | ------------------------------------------------------------------- |
| **Student** | Diego Sánchez Rincón | [@CuB1z](https://github.com/CuB1z)                       | [Diego Sánchez Rincón](https://www.linkedin.com/in/cub1z/)          |
| **Tutor**   | Óscar Soto Sánchez   | [@OscarSotoSanchez](https://github.com/OscarSotoSanchez) | [Óscar Soto Sánchez](https://www.linkedin.com/in/oscarsotosanchez/) |

---

## 📋 Phase 1 - Functionality Definition

> **TripFlow**
> The application to be developed is a Progressive Web App (PWA) for travel itinerary management and optimized route planning.
>
> It will allow users to create, visualize, and modify personalized trips, add activities manually or through automatic generation by Artificial Intelligence, and optimize daily routes using TSP (Traveling Salesman Problem) type algorithms.
>
> The system will feature a backend developed in Spring Boot, frontend in React with Vite, and PostgreSQL storage.

---

### 🎯 Objectives

> **✅ Functional Objectives**
> 
> The goal of the application is to allow users to plan, organize, and optimize their travel itineraries in a personalized and intelligent way. Users will be able to manage trips, add activities and interact with features that enrich their travel experience.
> 
> - Users can create, edit, and delete travel itineraries.
> - Each itinerary can include multiple days and scheduled activities.
> - Activities can be manually added or automatically generated through AI.
> - Users can visualize trip statistics such as total distance or days planned.
> - The app will offer an optimization algorithm service to improve daily routes.
> - Users can unlock achievements based on usage and travel goals.
> - Itineraries can be exported as PDF files.
> - A responsive web interface allows access across devices.
> - The app will ensure offline access.

> ---

> **🧪 Technical Objectives**
>
> The technical objectives focus on the implementation of a full-stack application using modern technologies and best practices in software development. It will follow a client-server architecture with a RESTful API, it will integrate AI services and an optimization service for route planning enhancement.
> 
> - Client-side application developed using React-Router + Vite + TypeScript.
> - Server-side application developed using Spring Boot exposing a RESTful API.
> - Testing coverage for both frontend and backend using JUnit, TestingContainers, Vitest, and Puppeteer.
> - Database management using PostgreSQL with JPA Repository from SpringBoot.
> - Integration with OpenRouter API for AI itinerary generation.
> - Implementation of TSP optimization algorithms.
> - Use of Docker for containerization and making easier CI/CD processes.
> - Implementation of a Progressive Web App (PWA) with offline capabilities.
> - User authentication and session management using JWT tokens.
> - Generation of PDF summaries through PDFjs library.
> - Data visualization using interactive charts.

---

### ✨ Features

> **⚡ Basic Functionality (Core MVP)**
>
> Minimal features required for the application to be usable and testable by the end user.
> 
> - User registration, login, logout, and token refresh system.
> - Role-based access control.
> - Public landing page and user dashboard.
> - CRUD operations for itineraries, including days, activities, and locations.
> - View, create, update and delete itineraries.
> - Basic profile page for logout and basic user details.
> - Frontend-backend integration via REST API.
> - 404 error page and basic routing.

> ---

> **🚀 Intermediate Functionality**
>
> Additional features that enhance the user experience and add value to the application.
> 
> - Avatar functionality for user profile pictures.
> - User profile page with detailed information.
> - Editing and deleting profiles.
> - Display of itinerary statistics (number of trips, days, destinations).
> - AI-powered itinerary generation based on user preferences.
> - Administration panel for user and AI logs management.

> ---

> **🌟 Advanced Functionality**
> 
> Features that provide a competitive advantage and improve the overall user experience.
>
> - User preferences management for AI generation.
> - Routes and itineraries optimization.
> - Achievements and experience points system.
> - Progressive Web App (PWA) features for offline access and mobile installation.
> - PDF export of itineraries.

---

### 🛠️ Technology Stack

> **🔧 Backend**
> 
> - *Framework*: Spring Boot with Spring Security (JWT)
> - *Database*: PostgreSQL with JPA Repository
> - *Testing*: JUnit 5, Mockito, RestAssured
> - *AI Integration*: OpenRouter API
> - *Algorithms*: TSP optimization (Greedy, 2-Opt)

> ---

> **⚛️ Frontend**
> - *Framework*: React with TypeScript + Vite
> - *Routing*: React Router
> - *HTTP Client*: Axios
> - *Testing*: Vitest, React Testing Library, Puppeteer
> - *PWA*: Service Workers, vite-plugin-pwa

> ---

> **🐳 DevOps**
> - *Containerization*: Docker + Docker Compose

---

### 📦 Entities

> **👤 User**
> 
> User entity represents the application users, including their authentication details and profile information.
> 
> - id: Long (Primary key, auto-increment)
> - username: String (Unique, not null)
> - hashedPassword: String (Not null)
> - role: UserType (Not null)
> - name: String (Nullable)
> - description: String (Nullable)
> - location: String (Nullable)
> - avatar: Blob (Nullable)
> - createdAt: Timestamp (Not null, auto-generated)
> 
> *Relationships:*
> - Itineraries: One-to-many relationship with Itinerary
> - AI Log: One-to-many relationship with AILog
> - Achievements: One-to-many relationship with Achievement
> - Preferences: One-to-one relationship with UserPreferences

> ---

> **🛜User Preferences**
> 
> UserPreferences entity stores the preferences of users for AI-generated itineraries.
> 
> - id: Long (Primary key, auto-increment)
> - style: StylePreference (enum)
> - budget: BudgetPreference (enum)
> - lodging: LodgingPreference (enum)
> - transport: TransportPreference (enum)
> - duration: DurationPreference (enum)
> - interests: List<String> (default: empty)
> 
> *Relationships:*
> - user: User (One-to-one relationship)

> ---

> **🤖 AILog**
> 
> AI log entity stores the history of AI-generated itineraries for users.
> 
> - id: Long (Primary key, auto-increment)
> - place: String (Not null)
> - days: int (Positive, default: 1)
> - createdAt: Timestamp (Not null, auto-generated)
> - user: User (Foreign key)
>
> *Relationships:*
> - user: User (Many-to-one relationship)

> ---

> **🏆 Achievement**
>
> Achievement entity tracks user achievements in the application.
>
> - id: Long (Primary key, auto-increment)
> - type: AchievementType (Enum)
> - createdAt: Timestamp (Not null, auto-generated)
> - user: User (Foreign key)
>
> *Relationships:*
> - user: User (Many-to-one relationship)

> ---

> **🗺️ Itinerary**
>
> Itinerary entity represents a travel itinerary, including its days and activities.
>
> - id: Long (Primary key, auto-increment)
> - place: String (Not null)
> - updatedCount: long (Default: 0)
> - status: ItineraryStatus (Enum, default: DRAFT)
> - createdAt: Timestamp (Not null, auto-generated)
> - user: User (Foreign key)
>
> *Relationships:*
> - user: User (Many-to-one relationship)
> - itineraryDays: One-to-many relationship with ItineraryDay
 
> ---

> **📅 ItineraryDay**
> 
> ItineraryDay entity represents a single day within an itinerary, including its activities.
> 
> - id: Long (Primary key, auto-increment)
> - day: int (Positive)
> - itinerary: Itinerary (Foreign key)
>
> *Relationships:*
> - itinerary: Itinerary (Many-to-one relationship)

> ---

> **🎯 Activity**
> 
> Activity entity represents an activity scheduled for a specific day in an itinerary.
> 
> - id: Long (Primary key, auto-increment)
> - activity: String (Not null)
> - details: String (Nullable)
> - time: String (Nullable)
> - duration: String (Nullable)
> - itineraryDay: ItineraryDay (Foreign key)
> - location: Location (Foreign key)
>
> *Relationships:*
> - itineraryDay: ItineraryDay (Many-to-one relationship)
> - location: Location (Many-to-one relationship)

> ---

> **📍 Location**
>
> Location entity represents a geographical location that can be associated with activities.
> 
> - id: Long (Primary key, auto-increment)
> - name: String (Not null)
> - latitude: double (Not null)
> - longitude: double (Not null)
> - address: String (Nullable)
>
> *Relationships:*
> - activities: One-to-many relationship with Activity

---

### 🔒 User Permissions

> **🛜 Public Users**
> - Access to the landing page and general information
> - Demo of the application

> ---

> **🔐 Registered Users**
> - Full access to all features
> - Ability to create, edit, and delete itineraries
> - AI itinerary generation and advanced route optimization
> - Achievement tracking

> ---

> **🔑 Admin Users**
> - User management (create, edit, delete users)
> - Manage application settings (AI rate limits, optimization algorithms, etc.)

---

### 🖼️ Images

> **🧑‍🦱 User Avatar**
>
> Users will have the ability to upload and manage their profile pictures.

---

### 📶 Complementary Technologies

> **🌐 External API Rest**
> 
> The application will integrate the OpenRouter API to provide AI-powered itinerary generation capabilities.

> ---

> **📝 PDF Generation**
>
> The application will use the PDFjs library to generate PDF summaries of itineraries, allowing users to export their travel plans in a portable format.

---

### 🧮 Algorithms

> **🧩 Route Optimization**
>
> The application will implement advanced algorithms to optimize travel routes, taking into account factors such as distance and time.

---

### 🧭 Navigation Diagram

> ![Navigation Diagram](/docs/assets/navigation.svg)

### 🎨 Page Prototypes

> **📄 Landing Page**
> 
> This is the initial page users see when they access the web application. It provides an overview of the application features and allows users to log in or register.
>
> ![Landing Page Prototype](/docs/assets/pages/01-landing.png)

> ---

> **📄 Login Page**
>
> The login page allows users to access their accounts by entering their credentials.
> 
> ![Login Page Prototype](/docs/assets/pages/02-login.png)

> ---

> **📄 Registration Page**
>
> The registration page allows new users to create an account by providing their information.
>
> ![Registration Page Prototype](/docs/assets/pages/03-register.png)

> ---

> **📄 Dashboard Page**
>
> The dashboard page provides users with an overview of their itineraries, statistics, and more.
>
> ![Dashboard Page Prototype](/docs/assets/pages/04-dashboard.png)

> ---

> **📄 Itineraries Page**
>
> The itineraries page allows users to view and manage their travel itineraries.
>
> ![Itineraries Page Prototype](/docs/assets/pages/05-itineraries.png)

> ---

> **📄 Itinerary Details Page**
>
> The itinerary details page provides users with a detailed view of a specific itinerary, including all associated activities, locations, and notes.
>
> ![Itinerary Details Page Prototype](/docs/assets/pages/06-itinerary-details.png)

> ---

> **📄 Create Itinerary Page**
>
> The create itinerary page allows users to create a new travel itinerary by providing all necessary details, including destinations, activities, and dates.
>
> ![Create Itinerary Page Prototype](/docs/assets/pages/07-create-itinerary.png)

> ---

> **📄 Edit Itinerary Page**
>
> The edit itinerary page allows users to modify an existing travel itinerary by updating its details, including destinations, activities, and dates.
>
> ![Edit Itinerary Page Prototype](/docs/assets/pages/08-edit-itinerary.png)

> ---

> **📄 Profile Page**
>
> The profile page allows users to view and edit their personal information, including their avatar, name, and description. Also, users can view their achievements and preferences.
>
> ![Profile Page Prototype](/docs/assets/pages/09-profile.png)

> ---

> **📄 Settings Page**
>
> The settings page allows users to configure their preferences or more advanced settings related to the application.
>
> ![Settings Page Prototype](/docs/assets/pages/10-settings.png)

---

## 🧪 Development Environment

> **🚀 Running a SQL PostgreSQL Database**
>
> To run the application locally, you need to have a PostgreSQL database set up. You can use Docker to quickly create a PostgreSQL container. Here’s how to do it:
>
> ```bash
> docker run --name tripflow-postgres -e POSTGRES_USER=YOUR_USER -e POSTGRES_PASSWORD=YOUR_PASSWORD -e POSTGRES_DB=tripflow_db -p 5432:5432 -d postgres:latest
> ```
>
> This command will create a new PostgreSQL container with the specified user, password, and database name.
> 
> Make sure to replace `application.properties` file in the backend with your database credentials:
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

## 📄 License

> Licensed under the Apache License, Version 2.0 (the "License");
> you may not use this file except in compliance with the License.
> You may obtain a copy of the License at
> 
>     http://www.apache.org/licenses/LICENSE-2.0
> 
> Unless required by applicable law or agreed to in writing, software
> distributed under the License is distributed on an "AS IS" BASIS,
> WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
> See the License for the specific language governing permissions and
> limitations under the License.

---