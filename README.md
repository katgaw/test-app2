# Diet Recipe App 🥗

A full-stack AI-powered recipe generator with a FastAPI backend and Next.js frontend that creates personalized vegetarian and vegan dinner recipes using OpenAI's GPT-4 API.

## ✨ Features

- 🌱 Support for vegetarian and vegan diets
- 🍽️ AI-generated dinner recipes with GPT-4
- ⏱️ Customizable cooking time preferences
- 🌍 Optional cuisine preference
- 🎨 Beautiful, modern UI built with Next.js and shadcn/ui
- 🔒 Secure API key management with environment variables
- 🚀 RESTful API with automatic documentation

## 📋 Requirements

- **Backend**: Python 3.13+
- **Frontend**: Node.js 18+ and npm
- **API**: OpenAI API key

## 🚀 Quick Start

### Step 1: Get Your OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign in or create an account
3. Create a new API key
4. Copy the key for use in setup

### Step 2: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```bash
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   ```
   
   Replace `your_openai_api_key_here` with your actual OpenAI API key.

5. **Start the backend server**
   ```bash
   uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   
   Or simply:
   ```bash
   python -m api.main
   ```
   
   The backend will run on http://localhost:8000

### Step 3: Frontend Setup

Open a **new terminal** window and:

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the frontend directory:
   ```bash
   echo "NEXT_PUBLIC_BACKEND_URL=http://localhost:8000" > .env.local
   ```

4. **Start the frontend development server**
   ```bash
   npm run dev
   ```
   
   The frontend will run on http://localhost:3000

### Step 4: Access the App

Open your browser and go to:
- **Frontend UI**: http://localhost:3000
- **Backend API Docs**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

## 📁 Project Structure

```
test-app2/
├── backend/
│   ├── api/
│   │   ├── main.py          # FastAPI application
│   │   └── test_client.py   # Python test client
│   ├── requirements.txt     # Python dependencies
│   ├── runtime.txt          # Python version for Vercel
│   ├── vercel.json          # Backend Vercel config
│   └── .env                 # Backend environment variables (create this)
├── frontend/
│   ├── app/
│   │   ├── page.tsx         # Main app component
│   │   ├── layout.tsx       # App layout
│   │   └── globals.css      # Global styles
│   ├── components/          # UI components
│   ├── lib/                 # Utilities
│   ├── package.json         # Frontend dependencies
│   └── .env.local          # Frontend environment variables (create this)
├── vercel.json             # Root Vercel config (for frontend)
├── start.sh / start.bat    # Startup scripts
├── QUICKSTART.md           # Quick start guide
├── DEPLOYMENT.md           # Deployment guide
├── README.md               # This file
├── LICENSE                 # License file
└── .gitignore             # Git ignore file
```

## 🔧 API Endpoints

### `GET /`
Root endpoint with API information

### `GET /health`
Health check endpoint

### `POST /recipe`
Generate a recipe based on dietary preferences

**Request Body:**
```json
{
  "diet_type": "vegetarian",  // Required: "vegetarian" or "vegan"
  "cuisine_preference": "Italian",  // Optional
  "cooking_time": 30  // Optional: time in minutes (default: 30)
}
```

**Response:**
```json
{
  "recipe_name": "Pasta Primavera",
  "ingredients": [
    "200g pasta",
    "2 cups mixed vegetables",
    "..."
  ],
  "instructions": "Step by step instructions...",
  "prep_time": "30 minutes",
  "diet_type": "vegetarian"
}
```

## 🛠️ Technologies Used

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **OpenAI API**: GPT-4 for recipe generation
- **Uvicorn**: ASGI server for running the application
- **Pydantic**: Data validation using Python type annotations
- **python-dotenv**: Environment variable management

### Frontend
- **Next.js 15**: React framework for production
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful UI components
- **Lucide React**: Icon library

## 🐍 Python 3.13 Compatibility

All backend libraries are fully compatible with Python 3.13:
- FastAPI 0.115.0+
- OpenAI 1.52.0+
- Pydantic 2.9.2+
- Uvicorn 0.32.0+

## 💻 Development Tips

### Backend Development

Run the backend in development mode with auto-reload using uvicorn:
```bash
cd backend
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

Or run directly with Python:
```bash
cd backend
python -m api.main
```

Test the API using the Python test client:
```bash
cd backend
python -m api.test_client
```

### Frontend Development

Run the frontend with hot reload:
```bash
cd frontend
npm run dev
```

Build for production:
```bash
cd frontend
npm run build
npm start
```

### Testing the API with curl

```bash
curl -X POST "http://localhost:8000/recipe" \
  -H "Content-Type: application/json" \
  -d '{
    "diet_type": "vegan",
    "cuisine_preference": "Italian",
    "cooking_time": 30
  }'
```

## 🚀 Deployment

### Deploy to Vercel

This app is ready to deploy to Vercel! See the [DEPLOYMENT.md](DEPLOYMENT.md) guide for detailed instructions.

**Quick Deploy:**

1. Push your code to GitHub (already done!)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Import your repository: `katgaw/test-app2`
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy!

Your app will be live at a URL like: `https://your-app.vercel.app`

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 🐛 Troubleshooting

### Backend Issues

**"OpenAI API key not configured"**
- Make sure you created the `.env` file in the `backend` directory
- Verify the API key is correct and has credits

**Port 8000 already in use**
- Stop any other processes using port 8000
- Or change the port in `backend/main.py` and `frontend/.env.local`

### Frontend Issues

**Cannot connect to backend**
- Make sure the backend server is running on port 8000
- Verify `NEXT_PUBLIC_BACKEND_URL` in `frontend/.env.local`

**Dependencies installation fails**
- Try deleting `node_modules` and running `npm install` again
- Make sure you have Node.js 18+ installed

## 📝 License

See LICENSE file for details.

## 🙏 Support

For issues or questions, please refer to the documentation or create an issue in the repository.

---

**Happy Cooking! 🍳**
