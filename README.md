# 📚 BookConnect

A full-stack book sharing platform where users can browse, borrow, and buy books from other users. Connect with fellow book lovers and share your collection!

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://jubilant-light-production.up.railway.app](https://jubilant-light-production.up.railway.app) |
| **Backend API** | [https://bookconnect-production.up.railway.app](https://bookconnect-production.up.railway.app) |

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.5-38B2AC)

## 🌟 Features

### For Users
- **User Authentication** - Secure registration and login with JWT tokens
- **Browse Books** - Explore books by category, search, and filter
- **Borrow Books** - Request to borrow books from other users (Free)
- **Buy Books** - Purchase books listed for sale (Paid)
- **Upload Books** - Share your book collection with the community
- **Dashboard** - Manage your books, requests sent, and requests received
- **Profile Management** - Update your profile with contact details and profile picture

### Book Types
- **Free Books** - Available for borrowing
- **Paid Books** - Available for purchase with listed price

## 🏗️ Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming Language |
| Spring Boot | 3.2.0 | Backend Framework |
| Spring Security | 6.1.1 | Authentication & Authorization |
| Spring Data JPA | 3.2.0 | Database ORM |
| PostgreSQL | 17.6 | Database (Supabase) |
| Flyway | 9.22.3 | Database Migrations |
| JWT (jjwt) | 0.12.3 | Token-based Authentication |
| Lombok | - | Boilerplate Reduction |
| Maven | - | Build Tool |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Library |
| Vite | 5.0.0 | Build Tool & Dev Server |
| React Router | 6.20.0 | Client-side Routing |
| Axios | 1.6.2 | HTTP Client |
| Tailwind CSS | 3.3.5 | Styling |
| Heroicons | 2.2.0 | Icons |

## 📁 Project Structure

```
BookConnect/
├── backend/                    # Spring Boot Backend
│   ├── src/main/java/com/bookconnect/
│   │   ├── config/            # Configuration classes
│   │   ├── controller/        # REST API Controllers
│   │   ├── dto/               # Data Transfer Objects
│   │   │   ├── request/       # Request DTOs
│   │   │   └── response/      # Response DTOs
│   │   ├── exception/         # Custom Exceptions
│   │   ├── mapper/            # Entity-DTO Mappers
│   │   ├── model/             # JPA Entities
│   │   ├── repository/        # Data Repositories
│   │   ├── security/          # Security Configuration
│   │   ├── service/           # Business Logic
│   │   └── util/              # Utility Classes
│   ├── src/main/resources/
│   │   ├── application.yml    # Application Configuration
│   │   └── db/migration/      # Flyway Migrations
│   └── pom.xml                # Maven Dependencies
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── api/               # Axios Configuration
│   │   ├── components/        # Reusable Components
│   │   │   ├── BookDetails/   # Book Card Components
│   │   │   ├── Footer/        # Footer Component
│   │   │   ├── Navbar/        # Navigation Bar
│   │   │   └── SidebarProfile/# Sidebar Component
│   │   ├── context/           # React Context Providers
│   │   │   ├── AuthContext.jsx
│   │   │   ├── Bookcontext.jsx
│   │   │   └── DashboardContext.jsx
│   │   ├── pages/             # Page Components
│   │   │   ├── Browse/        # Browse Books Page
│   │   │   ├── Dashboard/     # User Dashboard
│   │   │   ├── Home/          # Landing Page
│   │   │   ├── Login/         # Login Page
│   │   │   ├── Register/      # Registration Page
│   │   │   └── UploadBook/    # Upload Book Page
│   │   ├── App.jsx            # Main App Component
│   │   └── main.jsx           # Entry Point
│   ├── package.json           # NPM Dependencies
│   └── vite.config.js         # Vite Configuration
│
└── README.md                   # This File
```

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 18** or higher
- **Maven 3.8** or higher
- **PostgreSQL** database (or Supabase account)

### Environment Variables

Create environment variables or set them before running:

```bash
# Database Configuration
DATABASE_URL=jdbc:postgresql://your-host:5432/postgres?sslmode=require
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password

# JWT Configuration
JWT_SECRET=your-base64-encoded-secret-key

# Java Home (macOS with Homebrew)
JAVA_HOME=/opt/homebrew/opt/openjdk@17
```

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/ShafiqHussain06032006/BookConnect.git
cd BookConnect
```

#### 2. Backend Setup

```bash
cd backend

# Set environment variables
export JAVA_HOME=/opt/homebrew/opt/openjdk@17
export DATABASE_URL="jdbc:postgresql://your-host:5432/postgres?sslmode=require"
export DATABASE_USERNAME="your-username"
export DATABASE_PASSWORD="your-password"
export JWT_SECRET="your-base64-encoded-secret"

# Run the backend
mvn spring-boot:run
```

The backend will start on **http://localhost:8080**

#### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

The frontend will start on **http://localhost:3000**

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Books
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/books` | Get all books |
| GET | `/api/books/{id}` | Get book by ID |
| POST | `/api/books` | Upload new book |
| PUT | `/api/books/{id}` | Update book |
| DELETE | `/api/books/{id}` | Delete book |
| GET | `/api/books/my-books` | Get user's books |
| GET | `/api/books/categories` | Get all categories |
| POST | `/api/books/{id}/borrow` | Borrow a book |
| POST | `/api/books/{id}/buy` | Buy a book |

### Requests
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/requests/sent` | Get requests sent |
| GET | `/api/requests/received` | Get requests received |
| GET | `/api/purchases/sent` | Get purchases made |
| GET | `/api/purchases/received` | Get purchase requests received |

## 🗄️ Database Schema

### Users Table
- `id` (UUID) - Primary Key
- `name` (VARCHAR) - User's full name
- `email` (VARCHAR) - Unique email
- `password` (VARCHAR) - Hashed password
- `phone` (VARCHAR) - Contact number
- `profile_picture` (VARCHAR) - Profile image URL
- `provider` (ENUM) - LOCAL/GOOGLE
- `role` (ENUM) - USER/ADMIN
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Books Table
- `id` (UUID) - Primary Key
- `title` (VARCHAR) - Book title
- `author` (VARCHAR) - Author name
- `description` (TEXT) - Book description
- `category` (VARCHAR) - Book category
- `type` (ENUM) - FREE/PAID
- `price` (DECIMAL) - Price (for paid books)
- `image_url` (VARCHAR) - Book cover image
- `isbn` (VARCHAR) - ISBN number
- `language` (VARCHAR) - Book language
- `pages` (INTEGER) - Number of pages
- `uploader_id` (UUID) - Foreign Key to Users
- `available` (BOOLEAN) - Availability status
- `created_at` (TIMESTAMP)

### Borrow Requests Table
- `id` (UUID) - Primary Key
- `book_id` (UUID) - Foreign Key to Books
- `borrower_id` (UUID) - Foreign Key to Users
- `full_name` (VARCHAR) - Borrower's name
- `phone` (VARCHAR) - Contact number
- `city` (VARCHAR) - City
- `address` (TEXT) - Full address
- `message_to_owner` (TEXT) - Optional message
- `status` (ENUM) - PENDING/ACCEPTED/REJECTED
- `request_type` (ENUM) - BORROW/BUY
- `created_at` (TIMESTAMP)

## 🎨 Screenshots

### Home Page
The landing page with hero section and featured books.

### Browse Books
Grid view of all available books with category filters.

### Book Details
Detailed view with borrow/buy options.

### Dashboard
User dashboard with:
- Overview statistics
- My Books management
- Requests Sent tracking
- Requests Received management
- Purchases Made history
- Purchase Requests Received

## 🔐 Security

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - BCrypt password encoding
- **CORS Configuration** - Configured for frontend origin
- **Request Validation** - Input validation on all endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Shafiq Hussain**
- GitHub: [@ShafiqHussain06032006](https://github.com/ShafiqHussain06032006)

## 🙏 Acknowledgments

- Spring Boot team for the amazing framework
- React team for the UI library
- Tailwind CSS for the styling utilities
- Supabase for the database hosting

---

⭐ **Star this repo if you find it helpful!**
