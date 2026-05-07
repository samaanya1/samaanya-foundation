import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Understanding from "./pages/Understanding.tsx";
import CochlearImplants from "./pages/CochlearImplants.tsx";
import Programs from "./pages/Programs.tsx";
import Fundraisers from "./pages/Fundraisers.tsx";
import Donate from "./pages/Donate.tsx";
import Contact from "./pages/Contact.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/understanding" element={<Understanding />} />
            <Route path="/cochlear-implants" element={<CochlearImplants />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/workshops" element={<Programs />} />
            <Route path="/stories" element={<About />} />
            <Route path="/fundraisers" element={<Fundraisers />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
