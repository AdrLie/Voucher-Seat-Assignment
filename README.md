# Voucher Seat Assignment

## 1. Prerequisites
- Node.js (v22 or higher)
- npm (v9 or higher)
- TypeScript
- Docker Desktop (Optional, for containerized setup)

## 2. Setup & Installation
You need to install dependencies for both the frontend and backend.
*Note: Make sure to copy the `.env.example` file to a new `.env` file in both the frontend and backend directories.*

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
```

## 3. Steps to run the backend and frontend
You will need two separate terminal windows to run both services simultaneously.

### Run Backend
```bash
cd backend
npm run dev
```
The backend server will start on `http://localhost:3000` and automatically initialize the SQLite database.

### Run Frontend
```bash
cd frontend
npm run dev
```
The frontend application will start on `http://localhost:5173`.

## 4. Docker instructions (Optional)
If you prefer not to install Node.js locally, you can run the entire application using Docker Compose.

1. Make sure Docker is running on your machine.
2. From the root directory of the project, run:
```bash
docker compose up --build
```
3. The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.