import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Index from "./pages";
import About from "./pages/about";
import Services from "./pages/services";
import Cart from "./pages/cart";
import Dashboard from "./pages/users/dashboard";
import Profile from "./pages/users/Profile";
import AboutUser from "./pages/users/AboutUser";
import { Navbar } from "react-bootstrap";
import CustomNavbar from "./components/Navbar";
function App() {
  return (
    // setting up routes

    <BrowserRouter>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/users" element={<Dashboard />}>
          <Route path="profile" element={<Profile />} />
          <Route path="about" element={<AboutUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
