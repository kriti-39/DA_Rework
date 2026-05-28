import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";

// ── GOLDEN WAVES (same as Hero) ───────────────────────────
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

    const NUM   = 38;
    const SPEED = 0.004;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W  = canvas.width;
      const H  = canvas.height;
      const cy = H * 0.5;

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

// ── AWARDS TIMELINE ──────────────────────────────────────
const AWARDS = [
  { year: "1994",    title: "First Prize · Inter District Music Competition",         org: "Dhanbad",                                                                  highlight: false },
  { year: "2001",    title: "First Prize · Akhil Bharatiya Sangeet Pratiyogita",      org: "Prayag Sangeet Samiti, Allahabad",                                          highlight: false },
  { year: "2001–02", title: "Inter College & East Zonal Youth Festival",              org: "AIU, Govt. of India · Vinoba Bhave University & ISM Dhanbad",               highlight: false },
  { year: "2002",    title: "All India Radio National Music Competition",              org: "Award conferred on behalf of the President of India",                       highlight: true  },
  { year: "2003",    title: "ITC–SRA Promising Artiste Award",                        org: "ITC–Sangeet Research Academy, Mumbai",                                      highlight: false },
  { year: "2004",    title: "Golden Talent Contest",                                  org: "Pandit Ravi Kichlu Foundation",                                             highlight: false },
  { year: "2006",    title: "Master of Music · Topper",                            org: "University of Calcutta",                                                    highlight: false },
  { year: "2018",    title: "National Film Award",                                    org: "Conferred by the Hon'ble President of India · Girija – A Lifetime in Music", highlight: true  },
  { year: "2019",    title: "Person Who Cares for Art of the East",                   org: "Sharq Taronalari International Music Festival · UNESCO & Ministry of Culture, Govt. of Uzbekistan", highlight: false },
];

const FELLOWSHIPS = [
  { period: "2015–16", title: "National Junior Fellowship",  org: "Ministry of Culture, Govt. of India" },
  { period: "2003–05", title: "National Scholarship",        org: "Ministry of Culture, Govt. of India" },
  { period: "2005–10", title: "Jnana Pravaha Scholarship",   org: ""                                    },
];

const AFFILIATIONS = [
  "Member, Indian Council for Cultural Relations (ICCR)",
  "Diploma in Personal Fitness Training & Certified Nutritionist (2021)",
  "Associate Certified Pranic Healer",
];

// ── GALLERY — infinite marquee ────────────────────────────
// Add / remove images here freely — strip loops automatically
const GALLERY_IMGS = [
  "/assets/AG1.jpg",
  "/assets/AG2.jpeg",
  "/assets/AG3.jpg",
  "/assets/AG4.jpg",
  "/assets/AG5.jpg",
  "/assets/AG6.jpg",
  "/assets/AG7.jpg",
];
// Doubled so the loop is seamless: translateX(-50%) scrolls exactly one full set
const MARQUEE_IMGS = [...GALLERY_IMGS, ...GALLERY_IMGS];
const G_CARD_W = 420;   // card width  (px)
const G_CARD_H = 360;   // card height (px)
// Vertical stagger offsets — mirrors the 3-column mosaic rhythm
//   i%3 === 0 → lower   (col-1)
//   i%3 === 1 → top     (col-2)
//   i%3 === 2 → middle  (col-3)
const G_STAGGER = [60, 0, 30];   // px — marginTop per card position
const G_GAP     = 22;            // px — gap between cards (must match the strip's gap)

// ── ORNAMENTAL DIVIDER ────────────────────────────────────
const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-[#c9a455]/30" />
    <span className="text-[#c9a455]/35 text-[8px]">◆</span>
    <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-[#c9a455]/30" />
  </div>
);

// ── SECTION LABEL ─────────────────────────────────────────
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="h-[1px] w-10 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
      {text}
    </span>
  </div>
);

// ── MAIN ─────────────────────────────────────────────────
const About = () => {
  const girijaRef    = useRef(null);
  const heroImgRef   = useRef(null);
  const about3Ref    = useRef(null);
  const awardsImgRef = useRef(null);

  // AboutHero.png scroll zoom
  const { scrollYProgress: heroProg } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  const heroRaw   = useTransform(heroProg, [0, 1], [1.0, 1.12]);
  const heroScale = useSpring(heroRaw, { stiffness: 40, damping: 20 });

  // About3.png scroll zoom
  const { scrollYProgress: about3Prog } = useScroll({
    target: about3Ref,
    offset: ["start end", "end start"],
  });
  const about3Raw   = useTransform(about3Prog, [0, 1], [1.0, 1.12]);
  const about3Scale = useSpring(about3Raw, { stiffness: 40, damping: 20 });

  // AwardsImg.png scroll zoom
  const { scrollYProgress: awardsImgProg } = useScroll({
    target: awardsImgRef,
    offset: ["start end", "end start"],
  });
  const awardsImgRaw   = useTransform(awardsImgProg, [0, 1], [1.0, 1.12]);
  const awardsImgScale = useSpring(awardsImgRaw, { stiffness: 40, damping: 20 });

  // Girija bg zoom
  const { scrollYProgress: girjaProg } = useScroll({
    target: girijaRef,
    offset: ["start end", "end start"],
  });
  const girijaRaw   = useTransform(girjaProg, [0, 1], [1.0, 1.08]);
  const girijaScale = useSpring(girijaRaw, { stiffness: 40, damping: 20 });

  // ── Gallery marquee + lightbox ──────────────────────────
  const [lbIdx,         setLbIdx]         = useState(null);  // null = closed
  const [marqueePaused, setMarqueePaused] = useState(false);
  const N = GALLERY_IMGS.length;

  const closeLb = ()  => setLbIdx(null);
  const lbPrev  = (e) => { e.stopPropagation(); setLbIdx(i => (i - 1 + N) % N); };
  const lbNext  = (e) => { e.stopPropagation(); setLbIdx(i => (i + 1) % N); };

  return (
    <main className="overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          OPENER — two-column editorial layout
      ══════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        {/* Golden waves in background */}
        <GoldenWaves />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24
                        flex flex-col lg:flex-row items-start gap-10 lg:gap-16">

          {/* ── LEFT COLUMN ── */}
          <div className="flex-1 min-w-0 flex flex-col">

            {/* Name / tagline block */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <SectionLabel text="About" />

              <h1 className="font-cinzel font-semibold
                             text-[2rem] md:text-[2.6rem] lg:text-[3rem]
                             text-[#f0e6d0] tracking-wide leading-tight ">
                Debapriya Adhikary
              </h1>

              <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] md:text-[1.05rem]
                            tracking-wide mb-6">
                Singer · Composer · Mentor · Producer
              </p>

              {/* Paragraphs 1 & 2 */}
              <div className="space-y-4 font-jost font-light text-[#a08060]
                              text-[0.88rem] md:text-[0.93rem] leading-[1.9] mb-2">
                <p className="font-playfair italic text-[#f0e6d0]/50 text-[0.9rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-4">
                  "I didn't begin learning music with the intention of becoming a professional performer.
                  My mother always said that music is the greatest form of wisdom — something I should
                  embrace as a lifelong companion."
                </p>
                <p>
                  Born in the industrial township of <span className="text-[#c9a455]/80 font-normal">Sindri, Jharkhand</span>,
                  into a simple, educated Bengali family, Debapriya showed a natural inclination toward
                  the arts from childhood. He never formally learned the seven notes by sitting with a
                  teacher — instead, he absorbed them by listening to his mother,{" "}
                  <span className="text-[#c9a455]/80 font-normal">Anita Adhikary</span>, sing and practice.
                  She was herself a disciple of Pt. Jivnath Jha — popularly known as Taanraj.
                </p>
                <p>
                  Recognising the spark in her son, she took him to{" "}
                  <span className="text-[#c9a455]/80 font-normal">Pt. Samaresh Chawdhury</span> of the
                  Senia and Maihar gharanas, who accepted Debapriya as his Gandabandh disciple. From the
                  age of eight, he trained under him for fourteen years — his mother travelling long
                  distances from Sindri to Durgapur, allowing no excuse: not weather, not festivals,
                  not circumstance.
                </p>
              </div>
            </motion.div>

            {/* About3.png — scroll zoom */}
            <div ref={about3Ref} className="overflow-hidden mb-4">
              <motion.img
                src="/assets/About3.png"
                alt=""
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                style={{
                  width: "100%",
                  objectFit: "contain",
                  scale: about3Scale,
                  transformOrigin: "center center",
                  filter: "brightness(0.82) sepia(0.10)",
                  maskImage:
                    "radial-gradient(ellipse 90% 88% at 50% 50%, black 32%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 90% 88% at 50% 50%, black 32%, transparent 100%)",
                }}
              />
            </div>

            {/* Para 3 & 4 + Musical Journey start — below About3.png */}
            <motion.div
              className="space-y-4 font-jost font-light text-[#a08060]
                          text-[0.88rem] md:text-[0.93rem] leading-[1.9] pt-2 pb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="font-playfair italic text-[#f0e6d0]/50 text-[0.9rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-4">
                "Mom never allowed any excuse when it came to learning. I remember once she got
                completely drenched in heavy rain while taking me to the railway station — she remained
                wet, standing near the door for four hours just to dry herself, yet never suggested
                skipping the class."
              </p>
              <p>
                Under Pt. Chawdhury's guidance, Debapriya developed deep insights into voice culture,
                smoothness, and clarity in executing intricate trills — a foundation that would shape
                everything to come. His training was not merely technical; it was a formation of
                character, patience, and the capacity to truly listen.
              </p>

              {/* Musical Journey starts here on the left */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-[1px] w-6 bg-[#c9a455]/50" />
                <span className="font-jost text-[14px] tracking-[0.4em] uppercase text-[#c9a455]/70">
                  Musical Journey
                </span>
              </div>
              <p>
                His musical journey further flourished under the legendary{" "}
                <span className="text-[#c9a455]/80 font-normal">Padma Vibhushan awardee Dr. Girija Devi</span>{" "}
                of the Benaras gharana, with whom he trained as a Gandabandh disciple for eleven years.
                Under her guidance, he mastered Thumri, Tappa, Tap-Thumri, Dadra, Kajri, and Jhula —
                along with rare compositions and the khayal tradition of Benaras. Dr. Girija Devi enriched
                his artistry with strength, depth, and the vision to go beyond mere notes and words.
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="w-full lg:w-[48%] shrink-0 flex flex-col">

            {/* AboutHero.png — scroll zoom */}
            <div ref={heroImgRef} className="overflow-hidden" style={{ minHeight: "60vh" }}>
              <motion.img
                src="/assets/AboutHero.png"
                alt="Debapriya Adhikary"
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 3.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
                style={{
                  width: "100%",
                  objectFit: "contain",
                  scale: heroScale,
                  transformOrigin: "center center",
                  filter: "brightness(0.88) sepia(0.08)",
                  maskImage:
                    "radial-gradient(ellipse 88% 90% at 50% 48%, black 32%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 88% 90% at 50% 48%, black 32%, transparent 100%)",
                }}
              />
            </div>

            {/* Paras — right column, Musical Journey */}
            <motion.div
              className="space-y-4 font-jost font-light text-[#a08060]
                         text-[0.88rem] md:text-[0.93rem] leading-[1.9] px-2 pb-16 mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <p>
                He also received guidance from{" "}
                <span className="text-[#c9a455]/80 font-normal">Pt. Kumar Prasad Mukherjee</span> of the
                Agra and Rampur-Sahaswan traditions, and from{" "}
                <span className="text-[#c9a455]/80 font-normal">Pt. Vijay Kichlu</span> of the Agra gharana —
                who gifted him numerous bandishes and a refined perspective on the technical beauty of ragas.
              </p>
              <p>
                His ability to blend tradition with innovation, combined with over three decades of rigorous
                training, sets him apart. An{" "}
                <span className="text-[#c9a455]/80 font-normal">A-Grade artiste of All India Radio</span> and
                a <span className="text-[#c9a455]/80 font-normal">National and President's Award winner</span>,
                his clarity in executing gamaks, intricate taans, meends, and swargam has earned him
                admiration worldwide.
              </p>
              <p>
                He holds a Master's degree in Music and was awarded the{" "}
                <span className="text-[#c9a455]/80 font-normal">Junior Research Fellowship</span> by the
                Ministry of Culture, Government of India, for his research on the history of Thumri and the
                contribution of Girija Devi. At present, he continues to refine his artistry under{" "}
                <span className="text-[#c9a455]/80 font-normal">Pt. Uday Bhawalkar</span>, focusing on the
                nuances of Dhrupad.
              </p>
            </motion.div>

          </div>

        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          LEGACY — full-bleed bg, text left, video right
      ══════════════════════════════════════════════════ */}
      <section ref={girijaRef} className="relative overflow-hidden">

        {/* Background — GirijaJi.png, left side only, no crop */}
        <motion.div
          className="absolute left-0 top-6 bottom-0 w-[54%] pointer-events-none"
          style={{ scale: girijaScale, transformOrigin: "left center" }}
        >
          <img
            src="/assets/GirijaJi.png"
            alt=""
            className="w-full h-full"
            style={{
              objectFit: "contain",
              objectPosition: "left 35%",
              filter: "brightness(0.26) sepia(0.25)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 38%, black 100%)," +
                "linear-gradient(to right, black 50%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 38%, black 100%)," +
                "linear-gradient(to right, black 50%, transparent 100%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "destination-in",
            }}
          />
        </motion.div>

        {/* Two-column content on top of bg */}
        <div className="relative z-10 w-full max-w-[1400px] mx-auto
                        px-8 md:px-16 lg:px-24 pt-10 pb-20 md:pt-12 md:pb-20
                        flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* ── LEFT — label, heading, paragraphs ── */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel text="The Torchbearer" />

            <h2 className="font-cinzel font-semibold
                           text-[2rem] md:text-[2.6rem] lg:text-[3rem]
                           text-[#f0e6d0] tracking-wide leading-tight mb-2">
              Padma Vibhushan Girija Devi
            </h2>

            <p className="font-playfair italic text-[#c9a455]/80
                          text-[0.95rem] md:text-[1.05rem] tracking-wide mb-5">
              Thumri Queen ·  Gurumaa
            </p>

            <div className="space-y-5 font-jost font-light text-[#a08060]
                            text-[0.88rem] md:text-[0.93rem] leading-[1.9]">
              <p>
                <span className="font-playfair italic text-[#f0e6d0]/55">Girija – A Lifetime in Music</span>{" "}
                is a heartfelt tribute by the duo to their revered Gurumaa, the legendary Girija Devi.
                The film reflects not only her musical brilliance but also the spiritual depth and
                human simplicity that defined her life.
              </p>

              {/* Duo's quote */}
              <p className="font-playfair italic text-[#f0e6d0]/50 text-[0.9rem] leading-[1.85]
                             border-l-2 border-[#c9a455]/30 pl-4">
                "Our thought was to let the world know about her vision, through which she could
                build a beautiful bridge between the living world and the spiritual realms. She could
                effortlessly break through paradigms and create beauty with simple words, relating
                them to daily life. We used to be awestruck by her simplicity, nurtured in the midst
                of her divinity." … the duo says. "Life was never so beautiful until we began to see
                music through her, and understand the subtleties she revealed with every word of
                music she uttered."
              </p>

              {/* Ornamental name break */}
              <div className="flex items-center gap-4 py-1">
                <div className="h-[1px] flex-1 bg-gradient-to-r from-[#c9a455]/25 to-transparent" />
                <span className="font-cinzel text-[#c9a455]/40 text-[0.7rem] tracking-[0.4em] uppercase">
                  Girija Devi
                </span>
                <div className="h-[1px] flex-1 bg-gradient-to-l from-[#c9a455]/25 to-transparent" />
              </div>

              <p>
                This national and international award-winning documentary offers a visual journey
                through the legend's music, philosophy, ideas, and inspiration. It portrays the
                struggle of a woman navigating the socio-economic transformations of India's pre-
                and post-independence eras — how she upheld her artistic integrity in a
                male-dominated society and emerged as an enduring example of strength and grace.
              </p>
              <p >
              The film features anecdotes and interviews with stalwarts and legends such as{" "}
              <span className="text-[#c9a455]/80 font-normal">Ravi Shankar, Kishori Amonkar,
              Abdul Rashid Khan, Birju Maharaj, Amjad Ali Khan,</span>{" "}
              and Rajan &amp; Sajan Mishra, among many others — a valuable resource for
              students, connoisseurs, and lovers of Indian classical music.
            </p>
              
            </div>
          </motion.div>

          {/* ── RIGHT — gratitude quote + video, starts level with left paras ── */}
          <motion.div
            className="w-full lg:w-[46%] shrink-0 flex flex-col gap-7 lg:pt-[11.5rem]"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            {/* Legends para */}
            
            <p className="font-playfair italic text-[#f0e6d0]/50 text-[0.9rem] leading-[1.85]
                           border-l-2 border-[#c9a455]/30 pl-4">
              "We are immensely grateful to the entire team of the film, including{" "}
              <span className="not-italic font-jost font-light text-[#a08060]">
                Madhu Chandra and Sudha Datta
              </span>{" "}
              as producers; our co-director and editor{" "}
              <span className="not-italic font-jost font-light text-[#a08060]">Sankalp Meshram</span>;
              cinematographers{" "}
              <span className="not-italic font-jost font-light text-[#a08060]">Naiyer Ghufran and Prabal Bose</span>;
              sound engineer{" "}
              <span className="not-italic font-jost font-light text-[#a08060]">Partha Sarathi Sanyal</span>;
              sound mixer{" "}
              <span className="not-italic font-jost font-light text-[#a08060]">Ajay PB</span>;
              and many more, for making this dream project a real historical gem."
              <span className="block mt-2 not-italic font-jost text-[10px] tracking-[0.3em] uppercase
                               text-[#c9a455]/50">
                — Debapriya Adhikary &amp; Samanwaya Sarkar
              </span>
            </p>

            {/* YouTube embed */}
            <div>
              <div
                className="relative w-full"
                style={{
                  paddingBottom: "56.25%",
                  border: "1px solid rgba(201,164,85,0.30)",
                  boxShadow: "0 0 48px rgba(201,164,85,0.08)",
                }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/Ooz9sy3YHeo"
                  title="Girija – A Lifetime in Music"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="font-jost text-[10px] tracking-[0.35em] uppercase
                            text-[#a08060]/80 mt-3">
                Documentary · Girija – A Lifetime in Music
              </p>
            </div>
          </motion.div>

        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          RECOGNITION — timeline left, image + fellowships right
      ══════════════════════════════════════════════════ */}
      <section className="pt-8 pb-20 md:pt-12 md:pb-28">
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

            {/* ── LEFT — Heading + Awards Timeline ── */}
            <div className="flex-1 min-w-0">

              {/* Heading lives here so image aligns level with it */}
              <motion.div
                className="mb-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <SectionLabel text="Recognition" />
                <h2 className="font-cinzel text-[2rem] md:text-[2.8rem] text-[#f0e6d0]
                               tracking-wider leading-none">
                  A Life in Music
                </h2>
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical gold line */}
                <div className="absolute left-[3.8rem] top-0 bottom-0 w-[1px]
                                bg-gradient-to-b from-[#c9a455]/40 via-[#c9a455]/20 to-transparent" />

                <div className="space-y-0">
                  {AWARDS.map((award, i) => (
                    <motion.div
                      key={i}
                      className="relative pl-[5.2rem] group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 }}
                    >
                      {/* Year — sits left of the line */}
                      <span className={`absolute left-0 top-[1rem] w-[3.3rem] text-right
                                        font-cinzel text-[0.72rem] tracking-[0.1em] leading-none
                                        ${award.highlight ? "text-[#c9a455]" : "text-[#c9a455]/45"}`}>
                        {award.year}
                      </span>

                      {/* Diamond — centered ON the line */}
                      <span className={`absolute left-[3.8rem] -translate-x-1/2 top-[1.02rem]
                                        text-[6px] leading-none
                                        ${award.highlight ? "text-[#c9a455]" : "text-[#c9a455]/35"}`}>
                        ◆
                      </span>

                      {/* Content */}
                      <div
                        className="border-b py-4"
                        style={{
                          borderColor: award.highlight
                            ? "rgba(201,164,85,0.22)"
                            : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <p className={`font-cinzel text-[0.9rem] tracking-wide leading-snug mb-1
                                      ${award.highlight
                                        ? "text-[#f0e6d0] font-semibold"
                                        : "text-[#f0e6d0]/75 font-normal"}`}>
                          {award.title}
                          {award.highlight && (
                            <span className="ml-2 font-jost text-[7px] tracking-[0.3em] uppercase
                                             text-[#c9a455] align-middle">★</span>
                          )}
                        </p>
                        <p className="font-jost font-light text-[0.82rem] text-[#a08060]/55
                                     tracking-[0.04em] leading-relaxed">
                          {award.org}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT — Image + Fellowships + Affiliations ── */}
            <motion.div
              className="w-full lg:w-[36%] shrink-0 space-y-5"
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              {/* Awards image at top — scroll zoom, uncropped */}
              <div ref={awardsImgRef} className="overflow-hidden -mx-2">
                <motion.img
                  src="/assets/AwardsImg.png"
                  alt=""
                  style={{
                    width: "100%",
                    objectFit: "contain",
                    display: "block",
                    scale: awardsImgScale,
                    transformOrigin: "center center",
                    filter: "brightness(0.80) sepia(0.12)",
                    maskImage:
                      "radial-gradient(ellipse 92% 88% at 50% 50%, black 30%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 92% 88% at 50% 50%, black 30%, transparent 100%)",
                  }}
                />
              </div>

              {/* Fellowships */}
              <div>
                <p className="font-jost text-[11px] tracking-[0.4em] uppercase
                               text-[#c9a455]/70 mb-6 flex items-center gap-3">
                  <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
                  Fellowships &amp; Scholarships
                </p>
                <div className="space-y-5">
                  {FELLOWSHIPS.map((f, i) => (
                    <motion.div
                      key={i}
                      className="border-l-2 border-[#c9a455]/20 pl-4 group
                                 hover:border-[#c9a455]/50 transition-colors duration-300"
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: i * 0.15 }}
                    >
                      <p className="font-cinzel text-[0.82rem] tracking-wide text-[#c9a455]/60 mb-0.5">
                        {f.period}
                      </p>
                      <p className="font-jost font-light text-[0.9rem] text-[#f0e6d0]/75 leading-snug mb-0.5">
                        {f.title}
                      </p>
                      {f.org && (
                        <p className="font-jost text-[0.78rem] text-[#a08060]/50 leading-relaxed">
                          {f.org}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Affiliations */}
              <div>
                <p className="font-jost text-[11px] tracking-[0.4em] uppercase
                               text-[#c9a455]/70 mb-6 flex items-center gap-3">
                  <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
                  Affiliations &amp; Certifications
                </p>
                <div className="space-y-3">
                  {AFFILIATIONS.map((a, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[#c9a455]/30 text-[8px] mt-[0.35rem] shrink-0">◆</span>
                      <p className="font-jost font-light text-[0.9rem] text-[#f0e6d0]/75
                                   leading-relaxed tracking-[0.03em]">
                        {a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          GALLERY — Staggered infinite marquee
          Cards alternate low / top / mid as they scroll right→left.
          Same rhythm as the 3-column mosaic, now in motion.
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-2 pb-10">

        {/*
         * -50% = exactly one full set of images → seamless loop.
         * Duration 65s → unhurried, lets you appreciate each image.
         */}
        <style>{`
          @keyframes galleryMarquee {
            from { transform: translateX(-${GALLERY_IMGS.length * (G_CARD_W + G_GAP)}px); }
            to   { transform: translateX(0); }
          }
        `}</style>

        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionLabel text="Gallery" />
            <h2 className="font-cinzel text-[2rem] md:text-[2.5rem] text-[#f0e6d0]
                           tracking-wider leading-none">
              Moments in Frame
            </h2>
          </motion.div>
        </div>

        {/*
         * Outer wrapper height must accommodate the tallest card position:
         *   paddingTop (28px) + max stagger (60px) + card height (360px) + paddingBottom (28px) = 476px
         * overflow:hidden clips horizontally; the edge mask dissolves both ends.
         */}
        <div
          style={{
            overflow:        "hidden",
            height:          480,
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            maskImage:       "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          {/* Scrolling strip — flex-start so each card controls its own top via marginTop */}
          <div
            style={{
              display:            "flex",
              alignItems:         "flex-start",
              gap:                G_GAP,
              width:              "max-content",
              paddingTop:         28,
              paddingBottom:      28,
              animation:          "galleryMarquee 65s linear infinite",
              animationPlayState: lbIdx !== null ? "paused" : "running",
            }}
          >
            {MARQUEE_IMGS.map((src, i) => {
              const staggerTop = G_STAGGER[i % 3];   // 60 | 0 | 30 px
              return (
                /* Outer shell: owns drop-shadow, no overflow:hidden so shadow isn't clipped */
                <motion.div
                  key={i}
                  className="relative cursor-pointer group"
                  style={{
                    flexShrink: 0,
                    width:      G_CARD_W,
                    height:     G_CARD_H,
                    marginTop:  staggerTop,
                    boxShadow:  "0 6px 18px -2px rgba(201,164,85,0.14)",
                  }}
                  onClick={() => setLbIdx(i % N)}
                  whileHover={{
                    y:          -10,
                    scale:      1.03,
                    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                  }}
                >
                  {/*
                   * Inner div — clips the image + overlays.
                   * border and background live here, not on the outer shell.
                   */}
                  <div
                    style={{
                      position:   "absolute",
                      inset:      0,
                      overflow:   "hidden",
                      border:     "1px solid rgba(201,164,85,0.12)",
                      background: "rgba(6,3,0,0.55)",
                    }}
                  >
                    <img
                      src={src}
                      alt=""
                      style={{
                        width:          "100%",
                        height:         "100%",
                        objectFit:      "cover",
                        objectPosition: "center",
                        display:        "block",
                        filter:         "brightness(0.84) sepia(0.05)",
                        transition:     "filter 0.5s ease",
                      }}
                    />

                    {/* Hover: golden wash + hairline border */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100
                                 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "linear-gradient(150deg, rgba(201,164,85,0.10) 0%, transparent 55%)",
                        boxShadow:  "inset 0 0 50px rgba(201,164,85,0.10), inset 0 0 0 1px rgba(201,164,85,0.38)",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Hint */}
        <p className="text-center font-jost text-[10px] tracking-[0.45em] uppercase
                      text-[#c9a455]/30 mt-8">
          Hover to pause · Click to view
        </p>
      </section>

      {/* ── LIGHTBOX — blur + zoom + prev/next ── */}
      <AnimatePresence>
        {lbIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
            style={{ backdropFilter: "blur(22px)", background: "rgba(4,2,0,0.82)" }}
            onClick={closeLb}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Prev button */}
            <button
              onClick={lbPrev}
              className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-10
                         w-12 h-12 rounded-full border border-[#c9a455]/40
                         flex items-center justify-center
                         text-[#c9a455]/70 hover:text-[#c9a455] hover:border-[#c9a455]
                         transition-all duration-300 font-jost text-xl
                         bg-[#060200]/60"
            >←</button>

            {/* Zoomed image */}
            <motion.div
              className="relative"
              onClick={e => e.stopPropagation()}
              initial={{ scale: 0.82, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.82, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={GALLERY_IMGS[lbIdx]} alt=""
                className="max-w-[80vw] max-h-[80vh] object-contain"
                style={{
                  border:    "1px solid rgba(201,164,85,0.35)",
                  boxShadow: "0 0 120px rgba(201,164,85,0.12)",
                }}
              />
              {/* Image counter */}
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2
                            font-jost text-[10px] tracking-[0.45em] uppercase
                            text-[#c9a455]/40 whitespace-nowrap">
                {lbIdx + 1} / {N} · Click outside to close
              </p>
              {/* Close × */}
              <button
                onClick={closeLb}
                className="absolute -top-4 -right-4 w-9 h-9 rounded-full
                           border border-[#c9a455]/40 bg-[#060200]
                           flex items-center justify-center
                           text-[#c9a455]/70 hover:text-[#c9a455] hover:border-[#c9a455]
                           transition-all duration-300 font-jost text-sm cursor-pointer"
              >✕</button>
            </motion.div>

            {/* Next button */}
            <button
              onClick={lbNext}
              className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-10
                         w-12 h-12 rounded-full border border-[#c9a455]/40
                         flex items-center justify-center
                         text-[#c9a455]/70 hover:text-[#c9a455] hover:border-[#c9a455]
                         transition-all duration-300 font-jost text-xl
                         bg-[#060200]/60"
            >→</button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default About;
