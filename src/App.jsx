import React from "react";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Home from "./pages/home/Home";
import Order from "./pages/order/Order";
import Cart from "./pages/cart/Cart";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NoPage from "./pages/nopage/NoPage";
import MyState from "./context/data/myState";
import Login from "./pages/registration/Login";
import Signup from "./pages/registration/Signup";
import ProductInfo from "./pages/productInfo/ProductInfo";
import AddProduct from "./pages/admin/dashboard/pages/AddProduct";
import UpdateProduct from "./pages/admin/dashboard/pages/UpdateProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllProduct from "./pages/allproducts/AllProduct";
function App() {
  return (
    <MyState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <Order />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRouteForAdmin>
                <Dashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/allproducts" element={<AllProduct />} />
          <Route path="/addproduct" element={<ProtectedRouteForAdmin>
               <AddProduct/>
              </ProtectedRouteForAdmin>} />
          <Route path="/updateproduct" element={<ProtectedRouteForAdmin>
                <UpdateProduct />
              </ProtectedRouteForAdmin>} />
          <Route path="/productInfo/:id" element={<ProductInfo />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <ToastContainer />
    </MyState>
  );
}

export default App;
export const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");
  if (user) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
export const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));
  if (admin?.user.email === "vanshchoubey100@gmail.com") {
    return children;
  } else {
  return <Navigate to ={"/"}/>
  }
};
