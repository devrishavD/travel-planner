import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { useToast } from "../hooks/use-toast";


const PlanTrip = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "1",
    budget: "",
    currency: "INR",
    accommodation: "",
    travelType: "",
    attractions: [],
    cuisine: ""
  });

  const accommodationOptions = [
    { value: "hotel", label: "Hotel" },
    { value: "hostel", label: "Hostel" },
    { value: "airbnb", label: "Airbnb" },
    { value: "resort", label: "Resort" }
  ];

  const travelTypeOptions = [
    { value: "solo", label: "Solo" },
    { value: "couple", label: "Couple" },
    { value: "family", label: "Family" },
    { value: "student", label: "Student" },
    { value: "friends", label: "Friends" }
  ];

  const attractionCategories = [
    { id: "sightseeing", label: "Sightseeing" },
    { id: "adventure", label: "Adventure" },
    { id: "cultural", label: "Cultural" },
    { id: "shopping", label: "Shopping" },
    { id: "food", label: "Food & Dining" }
  ];

  const cuisineOptions = [
    { value: "local", label: "Local Cuisine" },
    { value: "indian", label: "Indian" },
    { value: "chinese", label: "Chinese" },
    { value: "italian", label: "Italian" },
    { value: "mediterranean", label: "Mediterranean" },
    { value: "asian", label: "Asian Fusion" }
  ];

  const currencyOptions = [
    { value: "INR", label: "₹ INR" },
    { value: "USD", label: "$ USD" },
    { value: "EUR", label: "€ EUR" },
    { value: "GBP", label: "£ GBP" }
  ];

  const handleAttractionChange = (attractionId, checked) => {
    setFormData(prev => ({
      ...prev,
      attractions: checked
        ? [...prev.attractions, attractionId]
        : prev.attractions.filter(id => id !== attractionId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.destination || !formData.startDate || !formData.endDate || !formData.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Trip Planning Started!",
      description: "Creating your personalized itinerary..."
    });

    // Simulate API call and redirect to results
    setTimeout(() => {
      navigate("/itinerary", { state: { tripData: formData } });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Plan Your Perfect Trip</h1>
          <p className="text-lg text-muted-foreground">
            Tell us about your travel preferences and we'll create a personalized itinerary for you
          </p>
        </div>

        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Trip Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Destination */}
              <div className="space-y-2">
                <Label htmlFor="destination">Destination City *</Label>
                <Input
                  id="destination"
                  placeholder="e.g., Paris, Tokyo, New York"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData(prev => ({ ...prev, destination: e.target.value }))
                  }
                  className="bg-background"
                />
              </div>

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, startDate: e.target.value }))
                    }
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, endDate: e.target.value }))
                    }
                    className="bg-background"
                  />
                </div>
              </div>

              {/* Travelers and Budget */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="travelers">Number of Travelers</Label>
                  <Select
                    value={formData.travelers}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, travelers: value }))
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? "Person" : "People"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, currency: value }))
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget *</Label>
                  <Input
                    id="budget"
                    placeholder="Enter amount"
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData(prev => ({ ...prev, budget: e.target.value }))
                    }
                    className="bg-background"
                  />
                </div>
              </div>

              {/* Accommodation and Travel Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Accommodation Preference</Label>
                  <Select
                    value={formData.accommodation}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, accommodation: value }))
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select accommodation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {accommodationOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Travel Type</Label>
                  <Select
                    value={formData.travelType}
                    onValueChange={(value) =>
                      setFormData(prev => ({ ...prev, travelType: value }))
                    }
                  >
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select travel type" />
                    </SelectTrigger>
                    <SelectContent>
                      {travelTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Attraction Categories */}
              <div className="space-y-4">
                <Label>What interests you? (Select all that apply)</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {attractionCategories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id}
                        checked={formData.attractions.includes(category.id)}
                        onCheckedChange={(checked) =>
                          handleAttractionChange(category.id, checked)
                        }
                      />
                      <Label htmlFor={category.id} className="text-sm font-medium">
                        {category.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cuisine Preference */}
              <div className="space-y-2">
                <Label>Preferred Cuisine</Label>
                <Select
                  value={formData.cuisine}
                  onValueChange={(value) =>
                    setFormData(prev => ({ ...prev, cuisine: value }))
                  }
                >
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select cuisine preference" />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              {/* Submit Button */}
              <div className="pt-6 relative">
                {/* Gradient strip under button */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-500 rounded-full" />

                <Button
                  type="submit"
                  className="relative z-10 w-full bg-primary hover:bg-primary-dark text-lg py-6 shadow-glow"
                >
                  <Star className="mr-2 h-5 w-5" />
                  Generate My Itinerary
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PlanTrip;
