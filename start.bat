@echo off
REM Start script for Diet Recipe App (Windows)
REM This script starts both backend and frontend services

echo.
echo Starting Diet Recipe App...
echo.

REM Check if .env exists in backend
if not exist "backend\.env" (
    echo Warning: backend\.env not found
    echo Please create backend\.env with your OPENAI_API_KEY
    echo Example: echo OPENAI_API_KEY=your_key_here > backend\.env
    echo.
)

REM Check if .env.local exists in frontend
if not exist "frontend\.env.local" (
    echo Warning: frontend\.env.local not found
    echo Creating frontend\.env.local with default backend URL...
    echo NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 > frontend\.env.local
    echo.
)

REM Start Backend
echo Starting Backend (FastAPI)...
cd backend

if not exist "venv\" (
    echo Creating Python virtual environment...
    python -m venv venv
)

call venv\Scripts\activate.bat
pip install -q -r requirements.txt

start "Backend - FastAPI" cmd /k "uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"
cd ..

echo Backend started on http://localhost:8000
echo.

REM Wait a bit for backend to start
timeout /t 5 /nobreak >nul

REM Start Frontend
echo Starting Frontend (Next.js)...
cd frontend

if not exist "node_modules\" (
    echo Installing npm dependencies...
    npm install
)

start "Frontend - Next.js" cmd /k "npm run dev"
cd ..

echo Frontend started on http://localhost:3000
echo.

echo.
echo Diet Recipe App is running!
echo.
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
echo Press any key to close this window (services will keep running in separate windows)
pause >nul

