import Navbar from "./../components/Navbar/Navbar";
import Footer from "./../components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />

      <div className="container w-full mx-auto  min-h-screen">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
