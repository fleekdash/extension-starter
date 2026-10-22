import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { getBrowserWindow } from "@fleekdash/contracts";
// Self-styling: the generated Fleek UI bundle (tokens, utilities, fui-*)
// ships inside the package so the starter renders styled even on hosts
// whose compiled globals-css never scanned this extension's classes.
import "@fleekdash/design-system/fleek-ui.css";

const rootElement = getBrowserWindow()?.document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
