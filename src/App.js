import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProduct from "./Page/CreateProduct/CreateProduct";
import NotFound from "./Page/NotFound/NotFound";


const App = () => {
  return (
    <Router>
    <Routes>
      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard Layout Route */}
      <Route path="/dashboard" element={<Dashboard />}>
        {/* Other Dashboard pages */}
        <Route path="create-product" element={<CreateProduct />} />
      </Route>

      {/* Create Product Page (Not under Dashboard layout) */}
      <Route path="/create-product" element={<CreateProduct />} />

      {/* Fallback for Not Found Pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  );
};

export default App;
