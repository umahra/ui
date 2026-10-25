import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Playground } from "./app";

import "./globals.css";

const root = document.getElementById("root");
if (!root) throw new Error("Playground root element is missing.");
createRoot(root).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
