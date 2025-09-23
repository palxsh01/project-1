import { FoodData } from "@/components/FoodItem";

// Mock food database for simulation
const mockFoods = [
  { name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { name: "Chicken Breast", calories: 231, protein: 43.5, carbs: 0, fat: 5 },
  { name: "Salmon Fillet", calories: 280, protein: 39, carbs: 0, fat: 12 },
  { name: "Brown Rice", calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  { name: "Avocado", calories: 234, protein: 2.9, carbs: 12, fat: 21 },
  { name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.4 },
  { name: "Broccoli", calories: 55, protein: 3.7, carbs: 11, fat: 0.6 },
  { name: "Sweet Potato", calories: 103, protein: 2.3, carbs: 24, fat: 0.1 },
  { name: "Almonds", calories: 579, protein: 21, carbs: 22, fat: 49 },
  { name: "Oatmeal", calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },
  { name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { name: "Egg", calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  { name: "Orange", calories: 62, protein: 1.2, carbs: 15, fat: 0.2 },
  { name: "Quinoa", calories: 368, protein: 14, carbs: 64, fat: 6 },
];

export const identifyFoodsFromImage = async (imageFile: File): Promise<FoodData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));
  
  // Simulate different scenarios based on image name or random selection
  const numFoods = Math.floor(Math.random() * 3) + 1; // 1-3 foods
  const identifiedFoods: FoodData[] = [];
  
  for (let i = 0; i < numFoods; i++) {
    const randomFood = mockFoods[Math.floor(Math.random() * mockFoods.length)];
    const portionMultiplier = 0.5 + Math.random() * 1.5; // 0.5x to 2x portion
    const confidence = 0.6 + Math.random() * 0.4; // 60-100% confidence
    
    const food: FoodData = {
      id: `food_${Date.now()}_${i}`,
      name: randomFood.name,
      portion: Math.round(portionMultiplier * 10) / 10,
      unit: getUnitForFood(randomFood.name),
      calories: Math.round(randomFood.calories * portionMultiplier),
      protein: Math.round(randomFood.protein * portionMultiplier * 10) / 10,
      carbs: Math.round(randomFood.carbs * portionMultiplier * 10) / 10,
      fat: Math.round(randomFood.fat * portionMultiplier * 10) / 10,
      confidence,
    };
    
    identifiedFoods.push(food);
  }
  
  return identifiedFoods;
};

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

export const searchFoodDatabase = async (query: string): Promise<FoodData[]> => {
  // Simulate search delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const results = mockFoods
    .filter(food => food.name.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)
    .map(food => ({
      id: `search_${Date.now()}_${Math.random()}`,
      name: food.name,
      portion: 1,
      unit: getUnitForFood(food.name),
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      confidence: 1,
    }));
  
  return results;
};