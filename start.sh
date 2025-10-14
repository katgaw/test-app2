#!/bin/bash

# Start script for Diet Recipe App
# This script starts both backend and frontend services

set -e

echo "🥗 Starting Diet Recipe App..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env exists in backend
if [ ! -f backend/.env ]; then
    echo -e "${YELLOW}⚠️  Warning: backend/.env not found${NC}"
    echo "Please create backend/.env with your OPENAI_API_KEY"
    echo "Example: echo 'OPENAI_API_KEY=your_key_here' > backend/.env"
    echo ""
fi

# Check if .env.local exists in frontend
if [ ! -f frontend/.env.local ]; then
    echo -e "${YELLOW}⚠️  Warning: frontend/.env.local not found${NC}"
    echo "Creating frontend/.env.local with default backend URL..."
    echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > frontend/.env.local
    echo ""
fi

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping services...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null || true
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null || true
    fi
    echo "Done!"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start Backend
echo -e "${BLUE}📦 Starting Backend (FastAPI)...${NC}"
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate
pip install -q -r requirements.txt

uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

echo -e "${GREEN}✓ Backend started on http://localhost:8000${NC}"
echo "  Logs: backend.log"
echo ""

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
for i in {1..30}; do
    if curl -s http://localhost:8000/health > /dev/null 2>&1; then
        break
    fi
    sleep 1
done

# Start Frontend
echo -e "${BLUE}🎨 Starting Frontend (Next.js)...${NC}"
cd frontend

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install
fi

npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

echo -e "${GREEN}✓ Frontend started on http://localhost:3000${NC}"
echo "  Logs: frontend.log"
echo ""

echo -e "${GREEN}🚀 Diet Recipe App is running!${NC}"
echo ""
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:8000"
echo "  API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for either process to exit
wait

