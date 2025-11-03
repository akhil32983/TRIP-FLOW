import "@styles/globals.css";

import { createRoot } from "react-dom/client";
import { AuthProvider } from "@/providers/authProvider";
import { DemoProvider } from "@/providers/demoProvider";
import Router from "@/Router";

createRoot(document.getElementById("root")!).render(
    <DemoProvider>
        <AuthProvider>
            <Router />
        </AuthProvider>
    </DemoProvider>
);
