import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ── VIDEOS ────────────────────────────────────────────────
const videos = [
  {
    img:   "/assets/T1.jpg",
    url:   "https://youtu.be/8CQZlAVIf10?si=fBEe2krXeXht7zh7",
    title: "Raga Durga - Live Performance",
  },
  {
    img:   "/assets/T2.jpg",
    url:   "https://youtu.be/ZVAUejtnaQY?si=p1hlpcQvurIKSmJg",
    title: "Raushan Raushan",
  },
  {
    img:   "/assets/T3.jpg",
    url:   "https://youtu.be/Wsw3jzqXsag?si=TMWyR1esRuIhFfZb",
    title: "Miyan Malhar - A Monsoon Treat",
  },
  {
    img:   "/assets/T4.jpg",
    url:   "https://youtu.be/xUUH27-Nmek?si=ywpsINVj5wE2pZ8E",
    title: "Raga Marwa - An Evening Charm",
  },
];

// ── CITY NAMES (actual tour cities) ──────────────────────
const cities = [
  // Left — National
  { name: "Kolkata",      x: "2%",  y: "8%",  rotate: -3 },
  { name: "Varanasi",     x: "5%",  y: "19%", rotate:  2 },
  { name: "Mumbai",       x: "1%",  y: "30%", rotate: -2 },
  { name: "Hyderabad",    x: "7%",  y: "41%", rotate:  1 },
  { name: "Pune",         x: "3%",  y: "52%", rotate: -1 },
  { name: "Bangalore",    x: "8%",  y: "62%", rotate:  4 },
  { name: "Ahmedabad",    x: "1%",  y: "72%", rotate: -5 },
  { name: "Goa",          x: "6%",  y: "82%", rotate:  2 },
  { name: "New Delhi",    x: "3%",  y: "91%", rotate: -2 },
  { name: "Nagpur",       x: "9%",  y: "13%", rotate:  1 },
  { name: "Jodhpur",      x: "4%",  y: "24%", rotate: -4 },
  { name: "Allahabad",    x: "7%",  y: "35%", rotate:  3 },
  { name: "Ranchi",       x: "2%",  y: "47%", rotate: -1 },
  { name: "Bhubaneswar",  x: "5%",  y: "58%", rotate:  2 },
  { name: "Trivandrum",   x: "1%",  y: "68%", rotate: -3 },
  { name: "Lonavla",      x: "8%",  y: "77%", rotate:  1 },
  { name: "Nasik",        x: "4%",  y: "86%", rotate: -2 },
  { name: "Kanpur",       x: "6%",  y: "96%", rotate:  3 },
  // Right — International
  { name: "London",       x: "86%", y: "8%",  rotate:  2 },
  { name: "New York",     x: "83%", y: "19%", rotate: -3 },
  { name: "Paris",        x: "88%", y: "30%", rotate:  3 },
  { name: "Sydney",       x: "84%", y: "41%", rotate: -2 },
  { name: "Melbourne",    x: "89%", y: "52%", rotate:  1 },
  { name: "Hamburg",      x: "82%", y: "62%", rotate: -4 },
  { name: "Auckland",     x: "87%", y: "72%", rotate:  3 },
  { name: "Chicago",      x: "83%", y: "82%", rotate: -1 },
  { name: "Boston",       x: "90%", y: "91%", rotate:  2 },
  { name: "Calgary",      x: "85%", y: "13%", rotate: -3 },
  { name: "Houston",      x: "88%", y: "24%", rotate:  4 },
  { name: "Birmingham",   x: "82%", y: "35%", rotate: -2 },
  { name: "Manchester",   x: "86%", y: "47%", rotate:  1 },
  { name: "Liverpool",    x: "84%", y: "58%", rotate: -3 },
  { name: "Lausanne",     x: "89%", y: "68%", rotate:  2 },
  { name: "Adelaide",     x: "83%", y: "77%", rotate: -1 },
  { name: "Seattle",      x: "87%", y: "86%", rotate:  3 },
  { name: "Providence",   x: "85%", y: "96%", rotate: -2 },
];

// ── PLAY ICON ─────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <polygon points="5,3 18,10 5,17" fill="#c9a455" />
  </svg>
);

// ── FLEEING CITY ──────────────────────────────────────────
const FleeingCity = ({ name, x, y, rotate }) => {
  const ref     = useRef(null);
  const springX = useSpring(0, { stiffness: 220, damping: 24 });
  const springY = useSpring(0, { stiffness: 220, damping: 24 });

  useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = e.clientX - cx;
      const dy   = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const R    = 130;
      if (dist < R && dist > 0) {
        const f = (R - dist) / R;
        springX.set(-(dx / dist) * f * 85);
        springY.set(-(dy / dist) * f * 85);
      } else {
        springX.set(0);
        springY.set(0);
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [springX, springY]);

  return (
    <motion.span
      ref={ref}
      className="absolute font-jost text-[11px] tracking-[0.4em] uppercase select-none pointer-events-none"
      style={{
        left: x, top: y, rotate,
        x: springX, y: springY,
        color: "#a08060", opacity: 0.42,
      }}
    >
      {name}
    </motion.span>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────
const WatchSection = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Y: CONVEYOR BELT (direct scroll, no spring — stays perfectly pinned) ─
  //
  //  scroll 0.00 → card1: 100%  card2: 200%  card3: 300%
  //  scroll 0.33 → card1:   0%  card2: 100%  card3: 200%   ← card2 starts peeking
  //  scroll 0.66 → card1:   0%  card2:   0%  card3: 100%   ← card3 starts peeking
  //  scroll 1.00 → all at 0%, stacked
  //
  //  overflow-hidden on sticky clips cards at y≥100% so only the peeking one
  //  is visible below — no leaks outside the section.
  //
  const y1 = useTransform(scrollYProgress,
    [0,      0.33],
    ["100%", "0%"]
  );
  const y2 = useTransform(scrollYProgress,
    [0,      0.33,   0.66],
    ["200%", "100%", "0%"]
  );
  const y3 = useTransform(scrollYProgress,
    [0,      0.33,   0.66,   1.0],
    ["300%", "200%", "100%", "0%"]
  );

  // ── SCALE + OPACITY: card visually recedes as next one slides over it ────
  //  0.75 scale makes the recession dramatic and clear
  const rawSc0 = useTransform(scrollYProgress, [0,    0.33], [1, 0.75]);
  const rawSc1 = useTransform(scrollYProgress, [0.33, 0.66], [1, 0.75]);
  const rawSc2 = useTransform(scrollYProgress, [0.66, 1.0 ], [1, 0.75]);

  const rawOp0 = useTransform(scrollYProgress, [0,    0.33], [1, 0.5]);
  const rawOp1 = useTransform(scrollYProgress, [0.33, 0.66], [1, 0.5]);
  const rawOp2 = useTransform(scrollYProgress, [0.66, 1.0 ], [1, 0.5]);

  // Spring only on scale/opacity — gives them weight without lagging the y
  const sp = { stiffness: 85, damping: 26, mass: 0.4 };
  const sc0 = useSpring(rawSc0, sp);
  const sc1 = useSpring(rawSc1, sp);
  const sc2 = useSpring(rawSc2, sp);
  const op0 = useSpring(rawOp0, sp);
  const op1 = useSpring(rawOp1, sp);
  const op2 = useSpring(rawOp2, sp);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if      (v < 0.25) setActive(0);
      else if (v < 0.55) setActive(1);
      else if (v < 0.82) setActive(2);
      else               setActive(3);
    });
  }, [scrollYProgress]);

  const cardDefs = [
    { y: "0%", scale: sc0, opacity: op0, zIndex: 10 },
    { y: y1,   scale: sc1, opacity: op1, zIndex: 20 },
    { y: y2,   scale: sc2, opacity: op2, zIndex: 30 },
    { y: y3,   scale: 1,   opacity: 1,   zIndex: 40 },
  ];

  return (
    // Pinned for 700vh — each card transition gets ~233vh (unhurried)
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${videos.length * 200}vh` }}
    >
      {/* STICKY — overflow-hidden clips off-screen cards, prevents glitches */}
      <div className="sticky top-0 h-screen">

        {/* Fleeing city names */}
        {cities.map((c) => (
          <FleeingCity key={c.name} name={c.name} x={c.x} y={c.y} rotate={c.rotate} />
        ))}

        {/* CENTER STAGE */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-4">

          {/* Heading */}
          <div className="text-center mb-1 mt-8">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-[1px] w-8 bg-[#c9a455]/60" />
              <span className="font-jost text-[9px] tracking-[0.5em] uppercase text-[#c9a455]">
                Watch
              </span>
              <div className="h-[1px] w-8 bg-[#c9a455]/60" />
            </div>
            <h2 className="font-cinzel text-[1.6rem] md:text-[2rem] text-[#f0e6d0] tracking-[0.1em] leading-none mb-2">
              30+ Years On Screen & Stage
            </h2>
            <p className="font-playfair italic text-[#b8966e] text-[18px]">
              Performances · Recordings
            </p>
          </div>

          {/* ── CARD STACK ────────────────────────────────── */}
          {/* overflow-hidden on sticky handles the clipping — no need here  */}
          <div className="relative w-[65vw] max-w-[860px] aspect-video">
            {videos.map((video, i) => {
              const { y, scale, opacity, zIndex } = cardDefs[i];
              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 cursor-pointer group overflow-hidden rounded-2xl"
                  style={{
                    y,
                    scale,
                    opacity,
                    zIndex,
                    boxShadow: "0 32px 80px -10px rgba(201,164,85,0.25)",
                  }}
                  onClick={() => window.open(video.url, "_blank", "noopener")}
                >
                  {/* Thumbnail */}
                  <img
                    src={video.img}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  {/* Bottom gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0702]/90 via-[#0c0702]/15 to-transparent pointer-events-none" />

                  {/* Title */}
                  <div className="absolute bottom-4 left-5 right-16 flex items-center gap-2 pointer-events-none">
                    <div className="w-[3px] h-[3px] rounded-full bg-[#c9a455]/70 shrink-0" />
                    <p className="font-jost text-[10px] tracking-[0.22em] uppercase text-[#c9a455]/75 truncate">
                      {video.title}
                    </p>
                  </div>

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 w-14 h-14 rounded-full border border-[#c9a455] flex items-center justify-center backdrop-blur-sm bg-[#0c0702]/50">
                      <PlayIcon />
                    </div>
                  </div>

                  {/* Gold border hover */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#c9a455]/40 transition-colors duration-300 rounded-2xl pointer-events-none" />
                </motion.div>
              );
            })}
          </div>


          {/* Performances CTA — fades in at last card */}
          <motion.div
            className="flex flex-col items-center gap-3 mt-12"
            animate={{ opacity: active === videos.length - 1 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >

            <a
              href="/performances"
              className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.28em] uppercase text-[#c9a455] border border-[#c9a455]/40 px-6 py-3 hover:border-[#c9a455] hover:bg-[#c9a455]/5 transition-all duration-300 group"
            >
              View All Performances
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WatchSection;
