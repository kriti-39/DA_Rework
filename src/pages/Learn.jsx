import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────────────────────────

const WHAT_YOU_LEARN = [
  { label: "Raga",           detail: "Alaap, jod, jhala and bandish in the khayal tradition" },
  { label: "Voice Culture",  detail: "Swara placement, shruti sensitivity and resonance" },
  { label: "Ornamentation",  detail: "Taan, meend, gamak, murki and their expressive use" },
  { label: "Light Classical",detail: "Thumri, tappa, tap-thumri, dadra, kajri and jhula" },
  { label: "Layakari",       detail: "Rhythmic nuance — playing with and around tala" },
  { label: "Bandish",        detail: "Rare compositions from the Benaras and Senia traditions" },
  { label: "Dhrupad",        detail: "Under the continuing influence of Pt. Uday Bhawalkar's lineage" },
];

const GURUS = [
  { name: "Dr. Girija Devi",            detail: "Padma Vibhushan · Benaras Gharana · 11 years" },
  { name: "Pt. Samaresh Chawdhury",     detail: "Senia & Maihar Gharanas · 14 years" },
  { name: "Pt. Kumar Prasad Mukherjee", detail: "Agra & Rampur-Sahaswan traditions" },
  { name: "Pt. Vijay Kichlu",           detail: "Agra Gharana" },
  { name: "Pt. Uday Bhawalkar",         detail: "Dhrupad tradition · ongoing" },
];

const WORKSHOPS = [
  {
    img:      "/assets/T1.jpg",
    title:    "Raga Yaman",
    subtitle: "An evening raga — alaap, jod and khayal bandish",
    tags:     ["Beginner Friendly", "2 hr Session"],
    url:      "#",
  },
  {
    img:      "/assets/T2.jpg",
    title:    "Bhairavi Masterclass",
    subtitle: "The raga of farewell — grammar, ornamentation and thumri",
    tags:     ["Intermediate", "3 hr Session"],
    url:      "#",
  },
  {
    img:      "/assets/T3.jpg",
    title:    "Thumri & Dadra",
    subtitle: "Light classical forms — emotion, text and improvisation",
    tags:     ["2 yr+ Trained", "2 hr Session"],
    url:      "#",
  },
  {
    img:      "/assets/T4.jpg",
    title:    "Sur & Laya",
    subtitle: "Melody and rhythm in dialogue — layakari and tala",
    tags:     ["All Levels", "1.5 hr Session"],
    url:      "#",
  },
  {
    img:      "/assets/YT1.jpg",
    title:    "Raga Bhimpalasi",
    subtitle: "An afternoon raga of longing — detailed raga study",
    tags:     ["Intermediate", "2 hr Session"],
    url:      "#",
  },
  {
    img:      "/assets/YT2.jpg",
    title:    "Khayal Bandish",
    subtitle: "Rare compositions from the Benaras and Senia traditions",
    tags:     ["5 yr+ Trained", "3 hr Session"],
    url:      "#",
  },
  {
    img:      "/assets/YT3.jpg",
    title:    "Voice & Swara",
    subtitle: "Swara placement, shruti sensitivity and resonance training",
    tags:     ["All Levels", "2 hr Session"],
    url:      "#",
  },
  {
    img:      "/assets/YT4.jpg",
    title:    "Raga Darbari",
    subtitle: "A late-night raga — meditative, profound, profound",
    tags:     ["5 yr+ Trained", "2.5 hr Session"],
    url:      "#",
  },
];

const YT_SERIES = [
  {
    seriesLabel:  "Series 01",
    title:        "Raga Shastra",
    subtitle:     "An in-depth exploration of ragas — their grammar, history and emotional essence",
    playlistUrl:  "https://www.youtube.com/@DebapriyaAdhikary",
    videos: [
      { img: "/assets/YT1.jpg", title: "Raga Bhimpalasi", url: "https://youtu.be/eBkjaI4xKws?si=c1gSfrvpS2fp_6MF" },
      { img: "/assets/YT2.jpg", title: "Raga Todi",       url: "https://youtu.be/lLxwR76qgWc?si=sUUmdwuxIhIt0qmo" },
      { img: "/assets/YT3.jpg", title: "Raga Kafi",       url: "https://youtu.be/1X_gCl0fdbw?si=Ea8F2PqNCCTYraZi" },
      { img: "/assets/YT4.jpg", title: "Raga Bhairav",    url: "https://youtu.be/z6YQ6oldjwM?si=ysW-LKXwHut5qzDq" },
    ],
  },
  {
    seriesLabel:  "Series 02",
    title:        "Learn Hindustani Classical Vocal Online",
    subtitle:     "Structured lessons for aspiring singers — from foundational sur to raga study",
    playlistUrl:  "https://www.youtube.com/@DebapriyaAdhikary",
    videos: [
      { img: "/assets/YT1.jpg", title: "Lesson 01 · Sur & Swara",   url: "#" },
      { img: "/assets/YT2.jpg", title: "Lesson 02 · Alankaar",      url: "#" },
      { img: "/assets/YT3.jpg", title: "Lesson 03 · Raga Grammar",  url: "#" },
      { img: "/assets/YT4.jpg", title: "Lesson 04 · Bandish",       url: "#" },
    ],
  },
];

// ── GOLDEN WAVES ──────────────────────────────────────────────────────────────
const GoldenWaves = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NUM = 38, SPEED = 0.004;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height, cy = H * 0.5;

      for (let i = 0; i < NUM; i++) {
        const norm       = i / (NUM - 1);
        const offset     = (norm - 0.5) * 2;
        const brightness = Math.pow(1 - Math.abs(offset), 1.6);
        const alpha      = brightness * 0.18;

        ctx.strokeStyle = `rgba(201,164,85,${alpha.toFixed(3)})`;
        ctx.lineWidth   = 0.75;
        ctx.beginPath();

        for (let x = 0; x <= W; x += 2) {
          const xp    = x / W;
          const wave1 = Math.sin(xp * Math.PI * 2.2 - t + offset * 0.6) * H * 0.16;
          const wave2 = Math.sin(xp * Math.PI * 4.4 + t * 0.55 + offset * 1.2) * H * 0.05;
          const spread = offset * H * 0.12;
          const y = cy + wave1 + wave2 + spread;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += SPEED;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.5 }}
    />
  );
};

// ── DIVIDER ───────────────────────────────────────────────────────────────────
const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-[#c9a455]/30" />
    <span className="text-[#c9a455]/35 text-[8px]">◆</span>
    <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-[#c9a455]/30" />
  </div>
);

// ── SECTION LABEL ─────────────────────────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="h-[1px] w-10 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
      {text}
    </span>
  </div>
);

// ── PLAY ICON ─────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <polygon points="5,3 18,10 5,17" fill="#c9a455" />
  </svg>
);

// ── CTA BUTTON ────────────────────────────────────────────────────────────────
const CtaLink = ({ href, children }) => (
  <a
    href={href}
    className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.3em] uppercase
               text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
               hover:border-[#c9a455] hover:bg-[#c9a455]/5
               transition-all duration-300 group"
  >
    {children}
    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
  </a>
);

// ── WHATSAPP ICON ─────────────────────────────────────────────────────────────
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
const Learn = () => {
  const heroImgRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "", email: "", interest: "Classes", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { scrollYProgress: heroProg } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  const heroRaw   = useTransform(heroProg, [0, 1], [1.0, 1.12]);
  const heroScale = useSpring(heroRaw, { stiffness: 40, damping: 20 });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="overflow-x-hidden">

      {/* ════════════════════════════════════════════════════
          OPENER + CLASSES  (text left · image + lineage right)
      ════════════════════════════════════════════════════ */}
      <section ref={heroImgRef} className="relative overflow-hidden pt-20 md:pt-28 pb-10 md:pb-16">
        <GoldenWaves />

        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">
        <div className="flex items-start gap-16 lg:gap-24">

          {/* ── LEFT — opener → what you learn → WA button ── */}
          <div className="flex-1 min-w-0">

            {/* Opener — do not change */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="mb-10"
            >
              <SectionLabel text="Learn" />

              <h1 className="font-cinzel font-semibold
                             text-[2rem] md:text-[2.6rem] lg:text-[3rem]
                             text-[#f0e6d0] tracking-wide leading-tight mb-2">
                Study the Art
              </h1>

              <p className="font-playfair italic text-[#c9a455]/80
                            text-[0.95rem] md:text-[1.05rem] tracking-wide mb-6">
                Hindustani Classical Vocal Training
              </p>

              <p className="font-jost font-light text-[#a08060]
                            text-[0.88rem] md:text-[0.93rem] leading-[1.9]">
                Study directly under a{" "}
                <span className="text-[#c9a455]/80 font-normal">National Award-winning artist</span>{" "}
                trained under Padma Vibhushan{" "}
                <span className="text-[#c9a455]/80 font-normal">Dr. Girija Devi</span>{" "}
                and the masters of India's great gharanas. An unhurried, deeply personal
                approach — shaped around your voice, your pace, and your artistic vision.
              </p>
            </motion.div>

            {/* 01 · Classes heading */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 1.4 }}
            >
              <SectionLabel text="01 · Classes" />
              <h2 className="font-cinzel font-semibold text-[2rem] md:text-[2.6rem]
                             text-[#f0e6d0] tracking-wide leading-tight mb-2">
                One-on-One Training
              </h2>
              <p className="font-playfair italic text-[#c9a455]/80 text-[1rem] mb-6">
                In the living tradition of guru-shishya parampara
              </p>

              <div className="space-y-3 font-jost font-light text-[#a08060]
                              text-[0.88rem] md:text-[0.93rem] leading-[1.9] mb-8">
                <p>
                  Training is offered both{" "}
                  <span className="text-[#c9a455]/80 font-normal">online and in-person</span>,
                  structured around your schedule and pace of learning. Sessions are conducted
                  in Bengali, Hindi, or English.
                </p>
                <p>
                  The curriculum unfolds organically — from foundational sur and voice
                  placement into raga grammar, composition, and the subtleties of
                  improvisation. No rigid syllabus; the path is drawn by the student's
                  ear and readiness.
                </p>
              </div>

              {/* What You Will Learn */}
              <p className="font-jost text-[11px] tracking-[0.4em] uppercase
                             text-[#c9a455]/70 mb-4 flex items-center gap-3">
                <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
                What You Will Learn
              </p>
              <div className="space-y-3">
                {WHAT_YOU_LEARN.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  >
                    <span className="text-[#c9a455]/40 text-[7px] mt-[0.42rem] shrink-0">◆</span>
                    <p className="font-jost font-light text-[0.88rem] leading-relaxed">
                      <span className="text-[#f0e6d0]/80 font-normal">{item.label}</span>
                      <span className="text-[#a08060]/60"> — {item.detail}</span>
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* WhatsApp Enquire Now */}
            <motion.a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-4 font-jost text-[11px]
                         tracking-[0.35em] uppercase bg-[#c9a455] text-[#120a05]
                         px-14 py-4 hover:bg-[#d4b472] transition-colors duration-300"
            >
              <WhatsAppIcon />
              Enquire Now
            </motion.a>

          </div>

          {/* ── RIGHT — image · quote · trained under ── */}
          <div className="hidden lg:flex flex-col w-[46%] shrink-0">

            {/* Artist image */}
            <motion.img
              src="/assets/Classes.png"
              alt="Debapriya Adhikary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{
                width:           "100%",
                height:          "82vh",
                objectFit:       "contain",
                objectPosition:  "center center",
                scale:           heroScale,
                transformOrigin: "center center",
                filter:          "brightness(0.82) sepia(0.10)",
                maskImage: `radial-gradient(ellipse 80% 90% at 50% 50%,
                  black 30%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(ellipse 80% 90% at 50% 50%,
                  black 30%, transparent 100%)`,
              }}
            />

            {/* Quote */}
            <motion.blockquote
              className="border-l-2 border-[#c9a455]/30 pl-5 mb-9"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
              <p className="font-playfair italic text-[#f0e6d0]/50
                            text-[0.88rem] leading-[1.85]">
                "Music is not merely a skill to be learned — it is a way of perceiving
                the world. My teaching begins not with notes, but with listening."
              </p>
            </motion.blockquote>

            {/* Trained Under */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <p className="font-jost text-[11px] tracking-[0.4em] uppercase
                             text-[#c9a455]/70 mb-4 flex items-center gap-3">
                <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
                Trained Under
              </p>
              <div className="space-y-4 border-l border-[#c9a455]/15 pl-5">
                {GURUS.map((g, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                  >
                    <p className="font-cinzel text-[0.82rem] tracking-wide text-[#c9a455]/65">
                      {g.name}
                    </p>
                    <p className="font-jost font-light text-[0.78rem] text-[#a08060]/50 leading-relaxed">
                      {g.detail}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════
          02 · WORKSHOPS
      ════════════════════════════════════════════════════ */}
      <section className="py-10 md:py-16">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">

          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel text="02 · Workshops" />
            <h2 className="font-cinzel font-semibold text-[2rem] md:text-[2.6rem]
                           text-[#f0e6d0] tracking-wide leading-tight mb-2">
              Recorded Workshop Library
            </h2>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1rem] mb-5">
              Deep dives into raga, composition, tala &amp; the philosophy of Hindustani music
            </p>
            <p className="font-jost font-light text-[#a08060]
                          text-[0.88rem] md:text-[0.93rem] leading-[1.9] max-w-2xl">
              Each recording is a complete immersive session — structured for focused study
              and designed to be revisited. Purchase individually and learn at your own pace.
            </p>
          </motion.div>

          {/* 4×2 Workshop Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {WORKSHOPS.map((w, i) => (
              <motion.a
                key={i}
                href={w.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border border-[#c9a455]/20
                           hover:border-[#c9a455]/45 transition-colors duration-400
                           overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              >
                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden shrink-0">
                  <img
                    src={w.img}
                    alt={w.title}
                    className="w-full h-full object-cover transition-transform duration-500
                               group-hover:scale-[1.06]"
                    style={{ filter: "brightness(0.50) sepia(0.18)" }}
                  />
                  {/* Buy overlay on hover */}
                  <div className="absolute inset-0 bg-[#120a05]/0 group-hover:bg-[#120a05]/55
                                  flex items-center justify-center transition-all duration-350">
                    <span
                      className="opacity-0 group-hover:opacity-100 translate-y-2
                                 group-hover:translate-y-0 transition-all duration-300
                                 font-jost text-[9px] tracking-[0.35em] uppercase
                                 text-[#c9a455] border border-[#c9a455]/60 px-4 py-2"
                    >
                      Buy Recording
                    </span>
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-4 bg-[#0d0703]/60">
                  <p className="font-cinzel text-[0.82rem] tracking-wide text-[#f0e6d0]/85
                                leading-snug mb-1 group-hover:text-[#c9a455]/80
                                transition-colors duration-300">
                    {w.title}
                  </p>
                  <p className="font-playfair italic text-[#a08060]/60 text-[0.76rem]
                                leading-relaxed mb-3 flex-1">
                    {w.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {w.tags.map((tag, t) => (
                      <span
                        key={t}
                        className="font-jost text-[7.5px] tracking-[0.25em] uppercase
                                   text-[#c9a455]/55 border border-[#c9a455]/20 px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Stay Tuned CTA */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            <a
              href="https://linktr.ee/debapriyaadhikary"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-jost text-[10px]
                         tracking-[0.3em] uppercase text-[#c9a455]
                         border border-[#c9a455]/40 px-8 py-3
                         hover:border-[#c9a455] hover:bg-[#c9a455]/5
                         transition-all duration-300 group"
            >
              <span className="text-[#c9a455]/50 text-[8px]">◆</span>
              Stay Tuned for Upcoming Workshops
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

        </div>
      </section>

      <Divider />

      {/* ════════════════════════════════════════════════════
          03 · FREE RESOURCES
      ════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-18">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">

          {/* Section header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel text="03 · Public Domain Resources" />
            <h2 className="font-cinzel font-semibold text-[2rem] md:text-[2.6rem]
                           text-[#f0e6d0] tracking-wide leading-tight mb-2">
              Open to All
            </h2>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1rem] mb-4">
              Two ongoing YouTube series — freely available, no enrolment required
            </p>
            <p className="font-jost font-light text-[#a08060] text-[0.9rem]
                          leading-[1.9] max-w-2xl">
              A growing library of recordings for anyone who wishes to listen, observe and absorb.
              Each series has a distinct focus — explore both and find where you wish to begin.
            </p>
          </motion.div>

          {/* Two series stacked */}
          <div className="space-y-14">
            {YT_SERIES.map((series, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: si * 0.1 }}
              >
                {/* Series header row */}
                <div className="flex items-end justify-between mb-5 pb-4
                                border-b border-[#c9a455]/25">
                  <div>
                    <span className="font-jost text-[10px] tracking-[0.4em] uppercase
                                     text-[#c9a455]/50 block mb-1">
                      {series.seriesLabel}
                    </span>
                    <h3 className="font-cinzel text-[1.15rem] md:text-[1.35rem]
                                   text-[#f0e6d0]/90 tracking-wide leading-tight mb-1">
                      {series.title}
                    </h3>
                    <p className="font-playfair italic text-[#a08060]/70 text-[0.85rem]">
                      {series.subtitle}
                    </p>
                  </div>
                  <a
                    href={series.playlistUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 ml-8 inline-flex items-center gap-2 font-jost
                               text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/60
                               hover:text-[#c9a455] transition-colors duration-300 group"
                  >
                    View Full Playlist
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </a>
                </div>

                {/* Thumbnails */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {series.videos.map((v, vi) => (
                    <motion.a
                      key={vi}
                      href={v.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: vi * 0.08 }}
                      whileHover={{ y: -4 }}
                    >
                      <div className="relative aspect-video overflow-hidden mb-2">
                        <img
                          src={v.img}
                          alt={v.title}
                          className="w-full h-full object-cover transition-transform
                                     duration-500 group-hover:scale-[1.06]"
                          style={{ filter: "brightness(0.75)" }}
                        />
                        <div className="absolute inset-0 bg-[#120a05]/0
                                        group-hover:bg-[#120a05]/50
                                        flex items-center justify-center
                                        transition-all duration-300">
                          <div className="opacity-0 group-hover:opacity-100
                                          scale-75 group-hover:scale-100
                                          transition-all duration-300
                                          w-10 h-10 rounded-full border border-[#c9a455]
                                          flex items-center justify-center
                                          backdrop-blur-sm bg-[#120a05]/40">
                            <PlayIcon />
                          </div>
                        </div>
                        <div className="absolute inset-0 border border-[#c9a455]/0
                                        group-hover:border-[#c9a455]/40
                                        transition-colors duration-300 pointer-events-none" />
                      </div>
                      <p className="font-cinzel text-[0.7rem] tracking-wide
                                    text-[#f0e6d0]/55
                                    group-hover:text-[#c9a455]/80
                                    transition-colors duration-300">
                        {v.title}
                      </p>
                    </motion.a>
                  ))}
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Divider />

     

    </main>
  );
};

export default Learn;
