import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { NATIONAL, INTERNATIONAL, STATS, QUOTE } from "./performancesData";

// ── SECTION LABEL ─────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-6">
    <div className="h-[1px] w-10 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
      {text}
    </span>
  </div>
);

// ── COUNT-UP NUMBER ───────────────────────────────────────
const CountUp = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
};

// ── RAIL + CARD BLOCK ─────────────────────────────────────
const PerfBlock = ({ label, places }) => {
  const [sel, setSel] = useState(0);
  const place = places[sel];

  const scrollRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const updateEdges = () => {
    const el = scrollRef.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  };
  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);
    return () => window.removeEventListener("resize", updateEdges);
  }, [places]);

  return (
    <div className="mt-10">
      <SectionLabel text={label} />

      {/* Tour rail */}
      <div className="overflow-x-auto pb-3 deva-scroll">
        <div className="flex" style={{ minWidth: "max-content" }}>
          {places.map((p, i) => {
            const on = i === sel;
            return (
              <div
                key={i}
                className="flex-none cursor-pointer select-none"
                style={{ width: 132 }}
                onMouseEnter={() => setSel(i)}
                onClick={() => setSel(i)}
              >
                <div
                  className="font-cinzel text-center text-[0.92rem] leading-tight pb-2 px-2 transition-colors duration-300"
                  style={{
                    height: 40,
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    color: on ? "#c9a455" : "#b8966e",
                    fontWeight: on ? 600 : 400,
                  }}
                >
                  {p.name}
                </div>

                <div className="relative pb-3" style={{ height: 20 }}>
                  <div
                    className="absolute left-0 right-0"
                    style={{ top: 10, height: 2, background: "rgba(201,164,85,0.40)", transform: "translateY(-50%)" }}
                  />
                  <div
                    className="absolute rounded-full"
                    style={{
                      top: 10,
                      left: "50%",
                      width: on ? 15 : 10,
                      height: on ? 15 : 10,
                      background: "#c9a455",
                      border: "2px solid #120a05",
                      transform: "translate(-50%,-50%)",
                      boxShadow: on ? "0 0 14px rgba(201,164,85,0.6)" : "none",
                      transition: "all 0.25s ease",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail card */}
      <div className="flex justify-center mt-9">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full ${place.items.length > 3 ? "max-w-[820px]" : "max-w-[560px]"}`}
            style={{
              background: "rgba(13,7,3,0.55)",
              border: "1px solid rgba(201,164,85,0.25)",
              borderRadius: 6,
              boxShadow: "0 14px 44px rgba(0,0,0,0.45)",
            }}
          >
            <div className="px-7 py-6">
              <h3 className="font-cinzel text-[1.4rem] text-[#f0e6d0] tracking-wide mb-4">
                {place.name}
              </h3>
              <div className={place.items.length > 3 ? "grid grid-cols-2 gap-x-9" : ""}>
                {place.items.map((it, i) => (
                  <p
                    key={i}
                    className="font-jost font-light text-[#b8966e] text-[0.9rem] leading-relaxed py-2.5"
                    style={{ borderTop: "1px solid rgba(201,164,85,0.12)" }}
                  >
                    {it}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// ── QUOTE DIVIDER ─────────────────────────────────────────
const QuoteBreak = ({ text }) => (
  <motion.div
    className="text-center py-14 px-6 max-w-[640px] mx-auto"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="flex items-center justify-center gap-4 mb-5">
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c9a455]/35" />
      <span className="text-[#c9a455]/50 text-[10px]">◆</span>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c9a455]/35" />
    </div>
    <p className="font-playfair italic text-[#f0e6d0]/75 text-[1.15rem] leading-[1.8]">
      {text}
    </p>
  </motion.div>
);

// ── MAIN ──────────────────────────────────────────────────
const Performances = () => {
  const stats = [
    { to: STATS.cities,    label: "Indian cities" },
    { to: STATS.countries, label: "countries" },
    { to: STATS.venues,    label: "festivals & venues" },
  ];

  return (
    <section className="relative py-16 md:py-20 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1400px] mx-auto">

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
            <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
              Performances
            </span>
            <div className="h-[1px] w-10 bg-[#c9a455]" />
          </div>
          <h2 className="font-cinzel text-[2rem] md:text-[2.8rem] text-[#f0e6d0] tracking-wider leading-none mb-5">
            On Stage Across the World
          </h2>
          <p className="font-jost font-light text-[#b8966e] text-[0.95rem] md:text-[1rem] leading-[1.85] max-w-2xl mx-auto">
            For over three decades, Debapriya Adhikary has carried the Senia–Banaras
            tradition from intimate baithaks to the world's great festival stages —
            performing across{" "}
            <span className="text-[#c9a455]/85">{STATS.cities} cities in India</span> and{" "}
            <span className="text-[#c9a455]/85">{STATS.countries} countries on four continents</span>.
          </p>
        </motion.div>

        {/* Stat band */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              className="text-center py-6 px-3"
              style={{ background: "rgba(13,7,3,0.5)", border: "1px solid rgba(201,164,85,0.15)", borderRadius: 6 }}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            >
              <div className="font-cinzel text-[2rem] md:text-[2.4rem] text-[#c9a455] leading-none">
                <CountUp to={s.to} />+
              </div>
              <div className="font-jost text-[0.8rem] tracking-[0.1em] text-[#b8966e]/70 mt-2">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* National */}
        <PerfBlock label="National Concerts" places={NATIONAL} />

        {/* Quote */}
        <QuoteBreak text={QUOTE} />

        {/* International */}
        <PerfBlock label="International Festivals" places={INTERNATIONAL} />

      </div>
    </section>
  );
};

export default Performances;
