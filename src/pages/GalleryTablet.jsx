import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── TABLET PORTRAIT rendering of the Gallery page ──
// Desktop Gallery.jsx is a scroll-pinned 3D cylinder (mouse-scroll driven),
// awkward on touch. Rebuilt here as a single-column page: a video grid, the
// closing quote, and an auto-scrolling photo strip with a lightbox.
// Desktop/landscape use Gallery.jsx; phones use GalleryMobile.jsx.

const CARDS = [
  { img: "/assets/GP1.jpg", title: "Raga Marwa — Live",              ytId: "xUUH27-Nmek" },
  { img: "/assets/GP2.jpg", title: "Music Within You · Podcast 9",   ytId: "GAtaKM5cdls" },
  { img: "/assets/GP3.jpg", title: "Raag Narayani — Live",           ytId: "eXJqciLgiN4" },
  { img: "/assets/GP4.jpg", title: "Nayaki Kanada & Bhairavi Tappa", ytId: "5moZaklCqsM" },
  { img: "/assets/GP5.jpg", title: "Appaji Teaching — Girija Devi",  ytId: "EpOBt_Rubfk" },
  { img: "/assets/GP6.jpg", title: "Meera Bhajan — St. Petersburg",  ytId: "Q1fFddUjgtY" },
  { img: "/assets/GP7.jpg", title: "Dadra — Live",                   ytId: "sHIBUEBKgR4" },
];

const C_GAP = 12;
const CAROUSEL_IMGS = [
  { src: "/assets/AG7.jpg",   w: 148, h: 218 },
  { src: "/assets/AG5.jpg",   w: 200, h: 136 },
  { src: "/assets/AG2.jpeg",  w: 148, h: 195 },
  { src: "/assets/AG1.jpg",   w: 212, h: 146 },
  { src: "/assets/GI1.jpeg",  w: 148, h: 240 },
  { src: "/assets/T1.jpg",    w: 182, h: 130 },
  { src: "/assets/new1.jpeg", w: 148, h: 218 },
  { src: "/assets/GP1.jpg",   w: 205, h: 142 },
  { src: "/assets/vertical.jpeg", w: 148, h: 180 },
  { src: "/assets/concert.jpeg",  w: 196, h: 136 },
  { src: "/assets/AG4.jpg",    w: 148, h: 220 },
  { src: "/assets/T3.jpg",     w: 208, h: 148 },
  { src: "/assets/girija.png", w: 148, h: 196 },
  { src: "/assets/DS1.jpg",    w: 206, h: 138 },
  { src: "/assets/new21.jpeg", w: 148, h: 222 },
  { src: "/assets/hv6.jpg",    w: 192, h: 144 },
  { src: "/assets/new23.jpeg", w: 148, h: 210 },
  { src: "/assets/new11.jpeg", w: 208, h: 138 },
  { src: "/assets/new25.jpeg", w: 148, h: 236 },
  { src: "/assets/new12.png",  w: 214, h: 136 },
  { src: "/assets/v2.jpeg",    w: 148, h: 218 },
  { src: "/assets/new14.jpeg", w: 206, h: 138 },
  { src: "/assets/v4.jpeg",    w: 148, h: 218 },
  { src: "/assets/new15.jpeg", w: 190, h: 144 },
  { src: "/assets/new17.jpeg", w: 208, h: 138 },
  { src: "/assets/new20.jpeg", w: 206, h: 138 },
  { src: "/assets/v1.jpeg",    w: 205, h: 136 },
  { src: "/assets/v5.jpeg",    w: 205, h: 136 },
  { src: "/assets/v7.jpeg",    w: 205, h: 136 },
  { src: "/assets/hv7.jpg",    w: 148, h: 200 },
  { src: "/assets/IMG-20250810-WA0009.jpg", w: 148, h: 186 },
];

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><polygon points="5,2 18,10 5,18" fill="#c9a455" /></svg>
);

const GalleryTablet = () => {
  const [modal, setModal] = useState(null);
  const [lbIdx, setLbIdx] = useState(null);
  const CL = CAROUSEL_IMGS.length;

  return (
    <main className="overflow-x-hidden">

      {/* ── HEADER ── */}
      <section className="pt-24 pb-2">
        <div className="max-w-3xl mx-auto px-10 sm:px-14">
          <div className="flex items-center gap-4 mb-3">
            <div className="h-[1px] w-10 bg-[#c9a455]" />
            <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">Gallery</span>
          </div>
          <h1 className="font-cinzel font-semibold text-[2.6rem] text-[#f0e6d0] tracking-wider leading-tight mb-2">
            Moments in Music
          </h1>
          <p className="font-playfair italic text-[#c9a455]/60 text-[1rem]">
            Performances · Sessions · Recordings
          </p>
        </div>
      </section>

      {/* ── VIDEO GRID ── */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-10 sm:px-14">
          <div className="grid grid-cols-2 gap-4">
            {CARDS.map((card, i) => (
              <motion.div
                key={i}
                className="relative aspect-video overflow-hidden cursor-pointer group"
                style={{ border: "1px solid rgba(201,164,85,0.30)" }}
                onClick={() => setModal(card)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
              >
                <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" style={{ filter: "brightness(0.55) sepia(0.12)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border border-[#c9a455]/65 flex items-center justify-center pl-0.5 bg-[#120a05]/50 backdrop-blur-sm transition-all duration-300 group-hover:border-[#c9a455] group-hover:scale-110">
                    <PlayIcon />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 px-4 pt-6 pb-3" style={{ background: "linear-gradient(to top, rgba(10,5,1,0.92) 0%, transparent 100%)" }}>
                  <p className="font-cinzel text-[0.72rem] tracking-widest text-[#f0e6d0]/80 truncate">{card.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENDING QUOTE ── */}
      <motion.div
        className="text-center px-10 sm:px-14 max-w-2xl mx-auto py-10"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-5 mb-8">
          <div className="h-[1px] w-12 bg-[#c9a455]/35" />
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z" fill="rgba(201,164,85,0.55)" />
          </svg>
          <div className="h-[1px] w-12 bg-[#c9a455]/35" />
        </div>
        <blockquote className="font-playfair italic text-[1.5rem] text-[#f0e6d0]/80 leading-[1.75] mb-6">
          "Music is not a performance — it is a conversation between the raga, the moment, and the listener.
          Every note played with feeling is a note that lives forever."
        </blockquote>
        <p className="font-jost text-[10px] tracking-[0.45em] uppercase text-[#c9a455]/55">
          — Debapriya Adhikary
        </p>
      </motion.div>

      {/* ── INFINITE PHOTO STRIP (CSS animated) ── */}
      <section className="pb-14">
        <style>{`@keyframes galTabMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <div
            className="flex items-end"
            style={{
              gap: C_GAP,
              width: "max-content",
              animation: "galTabMarquee 220s linear infinite",
              animationPlayState: lbIdx !== null ? "paused" : "running",
            }}
          >
            {[...CAROUSEL_IMGS, ...CAROUSEL_IMGS].map((img, i) => (
              <div key={i} style={{ flexShrink: 0, cursor: "pointer" }} onClick={() => setLbIdx(i % CL)}>
                <img
                  src={img.src} alt="" draggable={false}
                  style={{
                    width: img.w * 1.15, height: img.h * 1.15, objectFit: "cover", display: "block",
                    border: "1px solid rgba(201,164,85,0.28)", filter: "brightness(0.78) sepia(0.10)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO LIGHTBOX ── */}
      <AnimatePresence>
        {lbIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center px-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-[#0a0501]/94 backdrop-blur-[10px]" onClick={() => setLbIdx(null)} />
            <button className="absolute left-5 z-10 w-11 h-11 flex items-center justify-center border border-[#c9a455]/40 text-[#c9a455] font-jost text-lg" onClick={() => setLbIdx((lbIdx - 1 + CL) % CL)}>‹</button>
            <img
              src={CAROUSEL_IMGS[lbIdx].src} alt="" draggable={false} className="relative z-10"
              style={{ maxHeight: "78vh", maxWidth: "80vw", objectFit: "contain", border: "1px solid rgba(201,164,85,0.25)" }}
            />
            <button className="absolute right-5 z-10 w-11 h-11 flex items-center justify-center border border-[#c9a455]/40 text-[#c9a455] font-jost text-lg" onClick={() => setLbIdx((lbIdx + 1) % CL)}>›</button>
            <button onClick={() => setLbIdx(null)} className="absolute top-5 right-7 z-10 font-jost text-[9px] tracking-[0.35em] uppercase text-[#b8966e]/60">Close ✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIDEO MODAL ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}
          >
            <div className="absolute inset-0 bg-[#0c0702]/90 backdrop-blur-[8px]" onClick={() => setModal(null)} />
            <motion.div
              className="relative z-10 w-full max-w-[760px]"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              {modal.ytId ? (
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://www.youtube.com/embed/${modal.ytId}?autoplay=1&rel=0&modestbranding=1`}
                    className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen
                    style={{ border: "1px solid rgba(201,164,85,0.22)" }}
                  />
                </div>
              ) : (
                <div className="aspect-video w-full flex items-center justify-center" style={{ border: "1px solid rgba(201,164,85,0.20)", background: "rgba(12,7,2,0.75)" }}>
                  <p className="font-jost text-[#c9a455]/45 text-[10px] tracking-[0.4em] uppercase">Coming Soon</p>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between px-0.5">
                <p className="font-cinzel text-[0.78rem] tracking-wider text-[#f0e6d0]/70">{modal.title}</p>
                <button onClick={() => setModal(null)} className="font-jost text-[9px] tracking-[0.35em] uppercase text-[#b8966e]/50">Close ✕</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default GalleryTablet;
