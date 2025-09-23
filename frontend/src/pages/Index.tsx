import { useState } from "react";
import { History, TrendingUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrackMealButton } from "@/components/TrackMealButton";
import { FoodItem, FoodData } from "@/components/FoodItem";
import { NutritionDashboard } from "@/components/NutritionDashboard";
import { BrowseFoods } from "@/components/BrowseFoods";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { identifyFoodsFromImage } from "@/services/foodIdentification";
import { useToast } from "@/hooks/use-toast";
const Index = () => {
  const [foods, setFoods] = useState<FoodData[]>([]);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const {
    toast
  } = useToast();
  const handlePhotoUploaded = async (file: File) => {
    setIsIdentifying(true);
    try {
      const identifiedFoods = await identifyFoodsFromImage(file);
      setFoods(prev => [...prev, ...identifiedFoods]);
      toast({
        title: "Foods identified!",
        description: `Found ${identifiedFoods.length} food item${identifiedFoods.length !== 1 ? 's' : ''} in your photo.`
      });
    } catch (error) {
      toast({
        title: "Identification failed",
        description: "Unable to identify foods in the image. Please try again or add foods manually.",
        variant: "destructive"
      });
    } finally {
      setIsIdentifying(false);
    }
  };
  const handleFoodUpdate = (id: string, updates: Partial<FoodData>) => {
    setFoods(prev => prev.map(food => food.id === id ? {
      ...food,
      ...updates
    } : food));
  };
  const handleFoodRemove = (id: string) => {
    setFoods(prev => prev.filter(food => food.id !== id));
    toast({
      title: "Food removed",
      description: "The food item has been removed from your meal."
    });
  };
  const handleFoodAdded = (food: FoodData) => {
    setFoods(prev => [...prev, food]);
  };
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NutriTrack
            </h1>
          </div>
          <DarkModeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              Browse Foods
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Nutrition Overview - Upper Half */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calories - Left Half */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-2">Daily Calories</h2>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-4xl font-bold text-primary">
                      {foods.reduce((acc, food) => acc + food.calories, 0)}
                    </span>
                    <span className="text-lg text-muted-foreground">/ 2000 cal</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 mt-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(100, (foods.reduce((acc, food) => acc + food.calories, 0) / 2000) * 100)}%` }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Math.max(0, 2000 - foods.reduce((acc, food) => acc + food.calories, 0))} calories remaining
                  </p>
                </div>
              </Card>

              {/* Macros - Right Half */}
              <div className="space-y-4">
                <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                  <div className="text-center">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Protein</h3>
                    <p className="text-2xl font-bold text-protein">
                      {Math.round(foods.reduce((acc, food) => acc + food.protein, 0) * 10) / 10}
                      <span className="text-sm text-muted-foreground">/150g</span>
                    </p>
                    <div className="w-full bg-secondary rounded-full h-2 mt-2">
                      <div 
                        className="bg-protein h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${Math.min(100, (foods.reduce((acc, food) => acc + food.protein, 0) / 150) * 100)}%` }}
                      />
                    </div>
                  </div>
                </Card>
                
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                    <div className="text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Carbs</h3>
                      <p className="text-xl font-bold text-carbs">
                        {Math.round(foods.reduce((acc, food) => acc + food.carbs, 0) * 10) / 10}
                        <span className="text-xs text-muted-foreground">/250g</span>
                      </p>
                      <div className="w-full bg-secondary rounded-full h-2 mt-2">
                        <div 
                          className="bg-carbs h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(100, (foods.reduce((acc, food) => acc + food.carbs, 0) / 250) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
                    <div className="text-center">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Fat</h3>
                      <p className="text-xl font-bold text-fat">
                        {Math.round(foods.reduce((acc, food) => acc + food.fat, 0) * 10) / 10}
                        <span className="text-xs text-muted-foreground">/65g</span>
                      </p>
                      <div className="w-full bg-secondary rounded-full h-2 mt-2">
                        <div 
                          className="bg-fat h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${Math.min(100, (foods.reduce((acc, food) => acc + food.fat, 0) / 65) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Track Meal Section */}
            <TrackMealButton 
              onPhotoUploaded={handlePhotoUploaded} 
              onFoodAdded={handleFoodAdded}
              isLoading={isIdentifying} 
            />

            {/* Loading State */}
            {isIdentifying && <Card className="p-6 text-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Analyzing your photo and identifying foods...</p>
              </Card>}

            {/* Food Items */}
            {foods.length > 0 && <div className="space-y-4">
                <h3 className="text-lg font-semibold">Identified Foods</h3>
                <div className="grid gap-4">
                  {foods.map(food => <FoodItem key={food.id} food={food} onUpdate={handleFoodUpdate} onRemove={handleFoodRemove} />)}
                </div>
              </div>}
          </TabsContent>

          <TabsContent value="browse">
            <BrowseFoods onFoodAdded={handleFoodAdded} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">Meal History</h3>
              <p className="text-muted-foreground mb-4">
                View your previous meals and nutrition tracking history
              </p>
              <p className="text-sm text-muted-foreground">
                History feature coming soon! For now, your current session foods are tracked above.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>;
};
export { Index };