import { ArrowRight, MapPin, Calendar, DollarSign, Star, Users, Plane } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/card";
import heroImage from "../assets/hero-travel.jpg";

const Home = () => {
  const features = [
    {
      icon: MapPin,
      title: "Smart Itineraries",
      description:
        "Get personalized day-by-day plans with activities, timings, and locations tailored to your preferences."
    },
    {
      icon: DollarSign,
      title: "Budget Tracking",
      description:
        "Track expenses in real-time with multi-currency support and visual insights to stay within budget."
    },
    {
      icon: Calendar,
      title: "Flexible Planning",
      description:
        "Easily edit your itinerary on the go and adapt your plans as your trip evolves."
    },
    {
      icon: Star,
      title: "Curated Experiences",
      description:
        "Discover hidden gems and popular attractions based on your travel style and interests."
    }
  ];

  const stats = [
    { icon: Users, number: "10K+", label: "Happy Travelers" },
    { icon: MapPin, number: "500+", label: "Destinations" },
    { icon: Plane, number: "50K+", label: "Trips Planned" },
    { icon: Star, number: "4.9", label: "User Rating" }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Travel hero"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-800/40 to-gray-900/70" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Plan Your Perfect
            <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Create personalized itineraries, track expenses, and discover amazing destinations with RoamRouter
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/plan">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white px-8 py-6 text-lg shadow-lg">
                Start Planning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-850">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Everything You Need for Perfect Trips
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              From planning to tracking expenses, RoamRouter makes travel planning effortless and enjoyable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-cyan-400 to-blue-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-3">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who trust RoamRouter for their adventures
          </p>
          <Link to="/plan">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 px-8 py-6 text-lg shadow-lg"
            >
              Plan Your First Trip
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
