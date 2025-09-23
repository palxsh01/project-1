import { useState } from "react";
import { Plus, Camera, Upload, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PhotoUpload } from "./PhotoUpload";
import { ManualFoodEntry } from "./ManualFoodEntry";
import { FoodData } from "./FoodItem";

interface TrackMealButtonProps {
  onPhotoUploaded: (file: File) => void;
  onFoodAdded: (food: FoodData) => void;
  isLoading?: boolean;
}

export const TrackMealButton = ({ onPhotoUploaded, onFoodAdded, isLoading }: TrackMealButtonProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'photo' | 'manual' | null>(null);

  const handleOptionSelect = (option: 'photo' | 'manual') => {
    setSelectedOption(option);
  };

  const handlePhotoUploaded = (file: File) => {
    onPhotoUploaded(file);
    setOpen(false);
    setSelectedOption(null);
  };

  const handleFoodAdded = (food: FoodData) => {
    onFoodAdded(food);
    setOpen(false);
    setSelectedOption(null);
  };

  const handleBackToOptions = () => {
    setSelectedOption(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover:border-primary/40">
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track your next meal</h3>
            <p className="text-muted-foreground mb-4">
              Take a photo, upload an image, or add foods manually
            </p>
            <Button className="bg-gradient-to-r from-primary to-accent text-white">
              Get Started
            </Button>
          </div>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {selectedOption === 'photo' ? 'Upload Photo' : 
             selectedOption === 'manual' ? 'Add Food Manually' : 
             'How would you like to track your meal?'}
          </DialogTitle>
        </DialogHeader>
        
        {!selectedOption && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <Card 
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/40"
              onClick={() => handleOptionSelect('photo')}
            >
              <div className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Take/Upload Photo</h4>
                <p className="text-sm text-muted-foreground">
                  AI-powered food identification from your photos
                </p>
              </div>
            </Card>
            
            <Card 
              className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/40"
              onClick={() => handleOptionSelect('manual')}
            >
              <div className="p-6 text-center">
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3">
                  <Edit3 className="w-6 h-6 text-accent" />
                </div>
                <h4 className="font-semibold mb-2">Add Manually</h4>
                <p className="text-sm text-muted-foreground">
                  Search and add foods from our database
                </p>
              </div>
            </Card>
          </div>
        )}
        
        {selectedOption === 'photo' && (
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToOptions}
              className="mb-2"
            >
              ← Back to options
            </Button>
            <PhotoUpload 
              onPhotoUploaded={handlePhotoUploaded} 
              isLoading={isLoading} 
            />
          </div>
        )}
        
        {selectedOption === 'manual' && (
          <div className="space-y-4">
            <Button 
              variant="ghost" 
              onClick={handleBackToOptions}
              className="mb-2"
            >
              ← Back to options
            </Button>
            <ManualFoodEntry onFoodAdded={handleFoodAdded} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};