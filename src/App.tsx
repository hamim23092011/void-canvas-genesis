import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AllItems from "./pages/AllItems";
import ItemDetails from "./pages/ItemDetails";
import AddItems from "./pages/AddItems";
import MyItems from "./pages/MyItems";
import UpdateItem from "./pages/UpdateItem";
import AllRecovered from "./pages/AllRecovered";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/allItems" element={<AllItems />} />
                <Route path="/items/:id" element={<ProtectedRoute><ItemDetails /></ProtectedRoute>} />
                <Route path="/addItems" element={<ProtectedRoute><AddItems /></ProtectedRoute>} />
                <Route path="/myItems" element={<ProtectedRoute><MyItems /></ProtectedRoute>} />
                <Route path="/updateItems/:id" element={<ProtectedRoute><UpdateItem /></ProtectedRoute>} />
                <Route path="/allRecovered" element={<ProtectedRoute><AllRecovered /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
