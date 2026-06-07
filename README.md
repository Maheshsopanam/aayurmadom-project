# Aayurmadom

A Full-Stack Ayurvedic E-Commerce and Consultation Platform developed using React Native, React.js, Spring Boot, and MySQL.

## Overview

Aayurmadom is a mobile and web-based platform that enables users to purchase Ayurvedic products, book consultations, and manage their wellness journey. The system includes a React Native mobile application for customers and a React.js admin dashboard for administrators.

## Features

### Customer Mobile Application

* User Registration and Login
* Profile Management
* Product Browsing
* Product Search and Category Filtering
* Product Details with Multiple Images
* Shopping Cart
* Checkout and Order Placement
* Order Tracking
* Consultation Booking
* Consultation Status Tracking

### Admin Dashboard

* Product Management (Create, Update, Delete)
* Multiple Product Image Upload
* Order Management
* Order Status Updates
* Consultation Management
* Consultation Status Workflow
* Dashboard Statistics

## Technologies Used

### Frontend

* React Native
* React.js
* JavaScript
* CSS

### Backend

* Java
* Spring Boot
* Spring Data JPA
* REST APIs

### Database

* MySQL

### Tools

* Git
* GitHub
* Postman
* Android Studio
* IntelliJ IDEA

## System Architecture

Customer Mobile App (React Native)

↓

REST API (Spring Boot)

↓

MySQL Database

↑

Admin Dashboard (React.js)

## Key Functionalities

### Product Management

* Add Products
* Update Products
* Delete Products
* Upload Multiple Product Images
* Category Management

### Order Management

* Place Orders
* View Order History
* Update Order Status
* Processing Workflow

  * Processing
  * Shipped
  * Delivered
  * Cancelled

### Consultation Management

* Book Consultations
* Manage Consultation Requests
* Update Consultation Status
* Track Consultation History

## Screenshots

### Mobile Application

* Home Screen
* Product Details
* Shopping Cart
* Profile Page
* Consultation Booking

### Admin Dashboard

* Dashboard Overview
* Product Management
* Order Management
* Consultation Management

## Installation

### Backend

```bash
git clone <repository-url>
cd aayurmadom-backend
```

Configure MySQL in:

```properties
application.properties
```

Run:

```bash
./mvnw spring-boot:run
```

### Mobile Application

```bash
cd AayurmadomApp
npm install
npx react-native run-android
```

### Admin Dashboard

```bash
cd aayurmadom-admin
npm install
npm run dev
```

## Future Enhancements

* Online Payment Integration
* Calendar-Based Consultation Booking
* Consultation Notes Management
* Advanced Dashboard Analytics
* Notification System
* AI-Based Product Recommendations

## Author

Mahesh Pushparajan Reji

Master's Graduate in Computer Systems | Full-Stack Developer

Riga Nordic University, Latvia

Technologies: Java, Spring Boot, React Native, React.js, Python, MySQL, REST APIs
