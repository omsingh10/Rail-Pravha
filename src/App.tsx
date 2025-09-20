import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import TrainSchedules from "./pages/TrainSchedules";
import ConflictsAlerts from "./pages/ConflictsAlerts";
import Simulation from "./pages/Simulation";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import UtilsDemo from "./pages/UtilsDemo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/schedules" element={<TrainSchedules />} />
            <Route path="/conflicts" element={<ConflictsAlerts />} />
            <Route path="/simulation" element={<Simulation />} />
            <Route path="/reports" element={<Reports />} />
            {/* Network and Performance pages can be added later */}
            <Route path="/network" element={<Dashboard />} />
            <Route path="/performance" element={<Dashboard />} />
            <Route path="/utils-demo" element={<UtilsDemo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
