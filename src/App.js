import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Navigate added for redirect
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProduct from "./Page/CreateProduct/CreateProduct";
import Login from "./components/Login/Login";
import Cookies from 'js-cookie';

const App = () => {
  const isAuthenticated = Cookies.get('token'); // Check if token exists in cookies

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Protected Dashboard Route */}
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}>
          {/* Nested route under dashboard */}
          <Route path="create-product" element={<CreateProduct />} />
        </Route>

        {/* Redirect to login if no token is found */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
