import { useState } from "react";
import { User, Mail, Lock, Camera, Save, MapPin, DollarSign } from "lucide-react";

import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    bio: "Passionate traveler exploring the world one destination at a time.",
    defaultTravelType: "solo",
    defaultCurrency: "INR",
    dailyBudgetLimit: "5000",
    favoriteCuisines: ["local", "indian", "italian"],
    accommodationType: "hotel",
    frequentCities: "Mumbai, Delhi, Bangalore",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const travelTypeOptions = [
    { value: "solo", label: "Solo" },
    { value: "couple", label: "Couple" },
    { value: "family", label: "Family" },
    { value: "student", label: "Student" },
    { value: "friends", label: "Friends" },
  ];

  const currencyOptions = [
    { value: "INR", label: "₹ INR" },
    { value: "USD", label: "$ USD" },
    { value: "EUR", label: "€ EUR" },
    { value: "GBP", label: "£ GBP" },
  ];

  const accommodationOptions = [
    { value: "hotel", label: "Hotel" },
    { value: "hostel", label: "Hostel" },
    { value: "airbnb", label: "Airbnb" },
    { value: "resort", label: "Resort" },
  ];

  const handleProfileSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Password Mismatch",
        description: "New passwords don't match. Please try again.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    });

    setPasswords({ current: "", new: "", confirm: "" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account and travel preferences</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture & Basic Info */}
          <div className="lg:col-span-1">
            <Card className="shadow-soft bg-card">
              <CardContent className="p-6 text-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 bg-gradient-ocean rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold shadow-glow">
                    {profileData.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 rounded-full w-10 h-10 bg-accent hover:bg-accent-hover shadow-medium"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="text-xl font-semibold mb-1">{profileData.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{profileData.email}</p>
                <div className="text-sm text-muted-foreground">
                  <p>Member since January 2024</p>
                  <p>5 trips completed</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card className="shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, name: e.target.value }))}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData((prev) => ({ ...prev, email: e.target.value }))}
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="bg-background"
                    rows={3}
                  />
                </div>
                <Button onClick={handleProfileSave} className="bg-primary hover:bg-primary-dark">
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Travel Preferences */}
            <Card className="shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Travel Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Travel Type</Label>
                    <Select
                      value={profileData.defaultTravelType}
                      onValueChange={(value) =>
                        setProfileData((prev) => ({ ...prev, defaultTravelType: value }))
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {travelTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Preferred Accommodation</Label>
                    <Select
                      value={profileData.accommodationType}
                      onValueChange={(value) =>
                        setProfileData((prev) => ({ ...prev, accommodationType: value }))
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {accommodationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cities">Frequently Visited Cities</Label>
                  <Input
                    id="cities"
                    placeholder="e.g., Mumbai, Delhi, Bangalore"
                    value={profileData.frequentCities}
                    onChange={(e) =>
                      setProfileData((prev) => ({ ...prev, frequentCities: e.target.value }))
                    }
                    className="bg-background"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Budget Settings */}
            <Card className="shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Budget Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Default Currency</Label>
                    <Select
                      value={profileData.defaultCurrency}
                      onValueChange={(value) =>
                        setProfileData((prev) => ({ ...prev, defaultCurrency: value }))
                      }
                    >
                      <SelectTrigger className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dailyLimit">Daily Budget Limit</Label>
                    <Input
                      id="dailyLimit"
                      placeholder="5000"
                      value={profileData.dailyBudgetLimit}
                      onChange={(e) =>
                        setProfileData((prev) => ({ ...prev, dailyBudgetLimit: e.target.value }))
                      }
                      className="bg-background"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="shadow-soft bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-primary" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                    className="bg-background"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords((prev) => ({ ...prev, new: e.target.value }))}
                      className="bg-background"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords((prev) => ({ ...prev, confirm: e.target.value }))
                      }
                      className="bg-background"
                    />
                  </div>
                </div>
                <Button onClick={handlePasswordChange} variant="outline">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
