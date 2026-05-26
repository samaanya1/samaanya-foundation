import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
import Webinars from "./pages/Webinars.tsx";
import Stories from "./pages/Stories.tsx";
import Admin from "./pages/Admin.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const PublicLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Admin — no navbar/footer */}
          <Route path="/admin" element={<Admin />} />

          {/* Public site — wrapped in Layout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/understanding" element={<Understanding />} />
            <Route path="/cochlear-implants" element={<CochlearImplants />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/workshops" element={<Programs />} />
            <Route path="/webinars" element={<Webinars />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/fundraisers" element={<Fundraisers />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
