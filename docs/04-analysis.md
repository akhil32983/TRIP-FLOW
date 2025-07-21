## 🧪 Analysis

### 📊 Table of Contents

1. [Entities](#-entities)
2. [Relationships](#-relationships)
3. [User Permissions](#-user-permissions)
4. [Images](#-images)
5. [Complementary Technologies](#-complementary-technologies)
6. [Algorithms](#-algorithms)
7. [Navigation Diagram](#-navigation-diagram)
8. [Page Prototypes](#-page-prototypes)

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

---

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

[👉 Go back](/README.md)