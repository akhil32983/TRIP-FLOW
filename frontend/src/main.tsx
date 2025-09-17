import "@styles/globals.css";

import { createRoot } from "react-dom/client";
import { AuthProvider } from "@/providers/authProvider";
import Router from "@/Router";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <Router />
  </AuthProvider>
);
