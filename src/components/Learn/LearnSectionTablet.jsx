import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Tablet-only rendering of the Home "Learn" teaser.
// Same content/data as the desktop LearnSection — only the layout is
// rebuilt so it doesn't depend on the sticky side image (hidden on tablet).

const workshopVideos = [
  { img: "/assets/workshop1.png", title: "Voice" },
  { img: "/assets/workshop2.png", title: "Palta" },
  { img: "/assets/workshop4.png", title: "Riyaz" },
  { img: "/assets/workshop6.png", title: "Thumri" },
];

const freeVideos = [
  { img: "/assets/YT1.jpg", url: "https://www.youtube.com/watch?v=R--sNOOQPWk&list=PLetziL4At--PNAtMyf6naVX5LBZcekg8T", title: "Raga Shastra" },
  { img: "/assets/HL2.jpg", url: "https://www.youtube.com/watch?v=7KVTyO3Vo0A&list=PLetziL4At--OuOU3YTJfsNPgi31K4ZY-f", title: "Sing with Deva" },
  { img: "/assets/HL3.jpg", url: "https://www.youtube.com/watch?v=9e7cQnlNhl8&list=PLetziL4At--OWbfygM3W2QGyTa0Dbk4Th", title: "Know Your Voice" },
];

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <polygon points="5,3 18,10 5,17" fill="#c9a455" />
  </svg>
);

const ClassesContent = () => (
  <div className="pt-6 pb-8 space-y-5">
    <p className="font-jost font-light text-[#b8966e] text-[0.95rem] leading-[1.75]">
      Debapriya Adhikary offers one-on-one Hindustani classical vocal training rooted in the
      guru-shishya parampara. Whether you are beginning your first raga or deepening an
      advanced practice, his teaching is patient, rigorous, and deeply personal — shaped
      around your voice, your rhythm, and your time.
    </p>
    <Link
      to="/learn"
      className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.3em] uppercase
                 text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
                 hover:border-[#c9a455] hover:bg-[#c9a455]/5
                 transition-all duration-300 group"
    >
      Details
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  </div>
);

const WorkshopsContent = () => (
  <div className="pt-6 pb-8 space-y-5">
    <p className="font-jost font-light text-[#b8966e] text-[0.95rem] leading-[1.75]">
      Immersive group workshops exploring voice development, the elements of raag and gayaki, and the rich traditions of purab ang. Conducted periodically and open to students at every stage of learning. Recordings of past workshops are available for purchase.
    </p>

    <div className="grid grid-cols-4 gap-3">
      {workshopVideos.map((v, i) => (
        <div key={i} className="relative aspect-video overflow-hidden cursor-pointer group">
          <img
            src={v.img}
            alt={v.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            style={{ filter: "brightness(0.5) sepia(0.2)" }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#120a05]/30">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
              <rect x="1" y="6" width="10" height="7" rx="1.5" stroke="#c9a455" strokeOpacity="0.7" strokeWidth="1.2"/>
              <path d="M3.5 6V4a2.5 2.5 0 015 0v2" stroke="#c9a455" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="font-jost text-[7px] tracking-[0.28em] uppercase text-[#c9a455]/70">
              Get Access
            </span>
          </div>
          <div className="absolute inset-0 border border-[#c9a455]/20 group-hover:border-[#c9a455]/50 transition-colors duration-300 pointer-events-none" />
        </div>
      ))}
    </div>

    <Link
      to="/learn"
      className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.3em] uppercase
                 text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
                 hover:border-[#c9a455] hover:bg-[#c9a455]/5
                 transition-all duration-300 group"
    >
      Details
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  </div>
);

const FreeResourcesContent = () => (
  <div className="pt-6 pb-8 space-y-5">
    <p className="font-jost font-light text-[#b8966e] text-[0.95rem] leading-[1.75]">
      A growing library of raga explorations, bandish introductions, and musical
      conversations — freely available on YouTube for anyone who wishes to listen and learn.
    </p>

    <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      {freeVideos.map((v, i) => (
        <a
          key={i}
          href={v.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none w-[200px] group"
        >
          <div className="relative aspect-video overflow-hidden">
            <img
              src={v.img}
              alt={v.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              style={{ filter: "brightness(0.82)" }}
              draggable={false}
            />
            <div className="absolute inset-0 bg-[#120a05]/0 group-hover:bg-[#120a05]/45
                            flex items-center justify-center transition-all duration-300">
              <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100
                              transition-all duration-300 w-10 h-10 rounded-full
                              border border-[#c9a455] flex items-center justify-center
                              backdrop-blur-sm bg-[#120a05]/40">
                <PlayIcon />
              </div>
            </div>
            <div className="absolute inset-0 border border-transparent group-hover:border-[#c9a455]/40 transition-colors duration-300 pointer-events-none" />
          </div>
          <p className="mt-1.5 font-jost text-[9px] tracking-[0.2em] uppercase text-[#b8966e]/60 truncate">
            {v.title}
          </p>
        </a>
      ))}
    </div>

    <Link
      to="/learn"
      className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.3em] uppercase
                 text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
                 hover:border-[#c9a455] hover:bg-[#c9a455]/5
                 transition-all duration-300 group"
    >
      Details
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  </div>
);

const panels = [
  { num: "01", title: "Classes",   tagline: "One-on-one training in the guru-shishya tradition",         content: <ClassesContent /> },
  { num: "02", title: "Workshops", tagline: "Immersive group sessions on Voice, Raga and Purab Ang",      content: <WorkshopsContent /> },
  { num: "03", title: "Public Domain Resources", tagline: "Learning Material available on You Tube",     content: <FreeResourcesContent /> },
];

const LearnSectionTablet = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="relative px-10 sm:px-14 py-20">

      {/* Section header */}
      <motion.div
        className="mb-10 max-w-2xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="h-[1px] w-10 bg-[#c9a455]" />
          <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
            Learn
          </span>
        </div>
        <h2 className="font-cinzel text-[2.4rem] text-[#f0e6d0] tracking-wider leading-none mb-4">
          Study the Art
        </h2>
        <p className="font-playfair italic text-[#b8966e] text-[1.05rem] leading-relaxed">
          Explore your path into Hindustani Classical Music, from a personal mentorship
          to a free library open to all.
        </p>
      </motion.div>

      {/* Accordion — full width, click-to-toggle (touch-friendly) */}
      <div className="divide-y divide-[#c9a455]/15 max-w-3xl">
        {panels.map((panel, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={panel.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <div
                className="flex items-center gap-5 py-5 cursor-pointer select-none"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="font-jost text-[9px] tracking-[0.4em] text-[#c9a455]/40 shrink-0">
                  {panel.num}
                </span>

                <div className="flex-1 flex items-baseline gap-4 flex-wrap min-w-0">
                  <h3 className={`font-cinzel text-[1.6rem] tracking-wide transition-colors duration-300 ${
                    isOpen ? "text-[#c9a455]" : "text-[#f0e6d0]"
                  }`}>
                    {panel.title}
                  </h3>
                  <p className={`font-playfair italic text-sm transition-colors duration-300 ${
                    isOpen ? "text-[#c9a455]/60" : "text-[#b8966e]/50"
                  }`}>
                    {panel.tagline}
                  </p>
                </div>

                <motion.svg
                  width="14" height="8" viewBox="0 0 14 8" fill="none"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.35 }}
                  className="shrink-0 opacity-50"
                >
                  <path d="M1 1L7 7L13 1" stroke="#c9a455" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </motion.svg>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="h-[1px] w-12 bg-[#c9a455]/40 mb-1 ml-[3.25rem]" />
                    <div className="pl-[3.25rem]">
                      {panel.content}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default LearnSectionTablet;
