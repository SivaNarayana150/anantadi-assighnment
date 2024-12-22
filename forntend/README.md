# Video Management Application

## Project Overview
This project is a **Video Management Application** built using the MERN stack (MongoDB, Express, React, Node.js) and Docker. It allows users to upload, view, and manage their video collections. Each user can only access their own videos after authenticating.

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
git clone <repository-link>
cd <project-directory>
```

### Docker Setup
Build and start all services using Docker Compose:
```bash
docker-compose up --build
```
This will start the following services:
- **Frontend** (React): Runs on `http://localhost:3000`
- **Backend** (Node.js + Express): Runs on `http://localhost:3001`
- **Database** (MongoDB): Runs locally within Docker

### Environment Variables
Create `.env` files for both frontend and backend with the following:

#### Frontend `.env` Example:
```
REACT_APP_API_BASE_URL=http://localhost:3001
```

#### Backend `.env` Example:
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=mongodb://mongo:27017/video_management
GOOGLE_DRIVE_API_KEY=your_google_drive_api_key
```

---

## Features & Functionality

### User Authentication
- JWT-based login and token management.
- Scoped access ensures users see only their own videos.

### Video Upload
- Upload videos via a **Google Drive link**.
- Store video metadata such as title, description, tags, and duration in MongoDB.

### Video Management
- **Filter and Search**: Filter videos by title, tags, or date uploaded.
- **Pagination**: Efficient navigation through video collections.
- **Video Details**: View video metadata and play videos directly within the app.

### Frontend
- Responsive UI built with React.
- Integrated video player (using `ReactPlayer`).

### API Endpoints
Documented backend routes include:
- `POST /login` - Authenticate user and return token.
- `GET /videos` - Fetch user-specific video list.
- `POST /videos` - Upload a new video.
- `GET /videos/:id` - Fetch details of a specific video.

### Database Schema
Metadata stored in MongoDB follows this structure:
```json
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
```

---

## Running the Application

### Local Development
To run services independently (optional):

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Backend
```bash
cd backend
npm install
npm run dev
```

### Docker Compose
For Docker-based setup:
```bash
docker-compose down
# Restart all services
docker-compose up -d
# View logs
docker-compose logs -f
```

---

## Testing the Application

### Accessing the App
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:3001`

### Workflow Walkthrough
1. **Login**: Authenticate and generate a user-specific JWT token.
2. **Upload Video**: Provide a Google Drive link and upload metadata.
3. **Search & Filter**: Search or filter videos by title, tags, or upload date.
4. **View Details**: Play videos and view detailed metadata.

---

## Challenges & Justifications
- MongoDB was chosen for its flexibility in handling metadata.
- JWT ensures secure user-specific data access.
- Integration with Google Drive API for streamlined video uploads.

---

## Deployment (Optional)
For cloud deployment (e.g., AWS, Azure):
- Ensure Dockerized containers are pushed to a container registry.
- Use a cloud service for hosting (e.g., ECS on AWS or Azure Container Instances).

---

## Future Work (Optional)
- Enhance search with additional criteria (e.g., file size, duration).
- Add sorting options for better video management.
- Enable bulk video uploads.

---

## Submission Checklist
- [ ] **Code pushed to GitHub**
- [ ] **README file completed**
- [ ] **Video walkthrough demonstrating the core features**

---

### Thank you for reviewing my project!