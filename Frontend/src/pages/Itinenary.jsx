import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, Clock, MapPin, Save, Download, List, BarChart3, Edit3 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

const Itinerary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const tripData = location.state?.tripData;

  const [itinerary, setItinerary] = useState({
    destination: tripData?.destination || "Paris, France",
    startDate: tripData?.startDate || "2024-03-15",
    endDate: tripData?.endDate || "2024-03-22",
    budget: parseInt(tripData?.budget) || 150000,
    currency: tripData?.currency || "INR",
    travelers: parseInt(tripData?.travelers) || 2,
    days: [
      {
        day: 1,
        date: "2024-03-15",
        theme: "Arrival & City Center",
        totalCost: 18000,
        activities: [
          {
            id: 1,
            time: "09:00",
            title: "Arrival at Charles de Gaulle Airport",
            description: "Land in Paris and take airport shuttle to city center",
            location: "CDG Airport",
            cost: 2500,
            duration: "2 hours",
            category: "transport"
          },
          {
            id: 2,
            time: "12:00",
            title: "Check-in at Hotel",
            description: "Check-in at Hotel des Grands Boulevards",
            location: "2nd Arrondissement",
            cost: 12000,
            duration: "30 minutes",
            category: "accommodation"
          },
          {
            id: 3,
            time: "14:00",
            title: "Lunch at Local Café",
            description: "Traditional French lunch near the hotel",
            location: "Café de Flore",
            cost: 3500,
            duration: "1.5 hours",
            category: "food"
          }
        ]
      },
      {
        day: 2,
        date: "2024-03-16",
        theme: "Historic Paris",
        totalCost: 22000,
        activities: [
          {
            id: 4,
            time: "09:00",
            title: "Visit Notre-Dame Cathedral",
            description: "Explore the iconic Gothic cathedral and surrounding area",
            location: "Île de la Cité",
            cost: 0,
            duration: "2 hours",
            category: "sightseeing"
          },
          {
            id: 5,
            time: "11:30",
            title: "Seine River Cruise",
            description: "Scenic boat tour along the Seine River",
            location: "Seine River",
            cost: 4000,
            duration: "1.5 hours",
            category: "sightseeing"
          },
          {
            id: 6,
            time: "13:30",
            title: "Lunch at Bistro",
            description: "Authentic French bistro experience",
            location: "Le Procope",
            cost: 4500,
            duration: "1.5 hours",
            category: "food"
          },
          {
            id: 7,
            time: "16:00",
            title: "Visit Louvre Museum",
            description: "Explore world-famous art collection including Mona Lisa",
            location: "Louvre Museum",
            cost: 5000,
            duration: "3 hours",
            category: "cultural"
          },
          {
            id: 8,
            time: "20:00",
            title: "Dinner at French Restaurant",
            description: "Fine dining experience with wine pairing",
            location: "L'Ami Jean",
            cost: 8500,
            duration: "2 hours",
            category: "food"
          }
        ]
      }
    ]
  });

  const [editingActivity, setEditingActivity] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  const formatCurrency = (amount) => {
    const symbol = itinerary.currency === "INR" ? "₹" : "$";
    return `${symbol}${amount.toLocaleString()}`;
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "food": return "bg-accent/10 text-accent border-accent/20";
      case "transport": return "bg-primary/10 text-primary border-primary/20";
      case "accommodation": return "bg-secondary-accent/10 text-secondary-accent border-secondary-accent/20";
      case "sightseeing": return "bg-success/10 text-success border-success/20";
      case "cultural": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleSaveItinerary = () => {
    toast({
      title: "Itinerary Saved!",
      description: "Your trip has been saved to your dashboard.",
    });
  };

  const handleExportPDF = () => {
    toast({
      title: "Exporting PDF",
      description: "Your itinerary is being prepared for download...",
    });
  };

  const totalBudget = itinerary.days.reduce((sum, day) => sum + day.totalCost, 0);

  if (!tripData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No trip data found</h2>
          <Button onClick={() => navigate('/plan')}>Plan a New Trip</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{itinerary.destination}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                </span>
                <span>{itinerary.travelers} travelers</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleExportPDF}>
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
              <Button onClick={handleSaveItinerary} className="bg-accent hover:bg-accent-hover shadow-glow">
                <Save className="mr-2 h-4 w-4" />
                Save Trip
              </Button>
            </div>
          </div>

          {/* Budget Overview */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Planned Budget</p>
                  <p className="text-2xl font-bold text-primary">{formatCurrency(itinerary.budget)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Estimated Cost</p>
                  <p className="text-2xl font-bold text-success">{formatCurrency(totalBudget)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                  <p className={`text-2xl font-bold ${itinerary.budget - totalBudget >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(itinerary.budget - totalBudget)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value)} className="w-auto">
            <TabsList>
              <TabsTrigger value="list" className="flex items-center gap-2">
                <List className="h-4 w-4" />
                List View
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Timeline View
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Itinerary Content */}
        <div className="space-y-8">
          {itinerary.days.map((day) => (
            <Card key={day.day} className="shadow-soft">
              <CardHeader className="bg-gradient-sky rounded-t-lg">
                <div className="flex justify-between items-center text-white">
                  <div>
                    <CardTitle className="text-xl">Day {day.day} - {day.theme}</CardTitle>
                    <p className="text-white/80">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white/80">Daily Cost</p>
                    <p className="text-xl font-bold">{formatCurrency(day.totalCost)}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {day.activities.map((activity) => (
                    <div
                      key={activity.id}
                      className={`flex gap-4 p-4 rounded-lg border ${
                        viewMode === 'timeline' ? 'border-l-4 border-l-primary' : 'border-border'
                      } bg-card hover:shadow-soft transition-all duration-300`}
                    >
                      <div className="flex-shrink-0 w-16 text-center">
                        <Badge variant="outline" className="bg-primary/10 text-primary">
                          {activity.time}
                        </Badge>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{activity.title}</h4>
                            <p className="text-muted-foreground mb-2">{activity.description}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {activity.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {activity.duration}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(activity.category)}>
                              {activity.category}
                            </Badge>
                            <span className="font-semibold text-lg">{formatCurrency(activity.cost)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setEditingActivity(editingActivity === activity.id ? null : activity.id)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {editingActivity === activity.id && (
                          <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <Input placeholder="Activity title" defaultValue={activity.title} />
                              <Input placeholder="Time" defaultValue={activity.time} />
                            </div>
                            <Textarea placeholder="Description" defaultValue={activity.description} rows={2} />
                            <div className="grid grid-cols-3 gap-3">
                              <Input placeholder="Location" defaultValue={activity.location} />
                              <Input placeholder="Duration" defaultValue={activity.duration} />
                              <Input placeholder="Cost" defaultValue={activity.cost.toString()} />
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => setEditingActivity(null)}>Save Changes</Button>
                              <Button variant="outline" size="sm" onClick={() => setEditingActivity(null)}>Cancel</Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
