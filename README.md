# EdTech Platform

## 🚀 Overview

EduHub is an EdTech Platform. It is a full-stack web application that enables multiple instructors to create and manage courses while allowing students to register, purchase courses, and access recorded lectures. The platform also features authentication, payments, and course reviews.

## 🛠 Tech Stack & Why We Used It

### Frontend:

* **Library:** `React.js` – For building a dynamic and scalable UI.
* **State Management:** `Redux Toolkit` – Efficient state management.
* **Routing:** `React Router DOM` – Enables client-side routing.
* **Styling:** `Tailwind CSS` – For fast and responsive styling.
* **HTTP Requests:** `Axios` – Simplifies API requests.
* **Form Handling:** `React Hook Form` – Enhances form validation and handling.
* **Notifications:** `React Hot Toast` – Provides user-friendly notifications.
* **Sliders & Carousels:** `Swiper` – Used for interactive sliders.
* **Data Visualization:** `Chart.js` – Enables data visualization in analytics.

### Backend:

* **Runtime Environment:** `Node.js` – Non-blocking event-driven architecture.
* **Framework:** `Express.js` – Lightweight web framework for API development.
* **Database:** `MongoDB (Mongoose ORM)` – NoSQL database for scalability and flexibility.
* **For Auth:** `JWT` – Secure authentication for users.
* **For Payment:** `Razorpay` – Enables seamless payment transactions.
* **For Storing Media:** `Cloudinary` – Cloud-based storage for media files.
* **For Hashing Passwords:** `bcrypt` – Ensures secure password storage.
* **For Sending OTP:** `Otp-Generator` – Generates one-time passwords for authentication.
* **For Sending Emails:** `NodeMailer` – Sends emails for user notifications.

## ✨ Features

* **Instructor Features:**
  * Signup/Login using JWT authentication.
  * Create, update, and delete courses.
  * Upload recorded lectures.
* **Student Features:**
  * Signup/Login using JWT authentication.
  * Browse available courses.
  * Purchase courses using **Razorpay Payment Gateway** (Cards/UPI).
  * View enrolled courses and recorded lectures.
  * Leave reviews for completed courses.

## 🏗 Installation & Setup

### 1️⃣ Clone the Repository:

```bash
git clone git@github.com:Man0sh-r0y/EduHub.git
cd EduHub
```

### 2️⃣ Install Dependencies:

#### Install frontend dependencies:

```bash
npm install
```

#### Install backend dependencies:

```bash
cd ./server
npm install
```

### 3️⃣ Set Up Environment Variables:

Create a `.env` file inside the **server** and **root** directory (Checkout the `.env.example` file)

### 4️⃣ Start the Application:

#### Run the backend server:

```bash
npm run dev
```

#### Run the frontend client:

```bash
npm run dev
```
