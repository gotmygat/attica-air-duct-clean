import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Inject favicon dynamically (runtime injection to bypass build pipeline)
(function() {
  if (!document.querySelector('link[rel="icon"]')) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/svg+xml";
    link.href = "/assets/favicon.svg";
    document.head.appendChild(link);
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
