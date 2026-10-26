# 🩸 Blood Bank Management System

A full-stack Blood Bank Management System designed to manage blood donors, maintain blood stock, and handle blood requests efficiently. The system helps organize blood bank operations and makes it easier to track blood availability.

## 📌 Project Overview

The Blood Bank Management System is a web application that simplifies blood bank management by maintaining donor information, managing blood inventory, and recording blood requests in one centralized platform.

## ✨ Features

- 🩸 **Donor Management** — Add, view, update, and manage blood donor details.
- 🏥 **Blood Inventory Management** — Maintain blood stock based on blood groups.
- 📋 **Blood Request Management** — Record and manage blood requests.
- 🔍 **Blood Availability** — Check available blood groups and stock.
- 👥 **User-Friendly Interface** — Simple and responsive user interface.
- 🔗 **REST API Integration** — Connect frontend and backend services.
- 🗄️ **Database Management** — Store donor, inventory, and request details.

## 🛠️ Tech Stack

**Frontend**
- React.js
- JavaScript
- HTML5
- CSS3

**Backend**
- Java
- Spring Boot
- REST APIs

**Database**
- MySQL

**Tools**
- Git
- GitHub
- VS Code
- Postman

## 🏗️ System Architecture

```text
React.js Frontend
       |
       | HTTP Requests / REST APIs
       |
Spring Boot Backend
       |
       | Spring Data JPA
       |
   MySQL Database
```

## 📂 Main Modules

1. **Donor Module** — Maintains donor profiles and blood group details.
2. **Blood Inventory Module** — Tracks available blood stock.
3. **Blood Request Module** — Manages blood requests and their status.
4. **Database Module** — Stores and retrieves application data.

## ⚙️ Installation and Setup

### Prerequisites

Install the following before running the project:

- Node.js and npm
- Java JDK 17 or compatible version
- MySQL Server
- Maven
- Git

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd blood-bank-management-system
```

Replace `YOUR_REPOSITORY_URL` with your actual GitHub repository URL.

### 2. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE blood_bank;
```

Configure your database credentials in the Spring Boot `application.properties` file:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blood_bank
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Use your own local credentials and never commit real passwords to GitHub.

### 3. Run the Backend

Navigate to the Spring Boot project directory and execute:

```bash
mvn spring-boot:run
```

### 4. Run the Frontend

Navigate to the React frontend directory and execute:

```bash
npm install
npm run dev
```

Open the local URL displayed in your terminal to access the application.

## 🔮 Future Enhancements

- 🔐 User authentication and role-based access
- 📍 Location-based donor search
- 📧 Email notifications for blood requests
- 📊 Blood stock dashboard and analytics
- 📱 Improved mobile responsiveness
- 🩺 Blood donation camp management

## 🎯 Project Objective

To develop a centralized web application that improves the organization of donor information, blood inventory, and blood requests through a modern full-stack architecture.

## 👨‍💻 Developer

**P. Tharan**

- GitHub: [@tharanpandi07](https://github.com/tharanpandi07)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/tharan04)
- Portfolio: [Visit Portfolio](https://portfolio-chi-virid-15.vercel.app/)

---

⭐ If you find this project useful, consider giving the repository a star!

