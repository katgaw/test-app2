# Backend - FastAPI Diet Recipe App

FastAPI backend for the Diet Recipe App using OpenAI GPT-4.

## Quick Start

### 1. Setup Environment

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r ../requirements.txt

# Create .env file with your OpenAI API key
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

### 2. Run the Server

**Using uvicorn (Recommended):**
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Using Python directly:**
```bash
python main.py
```

The server will start at http://localhost:8000

## API Documentation

Once running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Endpoints

- `GET /` - API information
- `GET /health` - Health check
- `POST /recipe` - Generate recipe

## Example Request

```bash
curl -X POST "http://localhost:8000/recipe" \
  -H "Content-Type: application/json" \
  -d '{
    "diet_type": "vegan",
    "cuisine_preference": "Italian",
    "cooking_time": 30
  }'
```

## Uvicorn Options

Common uvicorn flags:
- `--reload` - Auto-reload on code changes (development)
- `--host 0.0.0.0` - Listen on all network interfaces
- `--port 8000` - Port number
- `--workers 4` - Number of worker processes (production)
- `--log-level info` - Logging level

### Production Example:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

## Testing

Test the API using the included test client:
```bash
python test_client.py
```

## Environment Variables

Required:
- `OPENAI_API_KEY` - Your OpenAI API key

## Dependencies

All dependencies are Python 3.13 compatible:
- FastAPI 0.115.0+
- OpenAI 1.52.0+
- Uvicorn 0.32.0+
- Pydantic 2.9.2+
- python-dotenv 1.0.1+

