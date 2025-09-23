import { useState, useRef } from "react";
import { Camera, Upload, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
interface PhotoUploadProps {
  onPhotoUploaded: (file: File) => void;
  isLoading?: boolean;
}
export const PhotoUpload = ({
  onPhotoUploaded,
  isLoading
}: PhotoUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleFiles = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onPhotoUploaded(file);
      }
    }
  };
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };
  return <Card className={cn("relative border-2 border-dashed border-border bg-gradient-to-br from-card to-muted/20 transition-all duration-300", dragActive && "border-primary bg-primary/5", isLoading && "pointer-events-none opacity-50")}>
      <div className="p-8 text-center" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
        <input ref={inputRef} type="file" accept="image/*" onChange={e => handleFiles(e.target.files)} className="hidden" />
        
        <div className="mb-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload a meal photo</h3>
          <p className="text-muted-foreground">
            Take a photo or upload an image to identify foods and track nutrition
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => inputRef.current?.click()} disabled={isLoading} className="bg-gradient-to-r from-primary to-accent text-white">
            <Upload className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          <Button variant="outline" onClick={() => inputRef.current?.click()} disabled={isLoading}>
            <ImageIcon className="w-4 h-4 mr-2" />
            Browse Gallery
          </Button>
        </div>

        
      </div>
    </Card>;
};