import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { 
  Camera, 
  Upload, 
  Plus, 
  Target, 
  Calendar, 
  Moon, 
  Sun, 
  Edit3, 
  Save, 
  X,
  Check,
  History,
  TrendingUp,
  Apple,
  Zap,
  User,
  Search,
  ChevronDown,
  ChevronRight,
  BarChart3
} from 'lucide-react';

const DietTrackerApp = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('analyze');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2000,
    protein: 150,
    carbs: 250,
    fat: 65,
    fiber: 25
  });
  const [dailyIntake, setDailyIntake] = useState({
    calories: 1245,
    protein: 89,
    carbs: 156,
    fat: 42,
    fiber: 18
  });
  const [editingNutrition, setEditingNutrition] = useState(false);
  const [mealHistory, setMealHistory] = useState([
    {
      id: 1,
      timestamp: '2025-09-21 08:30',
      meal: 'Breakfast',
      items: ['Greek Yogurt', 'Blueberries', 'Granola'],
      calories: 320,
      protein: 15,
      carbs: 45,
      fat: 12
    },
    {
      id: 2,
      timestamp: '2025-09-21 13:15',
      meal: 'Lunch',
      items: ['Grilled Chicken Salad', 'Olive Oil Dressing'],
      calories: 425,
      protein: 35,
      carbs: 28,
      fat: 18
    },
    {
      id: 3,
      timestamp: '2025-09-21 16:00',
      meal: 'Snack',
      items: ['Apple', 'Almonds'],
      calories: 245,
      protein: 8,
      carbs: 32,
      fat: 12
    }
  ]);
  
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  // Mock AI analysis function
  const analyzeImage = async (imageFile) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock AI response
    const mockResult = {
      items: [
        {
          name: 'Grilled Salmon Fillet',
          portion: '150g',
          confidence: 0.92,
          calories: 231,
          protein: 31.2,
          carbs: 0,
          fat: 11.4,
          fiber: 0
        },
        {
          name: 'Steamed Broccoli',
          portion: '100g',
          confidence: 0.88,
          calories: 34,
          protein: 2.8,
          carbs: 7,
          fat: 0.4,
          fiber: 2.6
        },
        {
          name: 'Brown Rice',
          portion: '80g',
          confidence: 0.85,
          calories: 112,
          protein: 2.6,
          carbs: 23,
          fat: 0.9,
          fiber: 1.8
        }
      ],
      totalNutrition: {
        calories: 377,
        protein: 36.6,
        carbs: 30,
        fat: 12.7,
        fiber: 4.4
      }
    };
    
    setAnalysisResult(mockResult);
    setIsAnalyzing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        analyzeImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    canvas.toBlob((blob) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        analyzeImage(blob);
      };
      reader.readAsDataURL(blob);
    });
    
    // Stop camera
    const stream = video.srcObject;
    stream.getTracks().forEach(track => track.stop());
    setIsCameraActive(false);
  };

  const addToDaily = () => {
    if (analysisResult) {
      setDailyIntake(prev => ({
        calories: prev.calories + analysisResult.totalNutrition.calories,
        protein: prev.protein + analysisResult.totalNutrition.protein,
        carbs: prev.carbs + analysisResult.totalNutrition.carbs,
        fat: prev.fat + analysisResult.totalNutrition.fat,
        fiber: prev.fiber + analysisResult.totalNutrition.fiber
      }));
      
      // Add to meal history
      const newMeal = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        meal: 'Custom',
        items: analysisResult.items.map(item => item.name),
        calories: analysisResult.totalNutrition.calories,
        protein: analysisResult.totalNutrition.protein,
        carbs: analysisResult.totalNutrition.carbs,
        fat: analysisResult.totalNutrition.fat
      };
      
      setMealHistory(prev => [newMeal, ...prev]);
      setSelectedImage(null);
      setAnalysisResult(null);
    }
  };

  const NutritionProgressBar = ({ label, current, goal, unit, color }) => {
    const percentage = Math.min((current / goal) * 100, 100);
    
    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {label}
          </span>
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {Math.round(current)}{unit} / {goal}{unit}
          </span>
        </div>
        <div className={`w-full h-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div 
            className={`h-3 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="text-xs mt-1 text-right">
          <span className={percentage >= 100 ? 'text-green-500' : darkMode ? 'text-gray-400' : 'text-gray-500'}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
    );
  };

  const tabs = [
    { id: 'analyze', label: 'Analyze Food', icon: Camera },
    { id: 'manual', label: 'Manual Entry', icon: Plus },
    { id: 'progress', label: 'Daily Progress', icon: Target },
    { id: 'history', label: 'History', icon: History },
    { id: 'browse', label: 'Browse Foods', icon: Search }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 shadow-sm ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b`}>
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Apple className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">AI Diet Tracker</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className={`sticky top-16 z-40 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b`}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 whitespace-nowrap font-medium text-sm transition-colors border-b-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : `border-transparent ${
                          darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900'
                        }`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Analyze Food Tab */}
        {activeTab === 'analyze' && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h2 className="text-lg font-semibold mb-4">Analyze Food with AI</h2>
              
              {!selectedImage && !isCameraActive && (
                <div className="space-y-4">
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    darkMode ? 'border-gray-600 bg-gray-700/50' : 'border-gray-300 bg-gray-50'
                  }`}>
                    <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className={`text-lg mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Capture or upload a photo of your food
                    </p>
                    <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Our AI will identify the food items and calculate nutrition
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={startCamera}
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Camera className="w-5 h-5" />
                        <span>Take Photo</span>
                      </button>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className={`flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border-2 transition-colors ${
                          darkMode 
                            ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <Upload className="w-5 h-5" />
                        <span>Upload Photo</span>
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}

              {isCameraActive && (
                <div className="space-y-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={capturePhoto}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Capture Photo
                    </button>
                    <button
                      onClick={() => {
                        const stream = videoRef.current?.srcObject;
                        stream?.getTracks().forEach(track => track.stop());
                        setIsCameraActive(false);
                      }}
                      className={`px-6 py-3 rounded-lg border-2 transition-colors ${
                        darkMode 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {selectedImage && (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Selected food"
                    className="w-full max-w-md mx-auto rounded-lg shadow-md"
                  />
                  
                  {isAnalyzing && (
                    <div className="text-center py-8">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                      <p className="text-lg font-medium">Analyzing your food...</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        This may take a few seconds
                      </p>
                    </div>
                  )}

                  {analysisResult && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Analysis Results</h3>
                      
                      <div className="grid gap-4">
                        {analysisResult.items.map((item, index) => (
                          <div
                            key={index}
                            className={`p-4 rounded-lg border ${
                              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{item.name}</h4>
                              <span className={`text-sm px-2 py-1 rounded-full ${
                                item.confidence >= 0.9 
                                  ? 'bg-green-100 text-green-800'
                                  : item.confidence >= 0.8
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {Math.round(item.confidence * 100)}% confident
                              </span>
                            </div>
                            <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              Estimated portion: {item.portion}
                            </p>
                            
                            {editingNutrition ? (
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                                <input
                                  type="number"
                                  defaultValue={item.calories}
                                  className={`p-2 rounded text-center text-sm ${
                                    darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                  } border`}
                                  placeholder="Cal"
                                />
                                <input
                                  type="number"
                                  defaultValue={item.protein}
                                  className={`p-2 rounded text-center text-sm ${
                                    darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                  } border`}
                                  placeholder="Protein"
                                />
                                <input
                                  type="number"
                                  defaultValue={item.carbs}
                                  className={`p-2 rounded text-center text-sm ${
                                    darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                  } border`}
                                  placeholder="Carbs"
                                />
                                <input
                                  type="number"
                                  defaultValue={item.fat}
                                  className={`p-2 rounded text-center text-sm ${
                                    darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                  } border`}
                                  placeholder="Fat"
                                />
                                <input
                                  type="number"
                                  defaultValue={item.fiber}
                                  className={`p-2 rounded text-center text-sm ${
                                    darkMode ? 'bg-gray-600 border-gray-500' : 'bg-white border-gray-300'
                                  } border`}
                                  placeholder="Fiber"
                                />
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
                                <div className="text-center">
                                  <div className="font-medium">{item.calories}</div>
                                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Cal</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{item.protein}g</div>
                                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Protein</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{item.carbs}g</div>
                                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Carbs</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{item.fat}g</div>
                                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Fat</div>
                                </div>
                                <div className="text-center">
                                  <div className="font-medium">{item.fiber}g</div>
                                  <div className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Fiber</div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} border-l-4 border-blue-500`}>
                        <h4 className="font-semibold mb-2">Total Nutrition</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{Math.round(analysisResult.totalNutrition.calories)}</div>
                            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Calories</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{Math.round(analysisResult.totalNutrition.protein)}g</div>
                            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Protein</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{Math.round(analysisResult.totalNutrition.carbs)}g</div>
                            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Carbs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{Math.round(analysisResult.totalNutrition.fat)}g</div>
                            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Fat</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-blue-600">{Math.round(analysisResult.totalNutrition.fiber)}g</div>
                            <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Fiber</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between">
                        <button
                          onClick={() => setEditingNutrition(!editingNutrition)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            darkMode 
                              ? 'text-gray-300 hover:bg-gray-700 border border-gray-600' 
                              : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                          }`}
                        >
                          {editingNutrition ? <Save className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                          <span>{editingNutrition ? 'Save Changes' : 'Edit Values'}</span>
                        </button>
                        
                        <div className="flex space-x-3">
                          <button
                            onClick={() => {
                              setSelectedImage(null);
                              setAnalysisResult(null);
                            }}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                              darkMode 
                                ? 'text-gray-300 hover:bg-gray-700 border border-gray-600' 
                                : 'text-gray-700 hover:bg-gray-50 border border-gray-300'
                            }`}
                          >
                            Try Another
                          </button>
                          <button
                            onClick={addToDaily}
                            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Add to Daily</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Daily Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Daily Progress</h2>
                <div className="text-sm text-gray-500">
                  Today • {new Date().toLocaleDateString()}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <NutritionProgressBar
                    label="Calories"
                    current={dailyIntake.calories}
                    goal={dailyGoals.calories}
                    unit=""
                    color="bg-gradient-to-r from-orange-400 to-orange-600"
                  />
                  <NutritionProgressBar
                    label="Protein"
                    current={dailyIntake.protein}
                    goal={dailyGoals.protein}
                    unit="g"
                    color="bg-gradient-to-r from-red-400 to-red-600"
                  />
                  <NutritionProgressBar
                    label="Carbohydrates"
                    current={dailyIntake.carbs}
                    goal={dailyGoals.carbs}
                    unit="g"
                    color="bg-gradient-to-r from-blue-400 to-blue-600"
                  />
                </div>
                <div>
                  <NutritionProgressBar
                    label="Fat"
                    current={dailyIntake.fat}
                    goal={dailyGoals.fat}
                    unit="g"
                    color="bg-gradient-to-r from-yellow-400 to-yellow-600"
                  />
                  <NutritionProgressBar
                    label="Fiber"
                    current={dailyIntake.fiber}
                    goal={dailyGoals.fiber}
                    unit="g"
                    color="bg-gradient-to-r from-green-400 to-green-600"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-md font-semibold mb-4">Today's Meals</h3>
                <div className="space-y-3">
                  {mealHistory.map((meal) => (
                    <div
                      key={meal.id}
                      className={`p-4 rounded-lg border ${
                        darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{meal.meal}</h4>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {meal.items.join(', ')}
                          </p>
                          <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                            {meal.timestamp}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{meal.calories} cal</div>
                          <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Entry Tab */}
        {activeTab === 'manual' && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h2 className="text-lg font-semibold mb-4">Manual Food Entry</h2>
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Search Food Item
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Type food name (e.g., 'chicken breast', 'banana')"
                      className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Portion Size
                    </label>
                    <input
                      type="number"
                      placeholder="e.g., 100"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Unit
                    </label>
                    <select className={`w-full px-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                      <option>grams</option>
                      <option>ounces</option>
                      <option>cups</option>
                      <option>pieces</option>
                      <option>tablespoons</option>
                    </select>
                  </div>
                </div>

                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Add Food Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Browse Foods Tab */}
        {activeTab === 'browse' && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <h2 className="text-lg font-semibold mb-4">Browse Nutrition Database</h2>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search thousands of foods..."
                    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: 'Chicken Breast (100g)', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
                  { name: 'Brown Rice (100g)', calories: 112, protein: 2.6, carbs: 23, fat: 0.9 },
                  { name: 'Broccoli (100g)', calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
                  { name: 'Salmon Fillet (100g)', calories: 208, protein: 22, carbs: 0, fat: 12 },
                  { name: 'Greek Yogurt (100g)', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
                  { name: 'Avocado (100g)', calories: 160, protein: 2, carbs: 9, fat: 15 }
                ].map((food, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <h4 className="font-medium mb-2">{food.name}</h4>
                    <div className="text-sm space-y-1">
                      <div>Calories: {food.calories}</div>
                      <div>Protein: {food.protein}g</div>
                      <div>Carbs: {food.carbs}g</div>
                      <div>Fat: {food.fat}g</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Meal History</h2>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <select className={`px-3 py-2 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {mealHistory.map((meal) => (
                  <div
                    key={meal.id}
                    className={`p-4 rounded-lg border ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium">{meal.meal}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600'
                          }`}>
                            {meal.timestamp.split(' ')[1]}
                          </span>
                        </div>
                        <p className={`text-sm mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {meal.items.join(', ')}
                        </p>
                        <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          {meal.timestamp.split(' ')[0]}
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="font-medium text-lg">{meal.calories}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>calories</div>
                        <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                          P:{meal.protein}g C:{meal.carbs}g F:{meal.fat}g
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Hidden elements for camera functionality */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default DietTrackerApp;