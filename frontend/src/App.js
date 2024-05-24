import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { AlertProvider } from "./context/AlertContext";
import Home from "./pages/Home";
import Requests from "./pages/Request";
import Employees from "./pages/Employess";
import Login from "./components/Auth/Login";
import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import Alert from "./utils/Alert";

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (roles && (!auth.user || roles.indexOf(auth.role) === -1)) {
    return <Navigate to="/" />;
  }

  return Component;
};

const AppContent = () => {
  const { auth } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen">
      {auth.isAuthenticated && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/requests"
            element={
              <PrivateRoute
                element={<Requests />}
                roles={["admin", "employee"]}
              />
            }
          />
          <Route
            path="/employees"
            element={
              <PrivateRoute element={<Employees />} roles={["admin", "employee"]} />
            }
          />
        </Routes>
      </main>
      {auth.isAuthenticated && <Footer />}
      <Alert/>
    </div>
  );
};

const App = () => {
  return (
    <AlertProvider>
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
    </AlertProvider>
  );
};

export default App;
