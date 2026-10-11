import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { getBrowserWindow } from "@fleekdash/contracts";

const rootElement = getBrowserWindow()?.document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
