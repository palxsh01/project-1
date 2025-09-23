import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FoodData } from "./FoodItem";
import { searchFoodDatabase } from "@/services/foodIdentification";
import { useToast } from "@/hooks/use-toast";

interface BrowseFoodsProps {
  onFoodAdded?: (food: FoodData) => void;
}

// Extended food database for browsing
const foodDatabase = [
  { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3, category: "Fruits" },
  { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4, category: "Fruits" },
  { name: "Orange", calories: 62, protein: 1.2, carbs: 15, fat: 0.2, category: "Fruits" },
  { name: "Avocado", calories: 234, protein: 2.9, carbs: 12, fat: 21, category: "Fruits" },
  { name: "Chicken Breast", calories: 231, protein: 43.5, carbs: 0, fat: 5, category: "Proteins" },
  { name: "Salmon Fillet", calories: 280, protein: 39, carbs: 0, fat: 12, category: "Proteins" },
  { name: "Egg", calories: 155, protein: 13, carbs: 1.1, fat: 11, category: "Proteins" },
  { name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.4, category: "Dairy" },
  { name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.8, category: "Grains" },
  { name: "Quinoa", calories: 368, protein: 14, carbs: 64, fat: 6, category: "Grains" },
  { name: "Oatmeal", calories: 389, protein: 16.9, carbs: 66, fat: 6.9, category: "Grains" },
  { name: "Broccoli", calories: 55, protein: 3.7, carbs: 11, fat: 0.6, category: "Vegetables" },
  { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, category: "Vegetables" },
  { name: "Sweet Potato", calories: 103, protein: 2.3, carbs: 24, fat: 0.1, category: "Vegetables" },
  { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 49, category: "Nuts & Seeds" },
];

const categories = ["All", "Fruits", "Proteins", "Dairy", "Grains", "Vegetables", "Nuts & Seeds"];

const getUnitForFood = (foodName: string): string => {
  const fruitVeggies = ["Apple", "Banana", "Orange", "Avocado"];
  const proteins = ["Chicken Breast", "Salmon Fillet", "Egg"];
  const grains = ["Brown Rice", "Quinoa", "Oatmeal"];
  const dairy = ["Greek Yogurt"];
  const nuts = ["Almonds"];
  const leafyGreens = ["Spinach", "Broccoli"];
  
  if (fruitVeggies.includes(foodName)) return "piece";
  if (proteins.includes(foodName)) return "oz";
  if (grains.includes(foodName)) return "cup";
  if (dairy.includes(foodName)) return "cup";
  if (nuts.includes(foodName)) return "oz";
  if (leafyGreens.includes(foodName)) return "cup";
  
  return "serving";
};

export const BrowseFoods = ({ onFoodAdded }: BrowseFoodsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredFoods, setFilteredFoods] = useState(foodDatabase);
  const { toast } = useToast();

  useEffect(() => {
    let filtered = foodDatabase;
    
    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredFoods(filtered);
  }, [searchQuery, selectedCategory]);

  const handleAddFood = (food: typeof foodDatabase[0]) => {
    const foodData: FoodData = {
      id: `food_${Date.now()}_${Math.random()}`,
      name: food.name,
      portion: 1,
      unit: getUnitForFood(food.name),
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      confidence: 1,
    };
    
    if (onFoodAdded) {
      onFoodAdded(foodData);
      toast({
        title: "Food added!",
        description: `${food.name} has been added to your meal.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Browse Food Database</h2>
          <p className="text-muted-foreground">
            Search and explore nutritional information for thousands of foods
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for foods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Food Results */}
      <div className="grid gap-4">
        {filteredFoods.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No foods found matching your search.</p>
          </Card>
        ) : (
          filteredFoods.map((food) => (
            <Card key={food.name} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{food.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {food.category}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Calories:</span>
                      <p className="font-medium">{food.calories}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Protein:</span>
                      <p className="font-medium text-protein">{food.protein}g</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Carbs:</span>
                      <p className="font-medium text-carbs">{food.carbs}g</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Fat:</span>
                      <p className="font-medium text-fat">{food.fat}g</p>
                    </div>
                  </div>
                </div>
                
                {onFoodAdded && (
                  <Button
                    size="sm"
                    onClick={() => handleAddFood(food)}
                    className="ml-4"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                  </Button>
                )}
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};