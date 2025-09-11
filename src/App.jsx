import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import PlanTrip from "./pages/PlanTrip";
import Itinerary from "./pages/Itinenary";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div
        className="min-h-screen font-sans"
        style={{
          backgroundColor: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
        }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
