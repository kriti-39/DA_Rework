import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar       from "./components/Navbar/Navbar";
import NavbarMobile from "./components/Navbar/NavbarMobile";
import Footer       from "./components/Footer/Footer";
import FooterMobile from "./components/Footer/FooterMobile";
import Home from "./pages/Home";
import About       from "./pages/About";
import AboutMobile from "./pages/AboutMobile";
import Learn       from "./pages/Learn";
import LearnMobile from "./pages/LearnMobile";
import Gallery       from "./pages/Gallery";
import GalleryMobile from "./pages/GalleryMobile";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => {
  return (
    <Router>
      {/*
       * ── GLOBAL BACKGROUND ─────────────────────────────────────────────────
       * Single source of truth. Change texture or overlay here — nowhere else.
       * -z-10 keeps it permanently behind all content, regardless of stacking.
       */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src="/assets/h7.png"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.5 }}
        />
        {/* Dark overlay — adjust opacity here to lighten/darken globally */}
        <div className="absolute inset-0 bg-[#120a05]/55" />
      </div>

      <div className="relative">
        <ScrollToTop />
        <div className="hidden md:block"><Navbar /></div>
        <NavbarMobile />
        <Routes>
          <Route path="/"        element={<Home />}    />
          <Route path="/about"   element={<><div className="hidden md:block"><About /></div><AboutMobile /></>} />
          <Route path="/learn"   element={<><div className="hidden md:block"><Learn /></div><LearnMobile /></>} />
          <Route path="/gallery" element={<><div className="hidden md:block"><Gallery /></div><GalleryMobile /></>} />
        </Routes>
        <div className="hidden md:block"><Footer /></div>
        <FooterMobile />
      </div>
    </Router>
  );
};

export default App;
