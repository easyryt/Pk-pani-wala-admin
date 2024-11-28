import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProduct from "./Page/CreateProduct/CreateProduct";
import NotFound from "./Page/NotFound/NotFound";
import DashboardHome from "./components/Dashboard/DashboardHome";
import ProductsPage from "./Page/ProductsPage/ProductsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout Route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Main Dashboard page, this will be rendered for /dashboard */}
          <Route index element={<DashboardHome />} />

          {/* Create Product Page */}
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="all-product" element={<ProductsPage />} />
        </Route>

        {/* Create Product Page */}
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/all-product" element={<ProductsPage />} />

        {/* Fallback for Not Found Pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
