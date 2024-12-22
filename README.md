# File Management System
## Overview
This project is a File Management System that allows users to upload, list, and download files through a REST API and a user-friendly React-based frontend. It uses Node.js, Express, Sequelize (PostgreSQL), React, and Docker to ensure modularity, maintainability, and scalability.
## Features
### File Upload
Users can upload files through the frontend, which stores them on the server.

### File Listing
Lists all uploaded files with details like name and size.

### File Download
Allows users to download any file listed on the server.

### MongoDB Integration
File metadata is stored in a Mongo database.

### Dockerized Environment
Simplified setup and deployment using Docker Compose.

## Setup Instructions
### Prerequisites
Install Docker.
Install Node.js (if running locally without Docker).

### Clone Repository
```
git clone https://github.com/your-repo/file-management-system.git
cd file-management-system
```
### Run backend on docker
```
cd backend
docker-compose up --build
```
### Run frontend
```
cd frontend
npm run start
```
#### Backend API: http://localhost:4000
#### Frontend UI: http://localhost:3000


