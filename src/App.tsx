
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import VideoMapViewer from "./pages/VideoMapViewer";
import DataUpload from "./pages/DataUpload";
import DistressSummary from "./pages/DistressSummary";
import InspectorNotes from "./pages/InspectorNotes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/video-map" element={<VideoMapViewer />} />
          <Route path="/data-upload" element={<DataUpload />} />
          <Route path="/distress-summary" element={<DistressSummary />} />
          <Route path="/inspector-notes" element={<InspectorNotes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
