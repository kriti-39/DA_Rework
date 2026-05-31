import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

// ── IMAGE SOURCES ─────────────────────────────────────────
const SRCS = [
  { src: "/assets/DSC05188.JPG.jpeg", caption: "On Stage · Mumbai"       },
  { src: "/assets/DSC05244.JPG.jpeg", caption: "Riyaz Session · Kolkata" },
  { src: "/assets/IMG_0369.JPG.jpeg", caption: "Backstage · Varanasi"    },
  { src: "/assets/h3.png",            caption: "Concert · New Delhi"      },
  { src: "/assets/h6.png",            caption: "Studio · Pune"            },
  { src: "/assets/YT1.jpg",           caption: "Live Performance"          },
  { src: "/assets/YT2.jpg",           caption: "Raga Recording"            },
  { src: "/assets/YT3.jpg",           caption: "Workshop Session"          },
];

// ── LAYOUT CONSTANTS ──────────────────────────────────────
const PW = 118;  // portrait card width
const LW = 160;  // landscape card width  (3 × LW + 2 × 9 ≈ 4 × PW + 3 × 9)
const G  = 9;    // gap between cards

// ── LAYOUT CONFIG — idx references SRCS (duplicates ok) ──
const LEFT = {
  // jagged top — bottom edges aligned, heights vary
  row1: [
    { idx: 0, w: PW, h: 215 },
    { idx: 1, w: PW, h: 162 },
    { idx: 2, w: PW, h: 195 },
    { idx: 3, w: PW, h: 145 },
  ],
  // three horizontal frames
  row2: [
    { idx: 5, w: LW, h: 108 },
    { idx: 6, w: LW, h: 108 },
    { idx: 7, w: LW, h: 108 },
  ],
  // jagged bottom — top edges aligned, heights vary
  row3: [
    { idx: 3, w: PW, h: 148 },
    { idx: 0, w: PW, h: 202 },
    { idx: 1, w: PW, h: 172 },
    { idx: 2, w: PW, h: 190 },
  ],
};

const RIGHT = {
  row1: [
    { idx: 4, w: PW, h: 150 },
    { idx: 5, w: PW, h: 210 },
    { idx: 6, w: PW, h: 170 },
    { idx: 7, w: PW, h: 198 },
  ],
  row2: [
    { idx: 0, w: LW, h: 108 },
    { idx: 2, w: LW, h: 108 },
    { idx: 4, w: LW, h: 108 },
  ],
  row3: [
    { idx: 5, w: PW, h: 200 },
    { idx: 6, w: PW, h: 158 },
    { idx: 7, w: PW, h: 195 },
    { idx: 4, w: PW, h: 165 },
  ],
};

// ── PHOTO CARD ────────────────────────────────────────────
const PhotoCard = ({ idx, w, h, onOpen }) => {
  const [hov, setHov] = useState(false);
  const img = SRCS[idx];

  return (
    <motion.div
      className="cursor-pointer relative flex-none"
      style={{ width: w, height: h }}
      animate={{ scale: hov ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(idx)}
    >
      <div
        className="w-full h-full overflow-hidden"
        style={{
          borderRadius: "4px",
          border: hov
            ? "1.5px solid rgba(201,164,85,0.75)"
            : "1.5px solid rgba(201,164,85,0.20)",
          transition: "border-color 0.3s ease",
          boxShadow: hov
            ? "0 12px 40px rgba(201,164,85,0.22)"
            : "0 5px 22px rgba(0,0,0,0.48)",
        }}
      >
        <img
          src={img.src}
          alt={img.caption}
          draggable={false}
          className="w-full h-full object-cover"
          style={{
            filter: hov
              ? "brightness(0.88) sepia(0.04)"
              : "brightness(0.62) sepia(0.15)",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "filter 0.4s ease, transform 0.5s ease",
          }}
        />
      </div>

    </motion.div>
  );
};

// ── ROW RENDERER ──────────────────────────────────────────
const Row = ({ cards, align = "stretch", onOpen }) => (
  <div className="flex" style={{ gap: G, alignItems: align }}>
    {cards.map((c, i) => (
      <PhotoCard key={i} idx={c.idx} w={c.w} h={c.h} onOpen={onOpen} />
    ))}
  </div>
);

// ── SLIDER ────────────────────────────────────────────────
const Slider = ({ startIndex, onClose }) => {
  const [curr, setCurr] = useState(startIndex);
  const total = SRCS.length;
  const go = (dir) => setCurr(i => (i + dir + total) % total);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 bg-[#0c0702]/84 backdrop-blur-[7px]" onClick={onClose} />
      <motion.div
        className="relative z-10 flex items-center gap-5"
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={() => go(-1)}
          className="flex-none w-10 h-10 rounded-full border border-[#c9a455]/40
                     flex items-center justify-center text-[#c9a455] text-lg
                     hover:border-[#c9a455] hover:bg-[#c9a455]/10 transition-all duration-300"
        >←</button>

        <div className="w-[58vw] max-w-[800px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={curr}
              initial={{ opacity: 0, x: 26 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -26 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={SRCS[curr].src} alt={SRCS[curr].caption}
                className="w-full max-h-[65vh] object-contain"
                style={{ border: "1px solid rgba(201,164,85,0.22)" }}
              />
              <div className="mt-4 flex items-center justify-between px-0.5">
                <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/65">
                  {SRCS[curr].caption}
                </p>
                <p className="font-jost text-[9px] tracking-[0.2em] text-[#b8966e]/40">
                  {curr + 1} / {total}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button onClick={() => go(1)}
          className="flex-none w-10 h-10 rounded-full border border-[#c9a455]/40
                     flex items-center justify-center text-[#c9a455] text-lg
                     hover:border-[#c9a455] hover:bg-[#c9a455]/10 transition-all duration-300"
        >→</button>
      </motion.div>

      <button onClick={onClose}
        className="absolute top-7 right-8 z-10 font-jost text-[9px]
                   tracking-[0.35em] uppercase text-[#b8966e]/50
                   hover:text-[#c9a455] transition-colors duration-300"
      >Close ✕</button>
    </motion.div>
  );
};

// ── MAIN ─────────────────────────────────────────────────
const GalleryTeaser = () => {
  const [sliderIdx, setSliderIdx] = useState(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.1]);
  const imgScale = useSpring(rawScale, { stiffness: 40, damping: 20 });

  return (
    <section ref={sectionRef} className="relative py-14 md:mt-[-70px] md:pb-20">

      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-10 bg-[#c9a455]" />
          <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">Gallery</span>
          <div className="h-[1px] w-10 bg-[#c9a455]" />
        </div>
        <h2 className="font-cinzel text-[2rem] md:text-[2.8rem] text-[#f0e6d0] tracking-wider leading-none mb-4">
          Moments in Music
        </h2>
        <p className="font-playfair italic text-[#b8966e] text-[1rem] md:text-[1.1rem] leading-relaxed">
          On stage, behind the lens, and in the stillness between notes.
        </p>
      </motion.div>

      {/* ── GALLERY ── */}
      <div className="flex items-center justify-center gap-6 px-4">

        {/* LEFT — 3 rows */}
        <div className="flex flex-col flex-none" style={{ gap: G + 3 }}>
          <Row cards={LEFT.row1} align="flex-end"   onOpen={setSliderIdx} />
          <Row cards={LEFT.row2} align="stretch"    onOpen={setSliderIdx} />
          <Row cards={LEFT.row3} align="flex-start" onOpen={setSliderIdx} />
        </div>

        {/* CENTER — artist */}
        <div className="flex-none pointer-events-none">
          <motion.img
            src="/assets/centerImg.png"
            alt="Debapriya Adhikary"
            draggable={false}
            style={{
              width: 410,
              objectFit: "contain",
              scale: imgScale,
              transformOrigin: "center center",
              filter: "drop-shadow(0 24px 64px rgba(201,164,85,0.14))",
              maskImage: "radial-gradient(ellipse 72% 88% at 50% 50%, black 35%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 72% 88% at 50% 50%, black 35%, transparent 100%)",
            }}
          />
        </div>

        {/* RIGHT — 3 rows */}
        <div className="flex flex-col flex-none" style={{ gap: G + 3 }}>
          <Row cards={RIGHT.row1} align="flex-end"   onOpen={setSliderIdx} />
          <Row cards={RIGHT.row2} align="stretch"    onOpen={setSliderIdx} />
          <Row cards={RIGHT.row3} align="flex-start" onOpen={setSliderIdx} />
        </div>

      </div>

      {/* CTA */}
      <motion.div
        className="text-center mt-16"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        <Link
          to="/gallery"
          className="inline-flex items-center gap-3 font-jost text-[10px]
                     tracking-[0.3em] uppercase text-[#c9a455]
                     border border-[#c9a455]/40 px-6 py-3
                     hover:border-[#c9a455] hover:bg-[#c9a455]/5
                     transition-all duration-300 group"
        >
          View Full Gallery
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </motion.div>

      {/* Slider */}
      <AnimatePresence>
        {sliderIdx !== null && (
          <Slider startIndex={sliderIdx} onClose={() => setSliderIdx(null)} />
        )}
      </AnimatePresence>

    </section>
  );
};

export default GalleryTeaser;
