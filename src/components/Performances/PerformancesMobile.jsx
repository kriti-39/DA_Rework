import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { NATIONAL, INTERNATIONAL, STATS, QUOTE } from "./performancesData";

// ── COUNT-UP ──────────────────────────────────────────────
const CountUp = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.8, ease: [0.33, 1, 0.68, 1], onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
};

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="h-[1px] w-8 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">{text}</span>
  </div>
);

// ── VERTICAL TIMELINE BLOCK ───────────────────────────────
const MobileBlock = ({ label, places }) => {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-10">
      <SectionLabel text={label} />

      <div className="relative">
        {/* Vertical gold thread */}
        <div className="absolute left-[6px] top-3 bottom-3 w-[1px] bg-gradient-to-b from-[#c9a455]/45 via-[#c9a455]/25 to-transparent" />

        {places.map((p, i) => {
          const on = open === i;
          return (
            <div key={i} className="relative pl-7">
              {/* Node */}
              <div
                className="absolute rounded-full"
                style={{
                  left: 0, top: 20,
                  width: on ? 13 : 11, height: on ? 13 : 11,
                  background: "#c9a455", border: "2px solid #120a05",
                  transform: "translateX(0)",
                  boxShadow: on ? "0 0 12px rgba(201,164,85,0.6)" : "none",
                  transition: "all 0.25s ease",
                }}
              />

              <div
                className="flex items-center justify-between gap-3 py-3.5 cursor-pointer select-none"
                onClick={() => setOpen(on ? null : i)}
              >
                <h3
                  className="font-cinzel text-[1.05rem] tracking-wide transition-colors duration-300"
                  style={{ color: on ? "#c9a455" : "#f0e6d0" }}
                >
                  {p.name}
                </h3>
                <motion.svg
                  width="11" height="7" viewBox="0 0 14 8" fill="none"
                  animate={{ rotate: on ? 180 : 0 }} transition={{ duration: 0.3 }}
                  className="opacity-50 shrink-0"
                >
                  <path d="M1 1l6 6 6-6" stroke="#c9a455" strokeWidth="1.4" strokeLinecap="round" />
                </motion.svg>
              </div>

              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4">
                      {p.items.map((it, k) => (
                        <p
                          key={k}
                          className="font-jost font-light text-[#b8966e] text-[0.82rem] leading-relaxed py-2"
                          style={{ borderTop: "1px solid rgba(201,164,85,0.1)" }}
                        >
                          {it}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ── MAIN ──────────────────────────────────────────────────
const PerformancesMobile = () => {
  const stats = [
    { to: STATS.cities,    label: "Indian cities" },
    { to: STATS.countries, label: "countries" },
    { to: STATS.venues,    label: "venues" },
  ];

  return (
    <section className="px-6 py-12">

      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[1px] w-8 bg-[#c9a455]" />
          <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">Performances</span>
          <div className="h-[1px] w-8 bg-[#c9a455]" />
        </div>
        <h2 className="font-cinzel text-[1.7rem] text-[#f0e6d0] tracking-wide leading-tight mb-4">
          On Stage Across the World
        </h2>
        <p className="font-jost font-light text-[#b8966e] text-[0.88rem] leading-[1.85]">
          For over three decades, Debapriya Adhikary has carried the Senia–Banaras tradition
          from intimate baithaks to the world's great festival stages — performing across{" "}
          <span className="text-[#c9a455]/85">{STATS.cities} cities in India</span> and{" "}
          <span className="text-[#c9a455]/85">{STATS.countries} countries on four continents</span>.
        </p>
      </motion.div>

      {/* Stat band */}
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="text-center py-4 px-1"
            style={{ background: "rgba(13,7,3,0.5)", border: "1px solid rgba(201,164,85,0.15)", borderRadius: 6 }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <div
              className="font-cinzel text-[1.6rem] text-[#c9a455] leading-none"
              style={{ textShadow: "0 0 16px rgba(201,164,85,0.5)" }}
            >
              <CountUp to={s.to} />+
            </div>
            <div className="font-jost text-[0.62rem] tracking-[0.08em] text-[#b8966e]/70 mt-1.5">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* National */}
      <MobileBlock label="National Concerts" places={NATIONAL} />

      {/* Quote */}
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#c9a455]/35" />
          <span className="text-[#c9a455]/50 text-[9px]">◆</span>
          <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#c9a455]/35" />
        </div>
        <p className="font-playfair italic text-[#f0e6d0]/75 text-[1rem] leading-[1.8]">
          {QUOTE}
        </p>
      </motion.div>

      {/* International */}
      <MobileBlock label="International Festivals" places={INTERNATIONAL} />

    </section>
  );
};

export default PerformancesMobile;
