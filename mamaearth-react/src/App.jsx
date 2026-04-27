import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import Otp from './pages/Otp';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddProducts from './pages/AddProducts';
import ManageProducts from './pages/ManageProducts';
import UpdateProduct from './pages/UpdateProduct';
import ProductDetails from './pages/productDetailes';
import ProductCart from './pages/cart';
import Order from './pages/Order';
import Payment from './pages/payment';
import Address from './pages/Address';
import ManageOrders from './pages/ManageOrder';
import EditOrder from './pages/EditOrder';
import SearchResults from "./pages/SearchResults";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Yorder from "./pages/Yorder";



import { Routes, Route, BrowserRouter } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function App() {
  return (
    <BrowserRouter>
  <Routes>
        <Route path="/" element={
          <>
          <Navbar />
          <Home /> 
          <Footer /> 
          </>
        }/>

        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/manage-products" element={<ManageProducts />} />
        <Route path="/update-products/:id" element={<UpdateProduct />}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<ProductCart />} />
        <Route path="/Order" element={<Order />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/address" element={<Address />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
        <Route path="/edit-order/:id" element={<EditOrder />} />
        {/*<Route path="/search/:query" element={<SearchResults />} />*/}
        <Route
  path="/search/:query"
  element={
    <>
      <SearchResults />
      <Footer />
    </>
  }
/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/yorder" element={<Yorder />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;