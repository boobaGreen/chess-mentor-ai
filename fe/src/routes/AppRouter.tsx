import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoginPage from "../pages/LoginPage";

// Pagine
import HomePage from "../pages/HomePage";
import PlayPage from "../pages/PlayPage";
import SandboxPage from "../pages/SandboxPage";
import DashboardPage from "../pages/DashboardPage";
import FriendsPage from "../pages/FriendPage";
import EventPage from "../pages/EventPage";
import WatchPage from "../pages/WatchPage";
import PuzzlePage from "../pages/PuzzlePage";
import NotFoundPage from "../pages/NotFoundPage";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Pagina di login pubblica */}
      <Route path="/login" element={<LoginPage />} />

      {/* Pagina home pubblica */}
      <Route path="/" element={<HomePage />} />

      {/* Rotte protette */}
      <Route
        path="/partita"
        element={
          <ProtectedRoute>
            <PlayPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sandbox"
        element={
          <ProtectedRoute>
            <SandboxPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/friends" element={<FriendsPage />} />
      <Route path="/events" element={<EventPage />} />
      <Route
        path="/tutor"
        element={
          <ProtectedRoute>
            <WatchPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/puzzle"
        element={
          <ProtectedRoute>
            <PuzzlePage />
          </ProtectedRoute>
        }
      />

      {/* Pagina 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
