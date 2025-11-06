import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";
import Gallery from "./pages/Gallery";
import ModelDetail from "./pages/ModelDetail";
import Heritage from "@/pages/Heritage";
import Contact from "@/pages/Contact";
import SharedConfig from "@/pages/SharedConfig";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
  <Route path="/configurator" component={Gallery} />
  <Route path="/gallery" component={Gallery} />
    <Route path="/gallery/:modelId" component={ModelDetail} />
    <Route path="/models" component={Gallery} />
      <Route path="/heritage" component={Heritage} />
      <Route path="/contact" component={Contact} />
      <Route path="/shared/:id" component={SharedConfig} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
