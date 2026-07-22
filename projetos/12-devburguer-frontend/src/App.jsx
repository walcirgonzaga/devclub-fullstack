import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrar" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pedidos" element={<Orders />} />
        </Route>

        <Route element={<PrivateRoute apenasAdmin />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="produtos/novo" element={<AdminProductForm />} />
            <Route path="produtos/:id/editar" element={<AdminProductForm />} />
            <Route path="pedidos" element={<AdminOrders />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
