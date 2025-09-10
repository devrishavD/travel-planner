import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

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
        </Routes>
      </div>
<<<<<<< HEAD
    </BrowserRouter>
  </QueryClientProvider>
);
=======
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the and React logos to learn more
      </p>
    </>
  )
}
>>>>>>> 32310c5d4406fd2fdea467d1e6859018fab321e7

export default App;
