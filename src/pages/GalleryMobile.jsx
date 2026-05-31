import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── VIDEO CARDS ────────────────────────────────────────────
const CARDS = [
  { img: "/assets/YT1.jpg", title: "Raga Bhimpalasi",      ytId: "eBkjaI4xKws" },
  { img: "/assets/YT2.jpg", title: "Raga Todi",            ytId: "lLxwR76qgWc" },
  { img: "/assets/YT3.jpg", title: "Raga Kafi",            ytId: "1X_gCl0fdbw" },
  { img: "/assets/YT4.jpg", title: "Raga Bhairav",         ytId: "z6YQ6oldjwM" },
  { img: "/assets/T1.jpg",  title: "Raga Yaman Workshop",  ytId: null           },
  { img: "/assets/T2.jpg",  title: "Bhairavi Masterclass", ytId: null           },
  { img: "/assets/T3.jpg",  title: "Thumri & Dadra",       ytId: null           },
  { img: "/assets/T4.jpg",  title: "Sur & Laya Session",   ytId: null           },
];

// ── PHOTO CAROUSEL ─────────────────────────────────────────
const C_GAP = 8;
const CAROUSEL_IMGS = [
  { src: "/assets/AG1.jpg",  w: 110, h: 162 },
  { src: "/assets/AG3.jpg",  w: 148, h: 100 },
  { src: "/assets/AG5.jpg",  w: 110, h: 145 },
  { src: "/assets/AG2.jpeg", w: 155, h: 106 },
  { src: "/assets/GI1.jpeg", w: 110, h: 178 },
  { src: "/assets/AG4.jpg",  w: 135, h: 96  },
  { src: "/assets/AG6.jpg",  w: 110, h: 162 },
  { src: "/assets/GI2.jpeg", w: 152, h: 105 },
  { src: "/assets/AG7.jpg",  w: 110, h: 134 },
  { src: "/assets/T1.jpg",   w: 145, h: 100 },
];
const C_TRACK_W = CAROUSEL_IMGS.reduce((a, c) => a + c.w, 0)
                + CAROUSEL_IMGS.length * C_GAP;

// ── PLAY ICON ─────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
    <polygon points="5,2 18,10 5,18" fill="#c9a455" />
  </svg>
);

// ── MAIN ──────────────────────────────────────────────────
const GalleryMobile = () => {
  const [modal,       setModal]       = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(null);
  const CL = CAROUSEL_IMGS.length;

  return (
    <main className="md:hidden">

      {/* ── HEADER ── */}
      <motion.div
        className="pt-[72px] pb-4 px-6 relative z-10"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="h-[1px] w-8 bg-[#c9a455]" />
          <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
            Gallery
          </span>
        </div>
        <h1 className="font-cinzel font-semibold text-[1.8rem] text-[#f0e6d0] tracking-wider leading-tight mb-1">
          Moments in Music
        </h1>
        <p className="font-playfair italic text-[#c9a455]/60 text-[0.85rem]">
          Performances · Sessions · Recordings
        </p>
      </motion.div>

      {/* ── CENTRE IMAGE + VIDEO CAROUSEL OVERLAY ── */}
      <section className="relative">

        {/* Centre artist portrait */}
        <motion.div
          className="relative mt-[-20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <img
            src="/assets/centerImg.png"
            alt="Debapriya Adhikary"
            draggable={false}
            className="w-full object-contain object-top"
            style={{
              filter:          "sepia(0.18) brightness(0.65)",
              maskImage:       "radial-gradient(ellipse 80% 88% at 50% 42%, black 32%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 80% 88% at 50% 42%, black 32%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Video carousel — infinite auto-scroll at bottom of image */}
        <div
          className="absolute bottom-6 left-0 right-0 z-10 overflow-hidden"
          style={{
            maskImage:       "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          }}
        >
          <motion.div
            className="flex gap-3"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...CARDS, ...CARDS].map((card, i) => (
              <div
                key={i}
                className="flex-none cursor-pointer relative overflow-hidden"
                style={{
                  width:       "46vw",
                  aspectRatio: "16/9",
                  borderRadius:"6px",
                  border:      "1px solid rgba(201,164,85,0.38)",
                  boxShadow:   "0 12px 40px rgba(0,0,0,0.70)",
                }}
                onClick={() => setModal(CARDS[i % CARDS.length])}
              >
                <img
                  src={card.img} alt={card.title} draggable={false}
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.50) sepia(0.14)" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border border-[#c9a455]/70
                                  flex items-center justify-center pl-0.5
                                  bg-[#120a05]/55 backdrop-blur-sm">
                    <PlayIcon />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ── ENDING QUOTE ── */}
      <motion.div
        className="text-center px-6 pt-6 pb-8 max-w-[500px] mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] w-10 bg-[#c9a455]/35" />
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
                  fill="rgba(201,164,85,0.55)" />
          </svg>
          <div className="h-[1px] w-10 bg-[#c9a455]/35" />
        </div>
        <blockquote className="font-playfair italic text-[1.05rem] text-[#f0e6d0]/80 leading-[1.75] mb-4">
          "Music is not a performance — it is a conversation between the raga,
          the moment, and the listener."
        </blockquote>
        <p className="font-jost text-[9px] tracking-[0.45em] uppercase text-[#c9a455]/55">
          — Debapriya Adhikary
        </p>
      </motion.div>

      {/* ── INFINITE PHOTO CAROUSEL ── */}
      <div
        className="overflow-hidden mb-12"
        style={{
          maskImage:       "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <motion.div
          className="flex items-end"
          style={{ gap: C_GAP, width: "max-content" }}
          animate={{ x: [0, -C_TRACK_W] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        >
          {[...CAROUSEL_IMGS, ...CAROUSEL_IMGS].map((img, i) => (
            <div
              key={i}
              style={{ flexShrink: 0, cursor: "pointer" }}
              onClick={() => setCarouselIdx(i % CL)}
            >
              <img
                src={img.src} alt="" draggable={false}
                style={{
                  width:     img.w,
                  height:    img.h,
                  objectFit: "cover",
                  display:   "block",
                  border:    "1px solid rgba(201,164,85,0.22)",
                  filter:    "brightness(0.75) sepia(0.10)",
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── PHOTO LIGHTBOX ── */}
      <AnimatePresence>
        {carouselIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-[#0a0501]/94 backdrop-blur-[10px]"
                 onClick={() => setCarouselIdx(null)} />
            <div className="relative z-10 w-full">
              <img src={CAROUSEL_IMGS[carouselIdx].src} alt=""
                className="w-full max-h-[65vh] object-contain"
                style={{ border: "1px solid rgba(201,164,85,0.25)" }}
              />
              <div className="flex justify-between items-center mt-4">
                <button onClick={() => setCarouselIdx((carouselIdx - 1 + CL) % CL)}
                  className="w-10 h-10 border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]">‹</button>
                <button onClick={() => setCarouselIdx(null)}
                  className="font-jost text-[9px] tracking-[0.35em] uppercase text-[#b8966e]/50">Close ✕</button>
                <button onClick={() => setCarouselIdx((carouselIdx + 1) % CL)}
                  className="w-10 h-10 border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]">›</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIDEO MODAL ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="absolute inset-0 bg-[#0c0702]/90 backdrop-blur-[8px]"
                 onClick={() => setModal(null)} />
            <motion.div
              className="relative z-10 w-full"
              initial={{ scale: 0.91, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.91, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {modal.ytId ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${modal.ytId}?autoplay=1&rel=0&modestbranding=1`}
                    className="w-full h-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{ border: "1px solid rgba(201,164,85,0.22)" }}
                  />
                </div>
              ) : (
                <div className="aspect-video w-full flex items-center justify-center"
                     style={{ border: "1px solid rgba(201,164,85,0.20)", background: "rgba(12,7,2,0.75)" }}>
                  <p className="font-jost text-[#c9a455]/45 text-[10px] tracking-[0.4em] uppercase">Coming Soon</p>
                </div>
              )}
              <div className="mt-3 flex items-center justify-between">
                <p className="font-cinzel text-[0.75rem] tracking-wider text-[#f0e6d0]/70">{modal.title}</p>
                <button onClick={() => setModal(null)}
                  className="font-jost text-[9px] tracking-[0.35em] uppercase text-[#b8966e]/50">Close ✕</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default GalleryMobile;
