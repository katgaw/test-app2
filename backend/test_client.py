"""
Simple test client to demonstrate the Diet Recipe App API
"""
import requests
import json

BASE_URL = "http://localhost:8000"


def test_health():
    """Test health endpoint"""
    print("Testing health endpoint...")
    response = requests.get(f"{BASE_URL}/health")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")


def get_recipe(diet_type: str, cuisine: str = None, cooking_time: int = 30):
    """Get a recipe from the API"""
    print(f"Requesting {diet_type} recipe...")
    
    payload = {
        "diet_type": diet_type,
        "cooking_time": cooking_time
    }
    
    if cuisine:
        payload["cuisine_preference"] = cuisine
    
    response = requests.post(f"{BASE_URL}/recipe", json=payload)
    
    if response.status_code == 200:
        recipe = response.json()
        print(f"\n✅ Recipe Generated Successfully!\n")
        print(f"{'='*60}")
        print(f"Recipe: {recipe['recipe_name']}")
        print(f"Diet Type: {recipe['diet_type']}")
        print(f"Prep Time: {recipe['prep_time']}")
        print(f"{'='*60}\n")
        
        print("Ingredients:")
        for ingredient in recipe['ingredients']:
            print(f"  • {ingredient}")
        
        print(f"\nInstructions:\n{recipe['instructions']}\n")
        print(f"{'='*60}\n")
    else:
        print(f"❌ Error: {response.status_code}")
        print(f"Response: {response.json()}\n")


def main():
    """Run tests"""
    print("\n" + "="*60)
    print("Diet Recipe App - Test Client")
    print("="*60 + "\n")
    
    # Test health endpoint
    try:
        test_health()
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to the server!")
        print("Please make sure the FastAPI server is running:")
        print("  python main.py")
        return
    
    # Test vegan recipe
    print("\n" + "-"*60)
    get_recipe("vegan", cuisine="Mediterranean", cooking_time=30)
    
    # Test vegetarian recipe
    print("-"*60)
    get_recipe("vegetarian", cuisine="Italian", cooking_time=45)


if __name__ == "__main__":
    main()

