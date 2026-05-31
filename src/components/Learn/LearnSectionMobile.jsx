import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const workshopVideos = [
  { img: "/assets/T1.jpg", title: "Raga Yaman Workshop" },
  { img: "/assets/T2.jpg", title: "Bhairavi Masterclass" },
  { img: "/assets/T3.jpg", title: "Thumri Deep Dive" },
  { img: "/assets/T4.jpg", title: "Sur & Laya Session" },
];

const freeVideos = [
  { img: "/assets/YT1.jpg", url: "https://youtube.com/playlist?list=PLetziL4At--PNAtMyf6naVX5LBZcekg8T&si=0T25gcPDYDCkkZPZ", title: "Raga Shastra" },
  { img: "/assets/HL2.jpg", url: "https://youtube.com/playlist?list=PLetziL4At--OuOU3YTJfsNPgi31K4ZY-f&si=8E6RdeZoZHvdWlc2", title: "Sing with Deva" },
  { img: "/assets/HL3.jpg", url: "https://youtu.be/9e7cQnlNhl8?si=q_mKythy79wkS9rB", title: "Know Your Voice" },
];

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <polygon points="5,3 18,10 5,17" fill="#c9a455" />
  </svg>
);

const panels = [
  {
    num:     "01",
    title:   "Classes",
    tagline: "One-on-one training in the guru-shishya tradition",
    content: (
      <div className="space-y-4 pb-6">
        <p className="font-jost font-light text-[#b8966e] text-sm leading-[1.75]">
          Debapriya Adhikary offers one-on-one Hindustani classical vocal training rooted in
          the guru-shishya parampara. Whether you are beginning your first raga or deepening
          an advanced practice, his teaching is patient, rigorous, and deeply personal.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 font-jost text-[10px] tracking-[0.3em] uppercase
                     text-[#c9a455] border border-[#c9a455]/40 px-5 py-2.5
                     hover:border-[#c9a455] transition-all duration-300"
        >
          Details →
        </a>
      </div>
    ),
  },
  {
    num:     "02",
    title:   "Workshops",
    tagline: "Immersive group sessions on Voice, Raga and Purab Ang",
    content: (
      <div className="space-y-4 pb-6">
        <p className="font-jost font-light text-[#b8966e] text-sm leading-[1.75]">
          Immersive group workshops exploring voice development, raag, gayaki, and the rich
          traditions of purab ang. Conducted periodically and open to students at every stage.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {workshopVideos.map((v, i) => (
            <div key={i} className="relative aspect-video overflow-hidden rounded-sm">
              <img src={v.img} alt={v.title} className="w-full h-full object-cover"
                   style={{ filter: "brightness(0.5) sepia(0.2)" }} />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[#120a05]/30">
                <svg width="10" height="12" viewBox="0 0 12 14" fill="none">
                  <rect x="1" y="6" width="10" height="7" rx="1.5" stroke="#c9a455" strokeOpacity="0.7" strokeWidth="1.2"/>
                  <path d="M3.5 6V4a2.5 2.5 0 015 0v2" stroke="#c9a455" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span className="font-jost text-[7px] tracking-[0.2em] uppercase text-[#c9a455]/70">Access</span>
              </div>
            </div>
          ))}
        </div>
        <a
          href="/learn"
          className="inline-flex items-center gap-2 font-jost text-[10px] tracking-[0.3em] uppercase
                     text-[#c9a455] border border-[#c9a455]/40 px-5 py-2.5
                     hover:border-[#c9a455] transition-all duration-300"
        >
          Details →
        </a>
      </div>
    ),
  },
  {
    num:     "03",
    title:   "Free Resources",
    tagline: "Learning material available on YouTube",
    content: (
      <div className="space-y-4 pb-6">
        <p className="font-jost font-light text-[#b8966e] text-sm leading-[1.75]">
          A growing library of raga explorations, bandish introductions, and musical
          conversations — freely available on YouTube for anyone who wishes to listen and learn.
        </p>
        <div className="flex flex-col gap-3">
          {freeVideos.map((v, i) => (
            <a key={i} href={v.url} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-3 group">
              <div className="relative w-20 aspect-video overflow-hidden rounded-sm flex-none">
                <img src={v.img} alt={v.title} className="w-full h-full object-cover"
                     style={{ filter: "brightness(0.82)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-7 h-7 rounded-full border border-[#c9a455]/60 flex items-center justify-center bg-[#120a05]/50">
                    <PlayIcon />
                  </div>
                </div>
              </div>
              <p className="font-jost text-[11px] tracking-[0.15em] uppercase text-[#b8966e]/70 group-hover:text-[#c9a455] transition-colors duration-300">
                {v.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    ),
  },
];

const LearnSectionMobile = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="md:hidden px-6">

      {/* Header */}
      <motion.div
        className="mb-1"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4 mb-3">
          <div className="h-[1px] w-10 bg-[#c9a455]" />
          <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">Learn</span>
        </div>
        <h2 className="font-cinzel text-[1.5rem] text-[#f0e6d0] tracking-none leading-none mb-3">
          Study the Art
        </h2>
        <p className="font-playfair italic text-[#b8966e] text-[0.95rem] leading-relaxed">
          Explore your path into Hindustani Classical Music.
        </p>
      </motion.div>

      {/* Accordion */}
      <div className="divide-y divide-[#c9a455]/15">
        {panels.map((panel, i) => (
          <motion.div
            key={panel.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
          >
            <div
              className="flex items-center gap-4 py-5 cursor-pointer select-none"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-jost text-[9px] tracking-[0.4em] text-[#c9a455]/40 shrink-0">
                {panel.num}
              </span>
              <div className="flex-1">
                <h3 className={`font-cinzel text-[1.15rem] tracking-wide transition-colors duration-300 ${
                  open === i ? "text-[#c9a455]" : "text-[#f0e6d0]"
                }`}>
                  {panel.title}
                </h3>
                <p className="font-playfair italic text-[11px] text-[#b8966e]/50 mt-0.5">
                  {panel.tagline}
                </p>
              </div>
              <motion.svg
                width="12" height="8" viewBox="0 0 14 8" fill="none"
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 opacity-50"
              >
                <path d="M1 1L7 7L13 1" stroke="#c9a455" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </div>

            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden pl-8"
                >
                  <div className="h-[1px] w-10 bg-[#c9a455]/40 mb-3" />
                  {panel.content}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default LearnSectionMobile;
