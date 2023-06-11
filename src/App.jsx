import React, { lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import Users from "./pages/Users";
import { useAuthStore } from "./helpers/useAuthStore";

function App() {
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if ( status === 'checking') {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <main className="App  relative">
      <Routes>
        {
          (status === 'not-authenticated')
            ? (
                <>
                  {/* Login */}
                  <Route path="/auth/login" element={ <Login /> } />
                  <Route path="/*" element={<Navigate to="/auth/login" />} />
                </>
            )
            : (
                <>
                  <Route path="/*" element={<Layout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="*" element={<Navigate to="/404" />} />

                    {/* Nuevas Rutas */}
                    <Route path="usuarios" element={<Users />} />
                  </Route>

                </>
            )
        }
      </Routes>
    </main>
  );
}

export default App;
