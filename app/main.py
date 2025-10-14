from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from enum import Enum
import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Diet Recipe App",
    description="Get simple dinner recipes based on your dietary preferences",
    version="1.0.0"
)

# Add CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Don't initialize OpenAI client at module level - causes issues with Vercel
# Initialize it inside the endpoint function instead (lazy loading)


# Define dietary preference enum
class DietType(str, Enum):
    vegetarian = "vegetarian"
    vegan = "vegan"


# Request model
class RecipeRequest(BaseModel):
    diet_type: DietType
    cuisine_preference: str | None = None
    cooking_time: int | None = 30  # in minutes


# Response model
class RecipeResponse(BaseModel):
    recipe_name: str
    ingredients: list[str]
    instructions: str
    prep_time: str
    diet_type: str


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to the Diet Recipe App!",
        "endpoints": {
            "/recipe": "POST - Get a recipe based on dietary preferences",
            "/health": "GET - Health check endpoint"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


@app.post("/recipe", response_model=RecipeResponse)
async def get_recipe(request: RecipeRequest):
    """
    Get a dinner recipe based on dietary preferences
    
    Args:
        request: RecipeRequest with diet_type and optional preferences
        
    Returns:
        RecipeResponse with recipe details
    """
    try:
        # Check if API key is set
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise HTTPException(
                status_code=500,
                detail="OpenAI API key not configured. Please set OPENAI_API_KEY in .env file"
            )
        
        # Initialize OpenAI client (lazy loading for Vercel compatibility)
        client = OpenAI(api_key=api_key)
        
        # Build the prompt
        prompt = f"""Please provide a simple {request.diet_type} dinner recipe.
        
Requirements:
- Diet type: {request.diet_type}
- Cooking time: approximately {request.cooking_time} minutes
{f"- Cuisine preference: {request.cuisine_preference}" if request.cuisine_preference else ""}

Please provide the recipe in the following format:

Recipe Name: [name]

Ingredients:
- [ingredient 1]
- [ingredient 2]
...

Instructions:
[Step by step instructions]

Prep Time: [time]
"""
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful cooking assistant that provides simple, easy-to-follow recipes. Always provide clear, concise recipes with exact measurements."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        # Parse the response
        recipe_text = response.choices[0].message.content.strip()
        
        # Simple parsing logic
        lines = recipe_text.split('\n')
        recipe_name = ""
        ingredients = []
        instructions = ""
        prep_time = ""
        
        section = None
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            if line.startswith("Recipe Name:"):
                recipe_name = line.replace("Recipe Name:", "").strip()
            elif "Ingredients:" in line:
                section = "ingredients"
            elif "Instructions:" in line:
                section = "instructions"
            elif "Prep Time:" in line or "Total Time:" in line:
                prep_time = line.split(":", 1)[1].strip() if ":" in line else line
                section = None
            elif section == "ingredients" and line.startswith("-"):
                ingredients.append(line[1:].strip())
            elif section == "instructions":
                if instructions:
                    instructions += "\n" + line
                else:
                    instructions = line
        
        # Fallback if parsing doesn't work perfectly
        if not recipe_name:
            recipe_name = f"Simple {request.diet_type.capitalize()} Dinner"
        if not ingredients:
            ingredients = ["See instructions for ingredients"]
        if not instructions:
            instructions = recipe_text
        if not prep_time:
            prep_time = f"Approximately {request.cooking_time} minutes"
        
        return RecipeResponse(
            recipe_name=recipe_name,
            ingredients=ingredients,
            instructions=instructions,
            prep_time=prep_time,
            diet_type=request.diet_type.value
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error generating recipe: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

