import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import type { ReactNode } from "react";

import IndexPage from "@pages/Index";
import LoginPage from "@pages/Login";
import RegisterPage from "@pages/Register";
import DashboardPage from "@pages/Dashboard";
import ItinerariesPage from "@pages/itineraries/Itineraries";
import ItineraryDetailPage from "@pages/itineraries/ItineraryDetail";
import ItineraryNewPage from "@pages/itineraries/ItineraryNew";
import ItineraryEditPage from "@pages/itineraries/ItineraryEdit";
import ProfilePage from "@pages/Profile";
import NotFound from "@pages/NotFound";

import { useAuth } from "@/providers/authProvider";
import { useDemo } from "@/providers/demoProvider";
import { useNotifications } from "@/hooks/useNotifications";

/**
 * PrivateRoute component that checks if the user is authenticated.
 * If not, redirects to the login page.
 */
function PrivateRoute({ children }: { children: ReactNode }) {
    const { demo } = useDemo();
    const { user } = useAuth();

    if (demo) return children;

    if (!user) return <Navigate to="/login" replace />;
    return children;
}

/**
 * Sets up WebSocket notifications for authenticated users.
 * If the user is in demo mode or not authenticated, does nothing.
 */
function setUpNotifications() {
    const { demo } = useDemo();
    const { user } = useAuth();

    if (demo || !user) return;

    useNotifications();
}

export default function Router() {
    setUpNotifications();

    return (
        <BrowserRouter>
            <Routes>
                {/* Public routes */}
                <Route index element={<IndexPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<RegisterPage />} />

                {/* Private routes */}
                <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                <Route path="/itineraries">
                    <Route index element={<PrivateRoute><ItinerariesPage /></PrivateRoute>} />
                    <Route path=":id">
                        <Route index element={<PrivateRoute><ItineraryDetailPage /></PrivateRoute>} />
                        <Route path="edit" element={<PrivateRoute><ItineraryEditPage /></PrivateRoute>} />
                    </Route>
                    <Route path="new" element={<PrivateRoute><ItineraryNewPage /></PrivateRoute>} />
                </Route>
                <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

                {/* Catch-all route for 404 Not Found */}
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
        </BrowserRouter>
    );
}
