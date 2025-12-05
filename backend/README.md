# BookConnect Backend

Spring Boot REST API backend for BookConnect - A book sharing platform.

## 🏗️ Architecture & Design Patterns

This backend follows **Clean Architecture** principles with proper separation of concerns:

### **Architectural Layers**
- **Controller Layer**: REST endpoints (Presentation)
- **Service Layer**: Business logic
- **Repository Layer**: Data access (Spring Data JPA)
- **Model/Entity Layer**: Domain objects

### **Design Patterns Used**

1. **MVC Pattern**: Controllers handle HTTP requests, Services contain business logic
2. **Repository Pattern**: Spring Data JPA repositories abstract data access
3. **Service Layer Pattern**: Business logic encapsulated in service interfaces/implementations
4. **DTO Pattern**: Separate DTOs for request/response to decouple API from domain model
5. **Dependency Injection**: Constructor injection via Spring
6. **Factory/Mapper Pattern**: Entity-to-DTO conversion centralized in mapper classes
7. **Strategy Pattern**: `FileStorageService` interface allows swapping storage implementations
8. **Singleton Pattern**: Spring beans (services, repositories, configs)
9. **Chain of Responsibility**: Security filter chain, exception handlers
10. **Adapter Pattern**: `CustomUserDetailsService` adapts our User entity to Spring Security
11. **Builder Pattern**: Lombok `@Builder` for fluent object construction
12. **Command Pattern**: `borrowBook` and `buyBook` represent user actions/commands

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL database (local or cloud)
- (Optional) Google OAuth credentials for Google sign-in

## 🚀 Quick Start

### 1. Clone the repository
```bash
cd backend
```

### 2. Configure PostgreSQL Database

Create a PostgreSQL database:
```sql
CREATE DATABASE bookconnect;
```

### 3. Set Environment Variables

Copy the sample file and adjust values:

```bash
cp .env.example .env
```

Key variables (defaults shown):

```bash
DATABASE_URL=jdbc:postgresql://localhost:5432/bookconnect
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=change_me_to_a_256bit_secret
UPLOAD_DIR=uploads
BASE_URL=http://localhost:8080
PORT=8080
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**For Cloud PostgreSQL (e.g., Neon, Supabase, Railway):**
```bash
export DATABASE_URL=jdbc:postgresql://your-cloud-db-host:5432/bookconnect?sslmode=require
export DATABASE_USERNAME=your_username
export DATABASE_PASSWORD=your_password
```

### 4. Build the Application
```bash
mvn clean install
```

### 5. Run the Application
```bash
mvn spring-boot:run
```

Or run the JAR directly:
```bash
java -jar target/bookconnect-backend-1.0.0.jar
```

The backend will start on **http://localhost:5000**

### 6. Verify Installation

Check if the API is running:
```bash
curl http://localhost:5000/api/books/categories
```

## 📚 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| POST | `/api/auth/google` | Google OAuth sign-in | No |
| GET | `/api/auth/me` | Get current user profile | Yes |

### Books (`/api/books`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/books` | Get all books (with search & filters) | No |
| GET | `/api/books/{id}` | Get book by ID | No |
| POST | `/api/books` | Upload new book | Yes |
| POST | `/api/books/{id}/borrow` | Borrow a free book | Yes |
| POST | `/api/books/{id}/buy` | Purchase a paid book | Yes |
| GET | `/api/books/categories` | Get available categories | No |

### Query Parameters for GET /api/books
- `q`: Search by title or author
- `category`: Filter by category
- `page`: Page number (default: 0)
- `size`: Page size (default: 20)

## 🔐 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication.

### Register/Login Flow
1. Register: `POST /api/auth/register`
2. Login: `POST /api/auth/login`
3. Receive JWT token in response
4. Include token in subsequent requests: `Authorization: Bearer <token>`

### Example Request Bodies

**Register:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Login:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Upload Book (multipart/form-data):**
```
title: "My Book"
author: "Author Name"
description: "Book description"
category: "Fiction"
type: "Free" or "Paid"
price: 500 (if Paid)
image: <file>
isbn: "978-1234567890" (optional)
language: "English" (optional)
pages: 300 (optional)
```

## 🗄️ Database Schema

### Tables
- **users**: User accounts (email/password or OAuth)
- **books**: Book listings
- **borrows**: Borrow transactions for free books
- **purchases**: Purchase records for paid books

### Sample Users (from migration)
- **Admin**: `admin@bookconnect.com` / `admin123`
- **User**: `user@bookconnect.com` / `user123`

## 🧪 Testing

### Test with cURL

**Get Categories:**
```bash
curl http://localhost:5000/api/books/categories
```

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Get Books:**
```bash
curl http://localhost:5000/api/books
```

**Upload Book (requires authentication):**
```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "title=My Book" \
  -F "author=Author Name" \
  -F "description=Description" \
  -F "category=Fiction" \
  -F "type=Free" \
  -F "image=@/path/to/image.jpg"
```

## 🔧 Configuration

### application.yml

Key configurations in `src/main/resources/application.yml`:

- **Database**: PostgreSQL connection settings
- **JWT**: Secret key and expiration
- **File Upload**: Max size (10MB), upload directory
- **CORS**: Allowed origins for frontend
- **OAuth**: Google client credentials

### Flyway Migrations

Database migrations are in `src/main/resources/db/migration/`:
- `V1__Initial_Schema.sql`: Creates tables
- `V2__Insert_Sample_Data.sql`: Adds sample data

## 📁 Project Structure

```
backend/
├── src/main/java/com/bookconnect/
│   ├── BookConnectApplication.java    # Main entry point
│   ├── config/                         # Spring configurations
│   │   ├── SecurityConfig.java        # Security & CORS
│   │   └── WebConfig.java             # Static file serving
│   ├── controller/                     # REST controllers
│   │   ├── AuthController.java
│   │   └── BookController.java
│   ├── dto/                            # Data Transfer Objects
│   │   ├── request/
│   │   └── response/
│   ├── exception/                      # Custom exceptions & handlers
│   ├── mapper/                         # Entity-DTO mappers
│   ├── model/                          # JPA entities & enums
│   ├── repository/                     # Spring Data JPA repos
│   ├── security/                       # JWT & authentication
│   └── service/                        # Business logic
│       └── impl/
├── src/main/resources/
│   ├── application.yml                 # App configuration
│   └── db/migration/                   # Flyway SQL scripts
├── uploads/                            # File storage directory
└── pom.xml                             # Maven dependencies
```

## 🔗 Frontend Integration

Update your frontend's `axios.js` to point to this backend:

```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});
```

The backend already has CORS configured to accept requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)

## 🚢 Deployment

### Environment Variables for Production

Set these in your deployment environment:

```bash
DATABASE_URL=jdbc:postgresql://your-production-db:5432/bookconnect
DATABASE_USERNAME=prod_user
DATABASE_PASSWORD=secure_password
JWT_SECRET=your_production_jwt_secret_at_least_256_bits
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
PORT=5000
BASE_URL=https://your-backend-domain.com
CORS_ORIGINS=https://your-frontend-domain.com
```

### Build for Production

```bash
mvn clean package -DskipTests
java -jar target/bookconnect-backend-1.0.0.jar
```

## 🛠️ Technologies Used

- **Spring Boot 3.2.0**: Framework
- **Spring Security**: Authentication & authorization
- **Spring Data JPA**: Database access
- **PostgreSQL**: Database
- **Flyway**: Database migrations
- **JWT (JJWT)**: Token-based auth
- **Lombok**: Reduce boilerplate
- **Maven**: Build tool
- **Google OAuth2**: Social login

## 📝 License

MIT License

## 👨‍💻 Developer Notes

### Adding New Endpoints
1. Create DTO in `dto/request` or `dto/response`
2. Add method to service interface
3. Implement in service implementation
4. Add controller endpoint
5. Update security config if needed

### Design Patterns Reference
- **Controllers**: MVC pattern, handle HTTP
- **Services**: Business logic, transaction management
- **Repositories**: Data access abstraction
- **Security**: Filter chain, JWT validation
- **Exceptions**: Global handler with `@RestControllerAdvice`

## 🐛 Troubleshooting

**Database connection failed:**
- Verify PostgreSQL is running
- Check DATABASE_URL, username, password
- Ensure database exists

**JWT token errors:**
- Verify JWT_SECRET is set and at least 256 bits
- Check token format: `Bearer <token>`

**File upload issues:**
- Check UPLOAD_DIR exists and is writable
- Verify file size under 10MB
- Check static resource mapping in WebConfig

**CORS errors:**
- Add your frontend URL to CORS_ORIGINS
- Verify SecurityConfig CORS configuration
