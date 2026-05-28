import { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// ── PLAY ICON ─────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <polygon points="6,4 20,11 6,18" fill="#c9a455" />
  </svg>
);

// ── MEDIA — big cards, bold layout ───────────────────────
const MEDIA = [
  {
    src: "/assets/DSC05188.JPG.jpeg",
    type: "img",
    caption: "On Stage · Mumbai",
    w: 320, h: 428, rot: -8, depth: 0.028,
  },
  {
    src: "/assets/YT1.jpg",
    type: "video",
    url: "https://youtu.be/eBkjaI4xKws?si=c1gSfrvpS2fp_6MF",
    caption: "Raga Bhimpalasi",
    w: 460, h: 258, rot: 11, depth: 0.022,
  },
  {
    src: "/assets/DSC05244.JPG.jpeg",
    type: "img",
    caption: "Riyaz Session · Kolkata",
    w: 305, h: 408, rot: -14, depth: 0.036,
  },
  {
    src: "/assets/YT2.jpg",
    type: "video",
    url: "https://youtu.be/lLxwR76qgWc?si=sUUmdwuxIhIt0qmo",
    caption: "Raga Todi",
    w: 450, h: 253, rot: 6, depth: 0.024,
  },
  {
    src: "/assets/IMG_0369.JPG.jpeg",
    type: "img",
    caption: "Backstage · Varanasi",
    w: 314, h: 420, rot: 15, depth: 0.030,
  },
  {
    src: "/assets/YT3.jpg",
    type: "video",
    url: "https://youtu.be/1X_gCl0fdbw?si=Ea8F2PqNCCTYraZi",
    caption: "Raga Kafi",
    w: 440, h: 247, rot: -7, depth: 0.034,
  },
  {
    src: "/assets/T1.jpg",
    type: "img",
    caption: "Raga Yaman Workshop",
    w: 295, h: 394, rot: -18, depth: 0.020,
  },
  {
    src: "/assets/YT4.jpg",
    type: "video",
    url: "https://youtu.be/z6YQ6oldjwM?si=ysW-LKXwHut5qzDq",
    caption: "Raga Bhairav",
    w: 455, h: 256, rot: 9, depth: 0.032,
  },
];

// Spiral positions — px offset from center point (50%, 52%) of canvas
// Designed for 1440px wide: outer cards extend partially off-screen edges
const POSITIONS = [
  { x: -640, y: -115 },  // portrait  — left (≈80px off screen left)
  { x: -145, y: -290 },  // landscape — upper-left
  { x:  295, y: -270 },  // portrait  — upper-right
  { x:  660, y:  -48 },  // landscape — right (≈165px off screen right)
  { x:  598, y:  225 },  // portrait  — lower-right (≈40px off right)
  { x:   48, y:  335 },  // landscape — lower-center
  { x: -370, y:  298 },  // portrait  — lower-left
  { x: -645, y:  112 },  // landscape — left-lower (≈150px off screen left)
];

// ── SPIRAL CARD ───────────────────────────────────────────
const SpiralCard = ({ item, pos, index, smoothX, smoothY, onImageClick }) => {
  const [hov, setHov] = useState(false);

  // Parallax: card drifts opposite to cursor; outer cards drift more
  const pX = useTransform(smoothX, v => -v * item.depth);
  const pY = useTransform(smoothY, v => -v * item.depth);

  const handleClick = () => {
    if (item.type === "video") {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      onImageClick(index);
    }
  };

  return (
    // CSS wrapper — places card center at the spiral position
    <div
      className="absolute select-none"
      style={{
        left: `calc(50% + ${pos.x}px)`,
        top:  `calc(52% + ${pos.y}px)`,
        transform: "translate(-50%, -50%)",
        width: item.w,
        zIndex: hov ? 20 : 4,
      }}
    >
      {/* ① Parallax + rotation layer */}
      <motion.div style={{ x: pX, y: pY, rotate: item.rot }}>

        {/* ② Entry fade-in + hover scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.6 + index * 0.11,
          }}
          whileHover={{ scale: 1.05 }}
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          {/* ③ Subtle float bob — each card on its own timing */}
          <motion.div
            animate={{ y: [0, -7, 0, 5, 0] }}
            transition={{
              duration: 5 + index * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.42,
              repeatType: "loop",
            }}
          >
            {/* ── Card ── */}
            <div
              style={{
                height: item.h,
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                border: `1.5px solid ${
                  hov ? "rgba(201,164,85,0.65)" : "rgba(201,164,85,0.14)"
                }`,
                boxShadow: hov
                  ? "0 28px 80px rgba(201,164,85,0.20), 0 10px 32px rgba(0,0,0,0.70)"
                  : "0 12px 48px rgba(0,0,0,0.65)",
                transition: "border-color 0.35s ease, box-shadow 0.45s ease",
              }}
            >
              <img
                src={item.src}
                alt={item.caption}
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: hov
                    ? "brightness(0.90)"
                    : "brightness(0.62) sepia(0.12)",
                  transform: hov ? "scale(1.06)" : "scale(1.01)",
                  transition: "filter 0.4s ease, transform 0.55s ease",
                }}
              />

              {/* Video: play overlay */}
              {item.type === "video" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: hov
                      ? "rgba(18,10,5,0.38)"
                      : "rgba(18,10,5,0.14)",
                    borderRadius: 20,
                    transition: "background 0.35s ease",
                  }}
                >
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(201,164,85,0.90)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(18,10,5,0.52)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      opacity: hov ? 1 : 0.70,
                      transform: hov ? "scale(1.10)" : "scale(1)",
                      transition: "opacity 0.3s ease, transform 0.3s ease",
                    }}
                  >
                    <PlayIcon />
                  </div>
                </div>
              )}
            </div>

            {/* Caption — slides up on hover */}
            <AnimatePresence>
              {hov && (
                <motion.p
                  className="font-jost text-center text-[#c9a455]/72"
                  style={{
                    marginTop: 10,
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                  }}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.22 }}
                >
                  {item.caption}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ── LIGHTBOX ──────────────────────────────────────────────
const Lightbox = ({ index, onClose }) => {
  const [curr, setCurr] = useState(index);
  const total = MEDIA.length;
  const go = dir => setCurr(i => (i + dir + total) % total);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 bg-[#0c0702]/92 backdrop-blur-[10px]"
        onClick={onClose}
      />

      <motion.div
        className="relative z-10 flex items-center gap-6"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.93,    opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => go(-1)}
          className="flex-none w-11 h-11 rounded-full border border-[#c9a455]/40
                     flex items-center justify-center text-[#c9a455] text-lg
                     hover:border-[#c9a455] hover:bg-[#c9a455]/10 transition-all duration-300"
        >←</button>

        <div className="w-[55vw] max-w-[760px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={curr}
              initial={{ opacity: 0, x: 22 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -22 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={MEDIA[curr].src}
                alt={MEDIA[curr].caption}
                className="w-full max-h-[68vh] object-contain"
                style={{ borderRadius: 12, border: "1px solid rgba(201,164,85,0.22)" }}
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/65">
                  {MEDIA[curr].caption}
                </p>
                <p className="font-jost text-[9px] tracking-[0.2em] text-[#a08060]/40">
                  {curr + 1} / {total}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={() => go(1)}
          className="flex-none w-11 h-11 rounded-full border border-[#c9a455]/40
                     flex items-center justify-center text-[#c9a455] text-lg
                     hover:border-[#c9a455] hover:bg-[#c9a455]/10 transition-all duration-300"
        >→</button>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-7 right-8 z-10 font-jost text-[9px]
                   tracking-[0.35em] uppercase text-[#a08060]/50
                   hover:text-[#c9a455] transition-colors duration-300"
      >
        Close ✕
      </button>
    </motion.div>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────
const GallerySpiral = () => {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Mouse tracking — origin at canvas center
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 48, damping: 18 });
  const smoothY = useSpring(rawY, { stiffness: 48, damping: 18 });

  const onMouseMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(e.clientX - r.left  - r.width  / 2);
    rawY.set(e.clientY - r.top   - r.height / 2);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    // Fixed-height canvas — fills viewport below navbar, never scrolls
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >

      {/* ── PAGE HEADER ─────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-30 pt-9 flex flex-col items-center pointer-events-none"
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4 mb-2.5">
          <div className="h-[1px] w-10 bg-[#c9a455]" />
          <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
            Gallery
          </span>
          <div className="h-[1px] w-10 bg-[#c9a455]" />
        </div>
        <h1 className="font-cinzel text-[1.9rem] md:text-[2.6rem] text-[#f0e6d0] tracking-wider leading-none mb-2">
          Moments in Music
        </h1>
        <p className="font-playfair italic text-[#a08060] text-[0.95rem]">
          On stage, behind the lens, and in the stillness between notes.
        </p>
      </motion.div>

      {/* ── WARM RADIAL GLOW ────────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%", top: "52%",
          transform: "translate(-50%, -50%)",
          width: 520, height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,164,85,0.06) 0%, transparent 68%)",
          zIndex: 2,
        }}
      />

      {/* ── CENTER ARTIST IMAGE ──────────────────────────── */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%", top: "52%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <motion.img
            src="/assets/centerImg.png"
            alt="Debapriya Adhikary"
            draggable={false}
            animate={{ y: [0, -7, 0, 4, 0] }}
            transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 420,
              objectFit: "contain",
              filter: "drop-shadow(0 24px 80px rgba(201,164,85,0.16))",
              maskImage:
                "radial-gradient(ellipse 70% 86% at 50% 50%, black 36%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 86% at 50% 50%, black 36%, transparent 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* ── SPIRAL CARDS ──────────────────────────────────── */}
      {MEDIA.map((item, i) => (
        <SpiralCard
          key={i}
          item={item}
          pos={POSITIONS[i]}
          index={i}
          smoothX={smoothX}
          smoothY={smoothY}
          onImageClick={setLightboxIdx}
        />
      ))}

      {/* ── LIGHTBOX ─────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox index={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default GallerySpiral;
