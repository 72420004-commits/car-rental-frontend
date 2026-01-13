import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import AboutUs from './pages/AboutUs';
import AvailableCars from './pages/AvailableCars';
import ContactUs from './pages/ContactUs';
import CarsList from "./pages/CarsList";
import Booking from "./pages/Booking";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCars from "./pages/AdminCars";
import AdminAddCar from "./pages/AdminAddCar";
import AdminUsers from "./pages/AdminUsers";
import AdminEditCar from "./pages/AdminEditCar";
import AdminBookings from "./pages/AdminBookings";
import UserDashboard from "./pages/UserDashboard";
import AdminReports from "./pages/AdminReports";
import AdminTrashCars from "./pages/AdminTrashCars";







function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/AvailableCars" element={<AvailableCars />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/carsList" element={<CarsList />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/cars" element={<AdminCars />} />
        <Route path="/admin/cars/add" element={<AdminAddCar />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/cars/edit/:id" element={<AdminEditCar />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/cars/trash" element={<AdminTrashCars />} />






      </Routes>
    </Router>
  );
}

export default App;
