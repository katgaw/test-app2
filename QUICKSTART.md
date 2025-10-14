# 🚀 Quick Start Guide

Get the Diet Recipe App running in 3 simple steps!

## Prerequisites

- Python 3.13+
- Node.js 18+
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Option 1: Automated Startup (Recommended)

### macOS/Linux

```bash
# 1. Create backend .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_actual_api_key_here" > backend/.env

# 2. Run the startup script
./start.sh
```

### Windows

```bash
# 1. Create backend .env file with your OpenAI API key
echo OPENAI_API_KEY=your_actual_api_key_here > backend\.env

# 2. Run the startup script
start.bat
```

That's it! The app will open at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/docs

---

## Option 2: Manual Startup

### Terminal 1 - Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "OPENAI_API_KEY=your_actual_api_key_here" > .env

# Start backend with uvicorn
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

### Terminal 2 - Frontend

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local

# Start frontend
npm run dev
```

---

## 🎉 You're Ready!

Visit http://localhost:3000 and start generating recipes!

## 📚 Need More Help?

See the full [README.md](README.md) for detailed documentation.

