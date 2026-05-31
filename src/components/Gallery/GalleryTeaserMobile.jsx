import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

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

// ── LIGHTBOX ──────────────────────────────────────────────
const Lightbox = ({ startIndex, onClose }) => {
  const [curr, setCurr] = useState(startIndex);
  const total = SRCS.length;
  const go = (dir) => setCurr(i => (i + dir + total) % total);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="absolute inset-0 bg-[#0c0702]/92 backdrop-blur-[6px]" onClick={onClose} />
      <div className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={curr}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <img
              src={SRCS[curr].src}
              alt={SRCS[curr].caption}
              className="w-full max-h-[65vh] object-contain"
              style={{ border: "1px solid rgba(201,164,85,0.22)" }}
            />
            <div className="mt-3 flex items-center justify-between">
              <p className="font-jost text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/65">
                {SRCS[curr].caption}
              </p>
              <p className="font-jost text-[9px] tracking-[0.2em] text-[#b8966e]/40">
                {curr + 1} / {total}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-5">
          <button onClick={() => go(-1)}
            className="w-10 h-10 rounded-full border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]">←</button>
          <button onClick={onClose}
            className="font-jost text-[9px] tracking-[0.3em] uppercase text-[#b8966e]/50">Close ✕</button>
          <button onClick={() => go(1)}
            className="w-10 h-10 rounded-full border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]">→</button>
        </div>
      </div>
    </motion.div>
  );
};

// ── MAIN ──────────────────────────────────────────────────
const GalleryTeaserMobile = () => {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  return (
    <section className="md:hidden py-8">

      {/* Header */}
      <motion.div
        className="text-center mb-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-8 bg-[#c9a455]" />
          <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">Gallery</span>
          <div className="h-[1px] w-8 bg-[#c9a455]" />
        </div>
        <h2 className="font-cinzel text-[1.5rem] text-[#f0e6d0] tracking-none leading-none mb-2">
          Moments in Music
        </h2>
        <p className="font-playfair italic text-[#b8966e] text-[0.95rem]">
          On stage, behind the lens, and in the stillness between notes.
        </p>
      </motion.div>

      {/* Centre artist image */}
      <motion.div
        className="flex justify-center mb-6 px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <img
          src="/assets/centerImg.png"
          alt="Debapriya Adhikary"
          className="w-full max-w-[280px] object-contain"
          style={{
            filter: "drop-shadow(0 16px 40px rgba(201,164,85,0.16))",
            maskImage: "radial-gradient(ellipse 72% 88% at 50% 50%, black 35%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 72% 88% at 50% 50%, black 35%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* Infinite auto-scroll carousel */}
      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className="flex gap-3 pb-2"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {/* Duplicate array for seamless infinite loop */}
          {[...SRCS, ...SRCS].map((item, i) => (
            <div
              key={i}
              className="flex-none cursor-pointer relative overflow-hidden"
              style={{
                width: "36vw",
                aspectRatio: "2/3",
                borderRadius: "6px",
                border: "1px solid rgba(201,164,85,0.20)",
              }}
              onClick={() => setLightboxIdx(i % SRCS.length)}
            >
              <img
                src={item.src}
                alt={item.caption}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.68) sepia(0.10)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0702]/75 to-transparent" />
              <p className="absolute bottom-2 left-2 right-2 font-jost text-[7px] tracking-[0.18em] uppercase text-[#c9a455]/70 truncate">
                {item.caption}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* CTA */}
      <div className="flex justify-center mt-8 px-4">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.3em] uppercase
                     text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
                     hover:border-[#c9a455] transition-all duration-300"
        >
          View Full Gallery <span>→</span>
        </Link>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>

    </section>
  );
};

export default GalleryTeaserMobile;
