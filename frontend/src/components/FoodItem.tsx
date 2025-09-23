import { useState } from "react";
import { Minus, Plus, Edit2, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export interface FoodData {
  id: string;
  name: string;
  portion: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  confidence: number;
}

interface FoodItemProps {
  food: FoodData;
  onUpdate: (id: string, updates: Partial<FoodData>) => void;
  onRemove: (id: string) => void;
}

export const FoodItem = ({ food, onUpdate, onRemove }: FoodItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(food.name);
  const [editPortion, setEditPortion] = useState(food.portion);

  const adjustPortion = (delta: number) => {
    const newPortion = Math.max(0.1, food.portion + delta);
    const multiplier = newPortion / food.portion;
    
    onUpdate(food.id, {
      portion: newPortion,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
    });
  };

  const saveEdit = () => {
    const multiplier = editPortion / food.portion;
    onUpdate(food.id, {
      name: editName,
      portion: editPortion,
      calories: Math.round(food.calories * multiplier),
      protein: Math.round(food.protein * multiplier * 10) / 10,
      carbs: Math.round(food.carbs * multiplier * 10) / 10,
      fat: Math.round(food.fat * multiplier * 10) / 10,
    });
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditName(food.name);
    setEditPortion(food.portion);
    setIsEditing(false);
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-card to-muted/10 shadow-sm border-border/50">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="font-medium"
              />
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={editPortion}
                  onChange={(e) => setEditPortion(parseFloat(e.target.value) || 0)}
                  className="w-20"
                  step="0.1"
                />
                <span className="text-sm text-muted-foreground">{food.unit}</span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-foreground">{food.name}</h3>
                {food.confidence < 0.8 && (
                  <Badge variant="outline" className="text-xs bg-warning/10">
                    {Math.round(food.confidence * 100)}% sure
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {food.portion} {food.unit}
              </p>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <Button size="sm" variant="ghost" onClick={saveEdit}>
                <Check className="w-4 h-4 text-success" />
              </Button>
              <Button size="sm" variant="ghost" onClick={cancelEdit}>
                <X className="w-4 h-4 text-destructive" />
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemove(food.id)}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <>
          <div className="flex items-center justify-center gap-3 mb-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => adjustPortion(-0.5)}
              disabled={food.portion <= 0.5}
            >
              <Minus className="w-3 h-3" />
            </Button>
            <span className="text-sm font-medium min-w-[60px] text-center">
              {food.portion} {food.unit}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => adjustPortion(0.5)}
            >
              <Plus className="w-3 h-3" />
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <p className="text-lg font-semibold text-foreground">{food.calories}</p>
              <p className="text-xs text-muted-foreground">cal</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-protein">{food.protein}g</p>
              <p className="text-xs text-muted-foreground">protein</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-carbs">{food.carbs}g</p>
              <p className="text-xs text-muted-foreground">carbs</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-fat">{food.fat}g</p>
              <p className="text-xs text-muted-foreground">fat</p>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};