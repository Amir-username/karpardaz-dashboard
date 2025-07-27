import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

// Add fonts-loaded class to body when Material Symbols font is loaded
if (document.fonts) {
  document.fonts.load('1em "Material Symbols Outlined"').then(() => {
    document.body.classList.add('fonts-loaded');
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
