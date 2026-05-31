import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { FaVolumeUp, FaVolumeMute, FaWhatsapp } from "react-icons/fa";

const navLinks = [
  { title: "Home",    path: "/"        },
  { title: "About",   path: "/about"   },
  { title: "Learn",   path: "/learn"   },
  { title: "Gallery", path: "/gallery" },
];

const WA_NUMBER = "919038674555";

const NavbarMobile = () => {
  const [visible, setVisible]       = useState(true);
  const [scrolled, setScrolled]     = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [audioPlaying, setAudio]    = useState(false);
  const lastScrollY = useRef(0);
  const audioRef    = useRef(null);
  const location    = useLocation();

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastScrollY.current || y < 80);
      setScrolled(y > 60);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Close drawer on navigation
  useEffect(() => { setDrawerOpen(false); }, [location]);

  // Audio control
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.22;
    audioPlaying
      ? audioRef.current.play().catch(() => {})
      : audioRef.current.pause();
  }, [audioPlaying]);

  return (
    <>
      {/* ── TOP BAR ── */}
      <motion.nav
        className={`md:hidden fixed top-0 w-full z-50 ${scrolled ? "bg-[#120a05]/85 backdrop-blur-md" : ""}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: visible ? "0%" : "-100%" }}
        transition={{
          opacity: { duration: 0.8, delay: 0.2 },
          y: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
        }}
      >
        <div className="px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-cinzel text-[#c9a455] text-[11px] tracking-[0.35em] uppercase"
          >
            Debapriya
          </Link>

          {/* Right: audio + hamburger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setAudio(p => !p)}
              aria-label="Toggle audio"
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                audioPlaying
                  ? "border-[#c9a455] bg-[#c9a455] text-[#120a05]"
                  : "border-[#a08060]/50 text-[#b8966e]"
              }`}
            >
              {audioPlaying ? <FaVolumeUp className="text-[10px]" /> : <FaVolumeMute className="text-[10px]" />}
            </button>

            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="text-[#f0e6d0]/70"
            >
              <GiHamburgerMenu className="text-xl" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── REVEAL TAG (right side on mobile) ── */}
      <AnimatePresence>
        {!visible && (
          <motion.button
            className="md:hidden fixed top-0 right-4 z-[49] flex items-center gap-2 px-4 py-2
                       bg-[#120a05]/85 backdrop-blur-md
                       border-x border-b border-[#c9a455]/30 rounded-b-xl"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            onClick={() => setVisible(true)}
            aria-label="Show navigation"
          >
            <div className="flex flex-col gap-[4px]">
              <span className="block w-[14px] h-[1px] bg-[#c9a455]/70" />
              <span className="block w-[10px] h-[1px] bg-[#c9a455]/70" />
              <span className="block w-[14px] h-[1px] bg-[#c9a455]/70" />
            </div>
            <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/70">
              Menu
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <audio ref={audioRef} src="/assets/raushan.wav" loop preload="none" />

      {/* ── DRAWER ── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 bg-black/70 z-[60]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="md:hidden fixed right-0 top-0 h-full w-3/4 max-w-xs
                         bg-[#120a05] border-l border-[#c9a455]/20 z-[70]
                         p-8 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Close */}
              <button
                className="self-end text-[#f0e6d0]/50 hover:text-[#c9a455] transition-colors mb-12"
                onClick={() => setDrawerOpen(false)}
              >
                <IoClose className="text-2xl" />
              </button>

              {/* Nav links */}
              <ul className="flex flex-col gap-8">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
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

              {/* Bottom */}
              <div className="mt-auto">
                <div className="h-[1px] bg-gradient-to-r from-[#c9a455]/40 to-transparent mb-6" />
                <a
                  href={`https://wa.me/${WA_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 mb-5"
                >
                  <FaWhatsapp className="text-[#25D366] text-lg" />
                  <span className="font-jost text-[11px] tracking-[0.25em] uppercase text-[#f0e6d0]/60">
                    Connect
                  </span>
                </a>
                <p className="font-playfair italic text-[#b8966e] text-sm">
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

export default NavbarMobile;
