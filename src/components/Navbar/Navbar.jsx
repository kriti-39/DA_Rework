import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaVolumeUp, FaVolumeMute, FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { title: "Home",    path: "/",        hash: "" },
  { title: "About",   path: "/about",   hash: "" },
  { title: "Learn",   path: "/learn",   hash: "" },
  { title: "Gallery", path: "/gallery", hash: "" },
];

const WA_NUMBER = "919999999999"; // ← replace with actual WhatsApp number

const Navbar = () => {
  const [visible, setVisible]           = useState(true);
  const [scrolled, setScrolled]         = useState(false);
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const lastScrollY = useRef(0);          // ref avoids stale-closure bug
  const audioRef    = useRef(null);
  const location    = useLocation();

  // ── SCROLL: hide on scroll down, reveal on scroll up ──────────────────
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const goingDown = y > lastScrollY.current;
      setVisible(!goingDown || y < 80);   // always visible near the top
      setScrolled(y > 60);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // empty deps — no re-registration on every scroll

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.22;
    audioPlaying
      ? audioRef.current.play().catch(() => {})
      : audioRef.current.pause();
  }, [audioPlaying]);

  return (
    <>
      {/* ── NAVBAR ────────────────────────────────────────────────────── */}
      <motion.nav
        className={`fixed top-0 w-full z-50 ${scrolled ? "bg-[#120a05]/80 backdrop-blur-md" : ""}`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: visible ? "0%" : "-100%",
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.2 },
          y: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        <div className="px-8 md:px-16 lg:px-24 py-5 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="font-cinzel text-[#c9a455] text-sm tracking-[0.35em] uppercase hover:text-[#e8c97a] transition-colors duration-300"
          >
            Debapriya
          </Link>

          {/* Desktop: nav links + audio */}
          <div className="hidden md:flex items-center gap-10">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => {
                const isActive = link.hash
                  ? location.pathname === "/learn" && location.hash === link.hash
                  : location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`font-jost text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 relative group ${
                        isActive ? "text-[#c9a455]" : "text-[#f0e6d0]/60 hover:text-[#f0e6d0]"
                      }`}
                    >
                      {link.title}
                      <span
                        className={`absolute -bottom-1 left-0 h-[1px] bg-[#c9a455] transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* WhatsApp — Connect */}
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group"
              aria-label="Connect on WhatsApp"
            >
              <FaWhatsapp className="text-[15px] text-[#25D366] group-hover:scale-110 transition-transform duration-300" />
              <span className="font-jost text-[11px] tracking-[0.2em] uppercase text-[#f0e6d0]/60 group-hover:text-[#f0e6d0] transition-colors duration-300 relative">
                Connect
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#c9a455] group-hover:w-full transition-all duration-300" />
              </span>
            </a>

            <div className="w-[1px] h-4 bg-[#c9a455]/50" />

            {/* Audio toggle */}
            <button
              onClick={() => setAudioPlaying((p) => !p)}
              className="flex items-center gap-2 group"
              aria-label="Toggle background audio"
            >
              <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-400 ${
                audioPlaying
                  ? "border-[#c9a455] bg-[#c9a455] text-[#120a05]"
                  : "border-[#a08060]/50 text-[#a08060] group-hover:border-[#c9a455] group-hover:text-[#c9a455]"
              }`}>
                {audioPlaying
                  ? <FaVolumeUp  className="text-[10px]" />
                  : <FaVolumeMute className="text-[10px]" />
                }
              </div>
              <span className="font-jost text-[10px] tracking-[0.2em] uppercase text-[#a08060] group-hover:text-[#c9a455] transition-colors duration-300">
                {audioPlaying ? "Pause" : "Listen"}
              </span>
            </button>
          </div>

          {/* Mobile: audio + hamburger */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setAudioPlaying((p) => !p)}
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                audioPlaying
                  ? "border-[#c9a455] bg-[#c9a455] text-[#120a05]"
                  : "border-[#a08060]/50 text-[#a08060]"
              }`}
              aria-label="Toggle audio"
            >
              {audioPlaying
                ? <FaVolumeUp  className="text-[10px]" />
                : <FaVolumeMute className="text-[10px]" />
              }
            </button>
            <button
              className="text-[#f0e6d0]/70 hover:text-[#c9a455] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <GiHamburgerMenu className="text-xl" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── REVEAL TAG — appears at top-left when navbar is hidden ────────── */}
      <AnimatePresence>
        {!visible && (
          <motion.button
            className="fixed top-0 left-10 z-[49] flex items-center gap-2.5 px-5 py-2.5
                       bg-[#120a05]/85 backdrop-blur-md
                       border-x border-b border-[#c9a455]/30
                       rounded-b-xl
                       hover:border-[#c9a455]/60 transition-colors duration-300 group"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => setVisible(true)}
            aria-label="Show navigation"
          >
            {/* Three lines (hamburger icon in gold) */}
            <div className="flex flex-col gap-[4px]">
              <span className="block w-[14px] h-[1px] bg-[#c9a455]/60 group-hover:bg-[#c9a455] transition-colors duration-300" />
              <span className="block w-[10px] h-[1px] bg-[#c9a455]/60 group-hover:bg-[#c9a455] transition-colors duration-300" />
              <span className="block w-[14px] h-[1px] bg-[#c9a455]/60 group-hover:bg-[#c9a455] transition-colors duration-300" />
            </div>
            <span className="font-jost text-[9px] tracking-[0.35em] uppercase text-[#c9a455]/60 group-hover:text-[#c9a455] transition-colors duration-300">
              Menu
            </span>
            {/* Down chevron */}
            <svg width="8" height="5" viewBox="0 0 8 5" fill="none" className="opacity-50 group-hover:opacity-100 transition-opacity">
              <path d="M1 1L4 4L7 1" stroke="#c9a455" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="/assets/bgaudio.mp3" loop preload="none" />

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 h-full w-3/4 max-w-xs bg-[#120a05] border-l border-[#c9a455]/20 z-[70] p-8 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            >
              <button
                className="self-end text-[#f0e6d0]/50 hover:text-[#c9a455] transition-colors mb-12"
                onClick={() => setMobileOpen(false)}
              >
                <IoClose className="text-2xl" />
              </button>

              <ul className="flex flex-col gap-8">
                {navLinks.map((link, i) => {
                  const isActive = link.hash
                    ? location.pathname === "/learn" && location.hash === link.hash
                    : location.pathname === link.path;
                  return (
                    <motion.li
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.07 }}
                    >
                      <Link
                        to={link.path}
                        className={`font-cinzel text-base tracking-widest transition-colors ${
                          isActive ? "text-[#c9a455]" : "text-[#f0e6d0]/70 hover:text-[#c9a455]"
                        }`}
                      >
                        {link.title}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-auto">
                <div className="h-[1px] bg-gradient-to-r from-[#c9a455]/40 to-transparent mb-6" />
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 mb-5 group"
                >
                  <FaWhatsapp className="text-[#25D366] text-lg" />
                  <span className="font-jost text-[11px] tracking-[0.25em] uppercase text-[#f0e6d0]/60 group-hover:text-[#c9a455] transition-colors duration-300">
                    Connect
                  </span>
                </a>
                <p className="font-playfair italic text-[#a08060] text-sm">
                  Hindustani Classical Vocalist
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
