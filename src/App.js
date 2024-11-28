import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateProduct from "./Page/CreateProduct/CreateProduct";
import NotFound from "./Page/NotFound/NotFound";
import DashboardHome from "./components/Dashboard/DashboardHome";
import ProductsPage from "./Page/ProductsPage/ProductsPage";
import UpdateProduct from "./Page/UpdateProduct/UpdateProduct";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout Route */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Main Dashboard page */}
          <Route index element={<DashboardHome />} />

          {/* Create Product Page */}
          <Route path="create-product" element={<CreateProduct />} />
          {/* All Products Page */}
          <Route path="all-product" element={<ProductsPage />} />
          {/* Update Product Page (dynamic product id) */}
          <Route path="update-product/:id" element={<UpdateProduct />} />
        </Route>

        {/* Create Product Page (outside dashboard) */}
        <Route path="/create-product" element={<CreateProduct />} />
        {/* All Products Page (outside dashboard) */}
        <Route path="/all-product" element={<ProductsPage />} />
        {/* Update Product Page (outside dashboard) */}
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        
        {/* Fallback for Not Found Pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
