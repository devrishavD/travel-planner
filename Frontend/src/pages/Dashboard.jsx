import { useState } from "react";
import { Plus, Calendar, MapPin, DollarSign, Edit3, Eye, Trash2, PieChart } from "lucide-react";
import { Link } from "react-router-dom";
import {Button} from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {Progress} from "../components/ui/Progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";


const Dashboard = () => {
  // Mock data - would come from API in real app
  const trips = [
    {
      id: 1,
      destination: "Paris, France",
      startDate: "2024-03-15",
      endDate: "2024-03-22",
      budget: 150000,
      spent: 89000,
      currency: "INR",
      status: "ongoing",
      travelers: 2
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      startDate: "2024-01-10",
      endDate: "2024-01-17",
      budget: 120000,
      spent: 118500,
      currency: "INR",
      status: "completed",
      travelers: 1
    },
    {
      id: 3,
      destination: "Bali, Indonesia",
      startDate: "2024-05-01",
      endDate: "2024-05-08",
      budget: 80000,
      spent: 0,
      currency: "INR",
      status: "planned",
      travelers: 2
    }
  ];

  const recentExpenses = [
    { id: 1, tripId: 1, amount: 4500, category: "food", description: "Dinner at Le Comptoir", date: "2024-01-15" },
    { id: 2, tripId: 1, amount: 2800, category: "transport", description: "Metro day pass", date: "2024-01-15" },
    { id: 3, tripId: 1, amount: 12000, category: "stay", description: "Hotel night 3", date: "2024-01-14" },
    { id: 4, tripId: 1, amount: 1500, category: "shopping", description: "Souvenirs", date: "2024-01-14" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "ongoing": return "bg-success";
      case "completed": return "bg-muted";
      case "planned": return "bg-primary";
      default: return "bg-muted";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "food": return "🍽️";
      case "transport": return "🚗";
      case "stay": return "🏨";
      case "shopping": return "🛍️";
      case "miscellaneous": return "📝";
      default: return "💰";
    }
  };

  const formatCurrency = (amount, currency) => {
    const symbol = currency === "INR" ? "₹" : "$";
    return `${symbol}${amount.toLocaleString()}`;
  };

  const getBudgetProgress = (spent, budget) => {
    return (spent / budget) * 100;
  };

  return (
    <div className="min-h-screen bg-muted/20 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Trip Dashboard</h1>
            <p className="text-muted-foreground">Manage your trips and track expenses</p>
          </div>
          <Link to="/plan">
            <Button className="bg-accent hover:bg-accent-hover mt-4 md:mt-0 shadow-glow">
              <Plus className="mr-2 h-4 w-4" />
              Plan New Trip
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Trips</p>
                  <p className="text-2xl font-bold">{trips.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ongoing Trips</p>
                  <p className="text-2xl font-bold">{trips.filter(t => t.status === 'ongoing').length}</p>
                </div>
                <Calendar className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold">₹{trips.reduce((sum, trip) => sum + trip.budget, 0).toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold">₹{trips.reduce((sum, trip) => sum + trip.spent, 0).toLocaleString()}</p>
                </div>
                <PieChart className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trips" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trips">My Trips</TabsTrigger>
            <TabsTrigger value="expenses">Recent Expenses</TabsTrigger>
          </TabsList>

          <TabsContent value="trips" className="space-y-6">
            {/* Trips List */}
            <div className="grid gap-6">
              {trips.map((trip) => (
                <Card key={trip.id} className="shadow-soft hover:shadow-medium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{trip.destination}</h3>
                          <Badge className={`${getStatusColor(trip.status)} text-white`}>
                            {trip.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </span>
                          <span>{trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}</span>
                        </div>
                        
                        {/* Budget Progress */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Budget Progress</span>
                            <span>{formatCurrency(trip.spent, trip.currency)} / {formatCurrency(trip.budget, trip.currency)}</span>
                          </div>
                          <Progress 
                            value={getBudgetProgress(trip.spent, trip.budget)} 
                            className="h-2"
                          />
                          {getBudgetProgress(trip.spent, trip.budget) > 90 && (
                            <p className="text-sm text-warning">⚠️ Close to budget limit</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive-foreground hover:bg-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            {/* Recent Expenses */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Recent Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentExpenses.map((expense) => (
                    <div key={expense.id} className="flex items-center justify-between p-4 border rounded-lg bg-muted/10">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getCategoryIcon(expense.category)}</span>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {expense.category} • {new Date(expense.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{expense.amount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
