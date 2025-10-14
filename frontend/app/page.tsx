"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, ChefHat, Clock, Utensils } from "lucide-react"

type DietType = "vegetarian" | "vegan"

interface Recipe {
  recipe_name: string
  ingredients: string[]
  instructions: string
  prep_time: string
  diet_type: string
}

export default function DietRecipeApp() {
  const [dietType, setDietType] = useState<DietType>("vegetarian")
  const [cuisinePreference, setCuisinePreference] = useState("")
  const [cookingTime, setCookingTime] = useState("30")
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setRecipe(null)

    try {
      // In production (Vercel), use /api route. In development, use localhost:8000
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 
                         (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000')

      // Build request body
      const requestBody: {
        diet_type: "vegetarian" | "vegan"
        cuisine_preference?: string
        cooking_time?: number
      } = {
        diet_type: dietType,
      }

      if (cuisinePreference) {
        requestBody.cuisine_preference = cuisinePreference
      }

      if (cookingTime) {
        requestBody.cooking_time = Number.parseInt(cookingTime)
      }

      const response = await fetch(`${backendUrl}/recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to fetch recipe")
      }

      const data = await response.json()
      setRecipe(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold text-balance">AI Recipe Generator</h1>
          </div>
          <p className="text-xl text-muted-foreground text-balance">
            Get personalized dinner recipes based on your dietary preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Your Preferences</CardTitle>
              <CardDescription>Tell us about your dietary needs and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Dietary Preference</Label>
                  <RadioGroup value={dietType} onValueChange={(value) => setDietType(value as DietType)}>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <RadioGroupItem value="vegetarian" id="vegetarian" />
                      <Label htmlFor="vegetarian" className="flex-1 cursor-pointer font-normal">
                        🥗 Vegetarian
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent transition-colors">
                      <RadioGroupItem value="vegan" id="vegan" />
                      <Label htmlFor="vegan" className="flex-1 cursor-pointer font-normal">
                        🌱 Vegan
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cuisine" className="text-base font-semibold">
                    Cuisine Preference <span className="text-muted-foreground font-normal">(Optional)</span>
                  </Label>
                  <Input
                    id="cuisine"
                    placeholder="e.g., Italian, Mexican, Asian"
                    value={cuisinePreference}
                    onChange={(e) => setCuisinePreference(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="text-base font-semibold">
                    Cooking Time (minutes)
                  </Label>
                  <Input
                    id="time"
                    type="number"
                    min="10"
                    max="120"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Recipe...
                    </>
                  ) : (
                    <>
                      <Utensils className="mr-2 h-5 w-5" />
                      Generate Recipe
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Recipe Display Section */}
          <div className="space-y-6">
            {recipe ? (
              <>
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 text-balance">{recipe.recipe_name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{recipe.prep_time}</span>
                          </div>
                          <div className="px-2 py-1 bg-primary/10 text-primary rounded-md font-medium capitalize">
                            {recipe.diet_type}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                      <ul className="space-y-2">
                        {recipe.ingredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span className="flex-1">{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                      <div className="prose prose-sm max-w-none">
                        <p className="whitespace-pre-line leading-relaxed">{recipe.instructions}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="border-2 border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <ChefHat className="w-16 h-16 text-muted-foreground/50 mb-4" />
                  <p className="text-lg text-muted-foreground text-balance">
                    Your recipe will appear here once generated
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
