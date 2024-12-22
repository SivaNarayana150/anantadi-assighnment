# Video Management Application

## Project Overview
This project is a **Video Management Application** built using the **MERN stack** (MongoDB, Express, React, Node.js) and **Docker**. It allows users to upload, view, and manage their video collections. Each user can only access their own videos after authenticating.

---

## Prerequisites
Before setting up the application, ensure you have the following installed:

- **Docker** and **Docker Compose**
- **Node.js** (if running without Docker)
- (Optional) **MongoDB Compass** for database inspection

---

## Setup Instructions

### Clone the Repository
```bash
git clone https://github.com/SivaNarayana150/anantadi-assighnment.git
cd anantadi-assighnment

Docker Setup
Build and Start Services with Docker Compose
Build and start all services using Docker Compose:

bash
Copy code
docker-compose up --build
This will start the following services:

Frontend (React): Runs on http://localhost:3000
Backend (Node.js + Express): Runs on http://localhost:3001
Database (MongoDB): Runs locally within Docker
Environment Variables
Create .env files for both frontend and backend with the following:

Frontend .env Example:
arduino
Copy code
REACT_APP_API_BASE_URL=http://localhost:3001
Backend .env Example:
makefile
Copy code
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://mongo:27017/video_management
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
Features & Functionality
User Authentication
JWT-based login and token management.
Scoped access ensures users see only their own videos.
Video Upload
Upload videos via a Google Drive link.
Store video metadata such as title, description, tags, and duration in MongoDB.
Video Management
Filter and Search: Filter videos by title, tags, or date uploaded.
Pagination: Efficient navigation through video collections.
Video Details: View video metadata and play videos directly within the app.
Frontend
Responsive UI built with React.
Integrated video player (using ReactPlayer).
API Endpoints
Documented backend routes include:

POST /login - Authenticate user and return token.
GET /videos - Fetch user-specific video list.
POST /videos - Upload a new video.
GET /videos/:id - Fetch details of a specific video.
Database Schema
Metadata stored in MongoDB follows this structure:

json
Copy code
{
  "user_id": "string",
  "video_id": "string",
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "duration": "number",
  "uploaded_at": "date",
  "video_link": "string"
}
Running the Application
Local Development
To run services independently (optional):

Frontend
bash
Copy code
cd frontend
npm install
npm start
Backend
bash
Copy code
cd backend
npm install
npm run dev
Docker Compose
For Docker-based setup:

bash
Copy code
docker-compose down
# Restart all services
docker-compose up -d
# View logs
docker-compose logs -f
Testing the Application
Accessing the App
Frontend: http://localhost:3000
Backend: http://localhost:3001
Workflow Walkthrough
Login: Authenticate and generate a user-specific JWT token.
Upload Video: Provide a Google Drive link and upload metadata.
Search & Filter: Search or filter videos by title, tags, or upload date.
View Details: Play videos and view detailed metadata.
