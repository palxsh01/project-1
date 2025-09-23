import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FoodData } from "./FoodItem";

interface NutritionTotals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface NutritionDashboardProps {
  foods: FoodData[];
  goals?: NutritionGoals;
}

const defaultGoals: NutritionGoals = {
  calories: 2000,
  protein: 150,
  carbs: 250,
  fat: 65,
};

export const NutritionDashboard = ({ foods, goals = defaultGoals }: NutritionDashboardProps) => {
  const totals = foods.reduce(
    (acc, food) => ({
      calories: acc.calories + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const getProgressColor = (current: number, goal: number) => {
    const percentage = (current / goal) * 100;
    if (percentage >= 100) return "bg-success";
    if (percentage >= 80) return "bg-primary";
    return "bg-muted-foreground";
  };

  const MacroCard = ({ 
    label, 
    current, 
    goal, 
    unit, 
    color 
  }: { 
    label: string; 
    current: number; 
    goal: number; 
    unit: string;
    color: string;
  }) => (
    <Card className="p-4 bg-gradient-to-br from-card to-muted/10">
      <div className="text-center mb-3">
        <h3 className="text-sm font-medium text-muted-foreground mb-1">{label}</h3>
        <p className={`text-2xl font-bold ${color}`}>
          {Math.round(current * 10) / 10}
          <span className="text-sm text-muted-foreground">/{goal}{unit}</span>
        </p>
      </div>
      <Progress 
        value={(current / goal) * 100} 
        className="h-2"
      />
      <p className="text-xs text-center text-muted-foreground mt-2">
        {Math.round(((current / goal) * 100))}% of goal
      </p>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Today's Nutrition</h2>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-4xl font-bold text-primary">{totals.calories}</span>
            <span className="text-lg text-muted-foreground">/ {goals.calories} cal</span>
          </div>
          <Progress 
            value={(totals.calories / goals.calories) * 100} 
            className="h-3 mt-3"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.max(0, goals.calories - totals.calories)} calories remaining
          </p>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MacroCard
          label="Protein"
          current={totals.protein}
          goal={goals.protein}
          unit="g"
          color="text-protein"
        />
        <MacroCard
          label="Carbs"
          current={totals.carbs}
          goal={goals.carbs}
          unit="g"
          color="text-carbs"
        />
        <MacroCard
          label="Fat"
          current={totals.fat}
          goal={goals.fat}
          unit="g"
          color="text-fat"
        />
      </div>

      {foods.length > 0 && (
        <Card className="p-4">
          <h3 className="font-medium mb-3">Meal Breakdown</h3>
          <div className="space-y-2">
            {foods.map((food) => (
              <div key={food.id} className="flex justify-between items-center text-sm">
                <span>{food.name}</span>
                <span className="text-muted-foreground">{food.calories} cal</span>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};