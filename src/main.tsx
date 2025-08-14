import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <main className="w-[90%] max-w-[1440px] mx-auto">
    <App />
  </main>
);
