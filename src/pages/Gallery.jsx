import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// ── CARDS ─────────────────────────────────────────────────────────────────────
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

// ── CYLINDER CONSTANTS ────────────────────────────────────────────────────────
const N          = CARDS.length;
const ANGLE_STEP = 360 / N;
const RADIUS     = 440;
const PITCH      = 140;
const CARD_W     = 310;
const CARD_H     = 194;

// ── SIDE COLUMNS — vertical only, 8 images each ──────────────────────────────
const LEFT_IMGS = [
  { src: "/assets/AG1.jpg",  w: 148, h: 218 },
  { src: "/assets/AG3.jpg",  w: 148, h: 218 },
  { src: "/assets/AG5.jpg",  w: 148, h: 218 },
  { src: "/assets/GI2.jpeg", w: 148, h: 218 },
  { src: "/assets/AG6.jpg",  w: 148, h: 218 },
  { src: "/assets/AG2.jpeg", w: 148, h: 218 },
  { src: "/assets/AG4.jpg",  w: 148, h: 218 },
  { src: "/assets/AG7.jpg",  w: 148, h: 218 },
];

const RIGHT_IMGS = [
  { src: "/assets/AG4.jpg",  w: 148, h: 218 },
  { src: "/assets/AG7.jpg",  w: 148, h: 218 },
  { src: "/assets/GI1.jpeg", w: 148, h: 218 },
  { src: "/assets/AG2.jpeg", w: 148, h: 218 },
  { src: "/assets/AG6.jpg",  w: 148, h: 218 },
  { src: "/assets/AG1.jpg",  w: 148, h: 218 },
  { src: "/assets/AG5.jpg",  w: 148, h: 218 },
  { src: "/assets/GI2.jpeg", w: 148, h: 218 },
];

// ── CAROUSEL — infinite strip below the ending quote ─────────────────────────
const C_GAP = 12;   // px gap between items
const CAROUSEL_IMGS = [
  { src: "/assets/AG1.jpg",   w: 148, h: 218 },  // portrait
  { src: "/assets/AG3.jpg",   w: 200, h: 136 },  // landscape
  { src: "/assets/AG5.jpg",   w: 148, h: 195 },  // portrait
  { src: "/assets/AG2.jpeg",  w: 212, h: 146 },  // landscape
  { src: "/assets/GI1.jpeg",  w: 148, h: 240 },  // portrait tall
  { src: "/assets/AG4.jpg",   w: 182, h: 130 },  // landscape compact
  { src: "/assets/AG6.jpg",   w: 148, h: 218 },  // portrait
  { src: "/assets/GI2.jpeg",  w: 205, h: 142 },  // landscape
  { src: "/assets/AG7.jpg",   w: 148, h: 180 },  // portrait short
  { src: "/assets/T1.jpg",    w: 196, h: 136 },  // landscape
  { src: "/assets/T2.jpg",    w: 148, h: 220 },  // portrait
  { src: "/assets/T3.jpg",    w: 208, h: 148 },  // landscape
];
// single-copy track width = sum of widths + n gaps (so duplicate loops seamlessly)
const C_TRACK_W = CAROUSEL_IMGS.reduce((a, c) => a + c.w, 0) + CAROUSEL_IMGS.length * C_GAP;

// ── PLAY ICON ─────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 20 20" fill="none">
    <polygon points="5,2 18,10 5,18" fill="#c9a455" />
  </svg>
);

// ── DECORATIVE IMAGE ──────────────────────────────────────────────────────────
const DecorImg = ({ src, w, h }) => (
  <img
    src={src}
    alt=""
    draggable={false}
    style={{
      width:      w,
      height:     h,
      objectFit:  "cover",
      display:    "block",
      flexShrink: 0,
      border:     "1px solid rgba(201,164,85,0.35)",
      boxShadow:  "0 18px 52px rgba(0,0,0,0.55)",
      filter:     "brightness(0.82) sepia(0.10)",
    }}
  />
);

// ── MAIN ──────────────────────────────────────────────────────────────────────
const Gallery = () => {
  const trackRef = useRef(null);
  const [modal,       setModal]       = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(null);
  const CL = CAROUSEL_IMGS.length;

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // ── spiral motion ──
  const rawRot   = useTransform(scrollYProgress, [0, 1], [0, -(N - 1) * ANGLE_STEP]);
  const rotation = useSpring(rawRot, { stiffness: 38, damping: 32 });

  const rawY      = useTransform(scrollYProgress, [0, 1], [0, (N - 1) * PITCH]);
  const cylinderY = useSpring(rawY, { stiffness: 38, damping: 32 });

  // ── side columns scroll upward as user scrolls ──
  // total column height ≈ (138+218)×3 + 5×10 = 1118 px
  // visible area ≈ 500–700 px → scroll ~520 px upward
  const rawColY = useTransform(scrollYProgress, [0, 1], [0, -520]);
  const colY    = useSpring(rawColY, { stiffness: 38, damping: 20 });

  return (
    <main>

      {/* ── SCROLL TRACK ── */}
      <div ref={trackRef} style={{ height: `${100 + (N - 1) * 90 + 80}vh` }}>

        {/* ── STICKY VIEWPORT ── */}
        <div className="sticky top-0 h-screen flex flex-col">

          {/* ── PAGE HEADER — left-aligned ── */}
          <motion.div
            className="shrink-0 pt-[72px] pb-4 relative z-20 pointer-events-none"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-4">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-[1px] w-10 bg-[#c9a455]" />
                <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
                  Gallery
                </span>
              </div>
              <h1 className="font-cinzel font-semibold text-[2.2rem] md:text-[3rem]
                             text-[#f0e6d0] tracking-wider leading-tight mb-2">
                Moments in Music
              </h1>
              <p className="font-playfair italic text-[#c9a455]/60 text-[0.95rem] mb-3">
                Scroll to journey through performances &amp; sessions
              </p>
              <p className="font-jost font-light text-[#a08060]/65 text-[0.75rem]
                            tracking-[0.1em] leading-relaxed max-w-[240px]">
                Four decades on stage — concerts, intimate mehfils and studio
                sessions captured across India and beyond.
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — full viewport height, starts from very top ── */}
          <div
            className="absolute top-0 bottom-0 overflow-hidden pointer-events-none"
            style={{
              right: "clamp(28px, 5.5vw, 88px)", width: 148, zIndex: 5,
              maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
            }}
          >
            <motion.div
              className="flex flex-col gap-[10px]"
              style={{ paddingTop: 0, y: colY }}
            >
              {RIGHT_IMGS.map((img, i) => (
                <DecorImg key={i} src={img.src} w={img.w} h={img.h} />
              ))}
            </motion.div>
          </div>

          {/* ── 3D SCENE AREA ── */}
          <div className="relative flex-1">

            {/* ── CENTER — Dada's portrait ── */}
            <div
              className="absolute top-[-25%] inset-0 flex items-end justify-center pointer-events-none"
              style={{}}
            >
              <img
                src="/assets/centerImg.png"
                alt=""
                draggable={false}
                style={{
                  height:         "115%",
                  width:          "full",
                  objectFit:      "contain",
                  objectPosition: "top center",
                  opacity:        1,
                  filter:         "sepia(0.18) brightness(0.60)",
                  flexShrink:     0,
                }}
              />
            </div>

            {/* ── LEFT COLUMN — inside scene area, never touches header text ── */}
            <div
              className="absolute top-0 bottom-0 overflow-hidden pointer-events-none"
              style={{
                left: "clamp(28px, 5.5vw, 88px)", width: 148, zIndex: 5,
                maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)",
              }}
            >
              <motion.div
                className="flex flex-col gap-[10px]"
                style={{ paddingTop: 12, y: colY }}
              >
                {LEFT_IMGS.map((img, i) => (
                  <DecorImg key={i} src={img.src} w={img.w} h={img.h} />
                ))}
              </motion.div>
            </div>

          
            

            {/* ── SPIRAL — last in DOM = above all decorative layers ── */}
            <div style={{
              position:          "absolute",
              inset:             0,
              display:           "flex",
              alignItems:        "center",
              justifyContent:    "center",
              perspective:       "1100px",
              perspectiveOrigin: "50% 40%",
            }}>
              <motion.div
                style={{
                  position:       "relative",
                  width:          0,
                  height:         0,
                  transformStyle: "preserve-3d",
                  rotateY:        rotation,
                  y:              cylinderY,
                }}
              >
                {CARDS.map((card, i) => {
                  const baseAngle = i * ANGLE_STEP;
                  const cardY     = -(i * PITCH);
                  return (
                    <div
                      key={i}
                      onClick={() => setModal(card)}
                      style={{
                        position:                 "absolute",
                        width:                    CARD_W,
                        height:                   CARD_H,
                        marginLeft:               -(CARD_W / 2),
                        marginTop:                -(CARD_H / 2),
                        transform:                `rotateY(${baseAngle}deg) translateZ(${RADIUS}px) translateY(${cardY}px)`,
                        backfaceVisibility:       "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        cursor:                   "pointer",
                      }}
                    >
                      <div
                        className="relative w-full h-full overflow-hidden group"
                        style={{
                          border:    "1px solid rgba(201,164,85,0.38)",
                          boxShadow: "0 24px 64px rgba(0,0,0,0.75), 0 0 28px rgba(201,164,85,0.07)",
                        }}
                      >
                        <img
                          src={card.img}
                          alt={card.title}
                          draggable={false}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                          style={{ filter: "brightness(0.52) sepia(0.14)" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full border border-[#c9a455]/65
                                          flex items-center justify-center pl-0.5
                                          bg-[#120a05]/50 backdrop-blur-sm
                                          transition-all duration-300
                                          group-hover:border-[#c9a455]
                                          group-hover:bg-[#120a05]/70
                                          group-hover:scale-110">
                            <PlayIcon />
                          </div>
                        </div>
                        <div
                          className="absolute bottom-0 left-0 right-0 px-4 pt-6 pb-3"
                          style={{ background: "linear-gradient(to top, rgba(10,5,1,0.90) 0%, transparent 100%)" }}
                        >
                          <p className="font-cinzel text-[0.7rem] tracking-widest text-[#f0e6d0]/80">
                            {card.title}
                          </p>
                        </div>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                                        transition-opacity duration-300 pointer-events-none"
                             style={{ background: "rgba(201,164,85,0.04)" }} />
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

          </div>     {/* 3D scene area */}
        </div>       {/* sticky viewport */}
      </div>         {/* scroll track */}

      {/* ── ENDING NOTE ── */}
      <section className="relative pt-28 md:pt-16 pb-14">

        {/* top rule */}
        

        {/* quote block */}
        <motion.div
          className="text-center px-8 md:px-16 lg:px-24 max-w-[760px] mx-auto mb-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-center gap-5 mb-10">
            <div className="h-[1px] w-12 bg-[#c9a455]/35" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
                    fill="rgba(201,164,85,0.55)" />
            </svg>
            <div className="h-[1px] w-12 bg-[#c9a455]/35" />
          </div>
          <blockquote className="font-playfair italic text-[1.35rem] md:text-[1.7rem]
                                  text-[#f0e6d0]/80 leading-[1.75] mb-8">
            "Music is not a performance — it is a conversation between the raga,
            the moment, and the listener. Every note played with feeling is a note
            that lives forever."
          </blockquote>
          <p className="font-jost text-[10px] tracking-[0.45em] uppercase text-[#c9a455]/55">
            — Debapriya Adhikary
          </p>
        </motion.div>

        {/* ── INFINITE CAROUSEL ── */}
        <div
          className="overflow-hidden"
          style={{
            maskImage:       "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          }}
        >
          <motion.div
            className="flex items-end"
            style={{ gap: C_GAP, width: "max-content" }}
            animate={{ x: [0, -C_TRACK_W] }}
            transition={{ duration: 70, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          >
            {[...CAROUSEL_IMGS, ...CAROUSEL_IMGS].map((img, i) => (
              <motion.div
                key={i}
                style={{ flexShrink: 0, cursor: "pointer" }}
                whileHover={{
                  boxShadow: "0 20px 55px rgba(0,0,0,0.80), 0 0 20px rgba(201,164,85,0.16)",
                }}
                onClick={() => setCarouselIdx(i % CL)}
              >
                <img
                  src={img.src}
                  alt=""
                  draggable={false}
                  style={{
                    width:     img.w,
                    height:    img.h,
                    objectFit: "cover",
                    display:   "block",
                    border:    "1px solid rgba(201,164,85,0.28)",
                    filter:    "brightness(0.78) sepia(0.10)",
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ── CAROUSEL LIGHTBOX ── */}
      <AnimatePresence>
        {carouselIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* backdrop */}
            <div className="absolute inset-0 bg-[#0a0501]/94 backdrop-blur-[10px]"
                 onClick={() => setCarouselIdx(null)} />

            {/* prev */}
            <button
              className="absolute left-6 z-10 w-11 h-11 flex items-center justify-center
                         border border-[#c9a455]/40 text-[#c9a455] hover:bg-[#c9a455]/10
                         transition-colors duration-200 font-jost text-lg"
              onClick={() => setCarouselIdx((carouselIdx - 1 + CL) % CL)}
            >‹</button>

            {/* image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={carouselIdx}
                src={CAROUSEL_IMGS[carouselIdx].src}
                alt=""
                draggable={false}
                className="relative z-10"
                style={{
                  maxHeight:  "78vh",
                  maxWidth:   "72vw",
                  objectFit:  "contain",
                  border:     "1px solid rgba(201,164,85,0.25)",
                  boxShadow:  "0 32px 80px rgba(0,0,0,0.85)",
                }}
                initial={{ opacity: 0, scale: 0.93 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{    opacity: 0, scale: 0.93 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>

            {/* next */}
            <button
              className="absolute right-6 z-10 w-11 h-11 flex items-center justify-center
                         border border-[#c9a455]/40 text-[#c9a455] hover:bg-[#c9a455]/10
                         transition-colors duration-200 font-jost text-lg"
              onClick={() => setCarouselIdx((carouselIdx + 1) % CL)}
            >›</button>

            {/* close */}
            <button
              onClick={() => setCarouselIdx(null)}
              className="absolute top-5 right-7 z-10 font-jost text-[9px] tracking-[0.35em]
                         uppercase text-[#a08060]/50 hover:text-[#c9a455] transition-colors duration-300"
            >Close ✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── VIDEO MODAL ── */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div
              className="absolute inset-0 bg-[#0c0702]/90 backdrop-blur-[8px]"
              onClick={() => setModal(null)}
            />
            <motion.div
              className="relative z-10 w-[68vw] max-w-[860px]"
              initial={{ scale: 0.91, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.91, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
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
                  <p className="font-jost text-[#c9a455]/45 text-[10px] tracking-[0.4em] uppercase">
                    Coming Soon
                  </p>
                </div>
              )}
              <div className="mt-4 flex items-center justify-between px-0.5">
                <p className="font-cinzel text-[0.78rem] tracking-wider text-[#f0e6d0]/70">
                  {modal.title}
                </p>
                <button
                  onClick={() => setModal(null)}
                  className="font-jost text-[9px] tracking-[0.35em] uppercase
                             text-[#a08060]/50 hover:text-[#c9a455] transition-colors duration-300"
                >
                  Close ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default Gallery;
