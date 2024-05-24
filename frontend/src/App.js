import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Home from "./pages/Home";
import Requests from "./pages/Request";
import Employees from "./pages/Employess";
import Login from "./components/Auth/Login";

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

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
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
            element={<PrivateRoute element={<Employees />} roles={["admin", "employee"]} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
