import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import Scroll from "../Components/Scroll/Scroll";
import ScrollToTop from "react-scroll-to-top";

const Main = () => {
  return (
    <div className="max-w-[1280px] mx-auto ">
      <Navbar></Navbar>
      <Scroll></Scroll>
      <Outlet></Outlet>
      <ScrollToTop smooth />
      <Footer></Footer>
    </div>
  );
};

export default Main;
