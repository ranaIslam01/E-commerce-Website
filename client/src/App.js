import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { DarkModeProvider } from './context/DarkModeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import WishlistPage from './pages/WishlistPage';
import ProtectedRoute from './components/ProtectedRoute';
import ShippingAddressPage from './pages/ShippingAddressPage';
import PaymentMethodPage from './pages/PaymentMethodPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import OrderPage from './pages/OrderPage';
import MyOrdersPage from './pages/MyOrdersPage';

function App() {
  return (
    <DarkModeProvider>
      <WishlistProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main className="flex-grow pt-20">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/shipping" element={<ShippingAddressPage />} />
                  <Route path="/payment" element={<PaymentMethodPage />} />
                  <Route path="/placeorder" element={<PlaceOrderPage />} />
                  <Route path="/order/:id" element={<OrderPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/myorders" element={<MyOrdersPage />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WishlistProvider>
    </DarkModeProvider>
  );
}

export default App;
