import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ContextWrapper from "./contexts/index.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </StrictMode>
);
