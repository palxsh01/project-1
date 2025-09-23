import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FoodData } from "./FoodItem";
import { searchFoodDatabase } from "@/services/foodIdentification";
import { useToast } from "@/hooks/use-toast";

interface ManualFoodEntryProps {
  onFoodAdded: (food: FoodData) => void;
}

export const ManualFoodEntry = ({ onFoodAdded }: ManualFoodEntryProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<FoodData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [customFood, setCustomFood] = useState({
    name: "",
    portion: 1,
    unit: "serving",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const results = await searchFoodDatabase(searchQuery);
      setSearchResults(results);
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Unable to search food database. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const addSearchResult = (food: FoodData) => {
    onFoodAdded(food);
    setIsOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    toast({
      title: "Food added",
      description: `${food.name} has been added to your meal.`,
    });
  };

  const addCustomFood = () => {
    if (!customFood.name.trim()) {
      toast({
        title: "Missing food name",
        description: "Please enter a food name.",
        variant: "destructive",
      });
      return;
    }

    const food: FoodData = {
      id: `custom_${Date.now()}`,
      name: customFood.name,
      portion: customFood.portion,
      unit: customFood.unit,
      calories: customFood.calories,
      protein: customFood.protein,
      carbs: customFood.carbs,
      fat: customFood.fat,
      confidence: 1,
    };

    onFoodAdded(food);
    setCustomFood({
      name: "",
      portion: 1,
      unit: "serving",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    });
    setIsOpen(false);
    toast({
      title: "Custom food added",
      description: `${food.name} has been added to your meal.`,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Food Manually
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Food Manually</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Search Section */}
          <div className="space-y-3">
            <Label>Search Food Database</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Search for foods..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button 
                onClick={handleSearch} 
                disabled={isSearching || !searchQuery.trim()}
                size="sm"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            
            {searchResults.length > 0 && (
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {searchResults.map((food) => (
                  <Card key={food.id} className="p-3 cursor-pointer hover:bg-muted/50">
                    <div 
                      className="flex justify-between items-center"
                      onClick={() => addSearchResult(food)}
                    >
                      <div>
                        <p className="font-medium">{food.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {food.calories} cal per {food.unit}
                        </p>
                      </div>
                      <Plus className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">or</span>
            </div>
          </div>

          {/* Custom Food Entry */}
          <div className="space-y-4">
            <Label>Create Custom Food</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Input
                  placeholder="Food name"
                  value={customFood.name}
                  onChange={(e) => setCustomFood({ ...customFood, name: e.target.value })}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Portion"
                  value={customFood.portion}
                  onChange={(e) => setCustomFood({ ...customFood, portion: parseFloat(e.target.value) || 0 })}
                  step="0.1"
                />
              </div>
              <div>
                <Input
                  placeholder="Unit"
                  value={customFood.unit}
                  onChange={(e) => setCustomFood({ ...customFood, unit: e.target.value })}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Calories"
                  value={customFood.calories}
                  onChange={(e) => setCustomFood({ ...customFood, calories: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Protein (g)"
                  value={customFood.protein}
                  onChange={(e) => setCustomFood({ ...customFood, protein: parseFloat(e.target.value) || 0 })}
                  step="0.1"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Carbs (g)"
                  value={customFood.carbs}
                  onChange={(e) => setCustomFood({ ...customFood, carbs: parseFloat(e.target.value) || 0 })}
                  step="0.1"
                />
              </div>
              <div>
                <Input
                  type="number"
                  placeholder="Fat (g)"
                  value={customFood.fat}
                  onChange={(e) => setCustomFood({ ...customFood, fat: parseFloat(e.target.value) || 0 })}
                  step="0.1"
                />
              </div>
            </div>
            <Button onClick={addCustomFood} className="w-full">
              Add Custom Food
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};