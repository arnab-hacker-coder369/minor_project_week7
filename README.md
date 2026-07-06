  MARKDOWN
  # 📱 Full-Stack Social Media Networking App
> *Web Development – Week 07 Minor Project Submission*

A complete MERN stack social media application featuring secure user authentication, database model relationships, and an interactive feed where users can create posts and leave likes.

## 🚀 Key Features Implemented
- *User Authentication:* Secure user registration, login, and token-based logout mechanics.
- *Protected Routing:* Restricted main timeline feed access via JSON Web Tokens (JWT).
- *Post Interaction Ecosystem:* Authenticated post creation, support liking/unliking, and own post deletion.
- *Data Architecture:* Connected database collections built using Mongoose ODM schema mapping.

---

## 🛠️ Tech Stack Used
- *Frontend:* React.js, React Router DOM, Axios
- *Backend:* Node.js, Express.js REST API Architecture
- *Database:* MongoDB Atlas Cloud Storage

---

## 📂 Quick Installation & Setup

### 1. Server Configuration
```bash
cd server
npm install
###Create a .env file inside the server/ folder containing

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
 npm run dev
 cd frontend
npm install
npm run dev

## 📡 API Endpoints Overview

### Authentication & Profiles
- *POST /api/auth/register* - Creates a new user profile (Public)
- *POST /api/auth/login* - Authenticates user and sends JWT session token (Public)
- *PUT /api/auth/profile* - Modifies active user profile bio (Protected - Login Required)

### Posts Ecosystem
- *GET /api/posts* - Fetches all recent activity feed posts (Protected - Login Required)
- *POST /api/posts* - Creates a new text-based post (Protected - Login Required)
- *PUT /api/posts/:id/like* - Toggles like/unlike state on a post (Protected - Login Required)
- *DELETE /api/posts/:id* - Deletes a user's own post (Protected - Login Required)
-
