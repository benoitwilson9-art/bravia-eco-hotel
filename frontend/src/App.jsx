import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import RoomsList from "./pages/RoomsList";
import RoomDetail from "./pages/RoomDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ReservationForm from "./pages/ReservationForm";
import MyReservations from "./pages/MyReservations";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chambres" element={<RoomsList />} />
        <Route path="/chambres/:id" element={<RoomDetail />} />
        <Route path="/connexion" element={<Login />} />
        <Route path="/inscription" element={<Register />} />
        <Route
          path="/reservation/:roomId"
          element={
            <PrivateRoute>
              <ReservationForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/mes-reservations"
          element={
            <PrivateRoute>
              <MyReservations />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute adminOnly>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;