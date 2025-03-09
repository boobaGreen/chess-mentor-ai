import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Corretto: contexts con s
import AppRouter from "./routes/AppRouter"; // CORRETTO: matching import name with component name
import MainLayout from "./components/layout/MainLayout";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MainLayout>
          <AppRouter />
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
