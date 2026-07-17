import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";

// Home is eager (most-visited landing page — no chunk waterfall).
import Home from "./pages/Home";

// Every other route is code-split so it's only downloaded when visited,
// keeping the initial JS bundle small.
const Services = lazy(() => import("./pages/Services"));
const AirDuctCleaning = lazy(() => import("./pages/AirDuctCleaning"));
const DryerVentCleaning = lazy(() => import("./pages/DryerVentCleaning"));
const ChimneyCleaning = lazy(() => import("./pages/ChimneyCleaning"));
const AtticInsulation = lazy(() => import("./pages/AtticInsulation"));
const AirPurification = lazy(() => import("./pages/AirPurification"));
const CondenserCoilCleaning = lazy(() => import("./pages/CondenserCoilCleaning"));
const SolarAtticFan = lazy(() => import("./pages/SolarAtticFan"));
const AtticRemoval = lazy(() => import("./pages/AtticRemoval"));
const ReferralClub = lazy(() => import("./pages/ReferralClub"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ThankYou = lazy(() => import("./pages/ThankYou"));

function Router() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-background" />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/services" component={Services} />
          <Route path="/air-duct-cleaning" component={AirDuctCleaning} />
          <Route path="/dryer-vent-cleaning" component={DryerVentCleaning} />
          <Route path="/chimney-cleaning" component={ChimneyCleaning} />
          <Route path="/attic-insulation" component={AtticInsulation} />
          <Route path="/air-purification" component={AirPurification} />
          <Route path="/condenser-coil-cleaning" component={CondenserCoilCleaning} />
          <Route path="/solar-attic-fan" component={SolarAtticFan} />
          <Route path="/attic-removal" component={AtticRemoval} />
          <Route path="/referral-club" component={ReferralClub} />
          <Route path="/blog" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <Route path="/locations/:city" component={LocationPage} />
          <Route path="/thank-you" component={ThankYou} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
