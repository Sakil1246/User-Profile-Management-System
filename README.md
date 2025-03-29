# User-Profile-Management-System

Overview
This repo contains the source code of a backend user profile management system developed for an internship assignment.
The RESTful API allows users to register, log in, update their profiles, and change their passwords.

Features
 User Registration – Create an account with name, email, password (hashed), and address.
 User Login – Authenticate using email and password, receive a JWT token.
 Profile Retrieval – Get user details (only accessible to the logged-in user).
 Profile Update – Update profile information (name, email, bio, address, profile picture).
 Change Password – Securely update the password .
 Logout 
 Protected Routes 
 Error Handling – Handles validation, authentication, and server errors.

Tech Stack
🔹 Backend: Node.js, Express.js
🔹 Database: MongoDB 
🔹 Authentication: JWT (JSON Web Token)

Installation & Setup
1️⃣ Clone the Repository
https://github.com/Sakil1246/User-Profile-Management-System.git
2️⃣ Install Dependencies
npm install
3️⃣ Setup Environment Variables
Create a .env file in the root directory and add the following:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_secret_key
4️⃣ Start the Server
npm run dev

📌 API Endpoints
 Authentication
 Sign Up → POST /user/signUp (Register a new user)
 Login → POST /user/login (Log in and get a token)
 Logout → POST /user/logout (Log out user)

 Profile Management
 View Profile → GET /user/viewProfile
 Update Profile → PATCH /user/updateProfile
 Change Password → PATCH /user/changePassword
 Delete Account → DELETE /user/deleteProfile

Postman Documentation
🔗https://documenter.getpostman.com/view/41662671/2sB2cPjR8p