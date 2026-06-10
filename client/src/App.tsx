import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Core Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import AirDuctCleaning from "./pages/AirDuctCleaning";
import DryerVentCleaning from "./pages/DryerVentCleaning";
import ChimneyCleaning from "./pages/ChimneyCleaning";
import AtticInsulation from "./pages/AtticInsulation";
import AirPurification from "./pages/AirPurification";
import CondenserCoilCleaning from "./pages/CondenserCoilCleaning";
import SolarAtticFan from "./pages/SolarAtticFan";
import AtticRemoval from "./pages/AtticRemoval";
import ReferralClub from "./pages/ReferralClub";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import About from "./pages/About";
import LocationPage from "./pages/LocationPage";
import NotFound from "./pages/NotFound";
import ThankYou from "./pages/ThankYou";
import ScrollToTop from "./components/ScrollToTop";

function Router() {
  return (
    <>
    <ScrollToTop />
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
