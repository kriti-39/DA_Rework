import { motion } from "framer-motion";

// ── DATA ──────────────────────────────────────────────────
const WHAT_YOU_LEARN = [
  { label: "Raga",            detail: "Alaap, jod, jhala and bandish in the khayal tradition" },
  { label: "Voice Culture",   detail: "Swara placement, shruti sensitivity and resonance" },
  { label: "Ornamentation",   detail: "Taan, meend, gamak, murki and their expressive use" },
  { label: "Light Classical", detail: "Thumri, tappa, tap-thumri, dadra, kajri and jhula" },
  { label: "Layakari",        detail: "Rhythmic nuance — playing with and around tala" },
  { label: "Bandish",         detail: "Rare compositions from the Benaras and Senia traditions" },
  { label: "Dhrupad",         detail: "Under the continuing influence of Pt. Uday Bhawalkar's lineage" },
];

const GURUS = [
  { name: "Dr. Girija Devi",            detail: "Padma Vibhushan · Benaras Gharana · 11 years" },
  { name: "Pt. Samaresh Chawdhury",     detail: "Senia & Maihar Gharanas · 14 years" },
  { name: "Pt. Kumar Prasad Mukherjee", detail: "Agra & Rampur-Sahaswan traditions" },
  { name: "Pt. Vijay Kichlu",           detail: "Agra Gharana" },
  { name: "Pt. Uday Bhawalkar",         detail: "Dhrupad tradition · ongoing" },
];

const WORKSHOPS = [
  { img: "/assets/T1.jpg",   title: "Raga Yaman",        subtitle: "An evening raga — alaap, jod and khayal bandish",           tags: ["Beginner Friendly", "2 hr"] },
  { img: "/assets/T2.jpg",   title: "Bhairavi",           subtitle: "Grammar, ornamentation and thumri",                         tags: ["Intermediate", "3 hr"] },
  { img: "/assets/T3.jpg",   title: "Thumri & Dadra",    subtitle: "Emotion, text and improvisation",                            tags: ["2 yr+ Trained", "2 hr"] },
  { img: "/assets/T4.jpg",   title: "Sur & Laya",         subtitle: "Melody and rhythm in dialogue",                             tags: ["All Levels", "1.5 hr"] },
  { img: "/assets/YT1.jpg",  title: "Raga Bhimpalasi",   subtitle: "An afternoon raga of longing",                               tags: ["Intermediate", "2 hr"] },
  { img: "/assets/YT2.jpg",  title: "Khayal Bandish",    subtitle: "Rare compositions from Benaras",                             tags: ["5 yr+ Trained", "3 hr"] },
  { img: "/assets/YT3.jpg",  title: "Voice & Swara",     subtitle: "Shruti sensitivity and resonance training",                  tags: ["All Levels", "2 hr"] },
  { img: "/assets/YT4.jpg",  title: "Raga Darbari",      subtitle: "A late-night raga — meditative, profound",                   tags: ["5 yr+ Trained", "2.5 hr"] },
];

const YT_SERIES = [
  {
    seriesLabel: "Series 01",
    title:       "Raga Shastra",
    subtitle:    "An in-depth exploration of ragas — grammar, history and emotional essence",
    playlistUrl: "https://www.youtube.com/@DebapriyaAdhikary",
    videos: [
      { img: "/assets/YT1.jpg", title: "Raga Bhimpalasi", url: "https://youtu.be/eBkjaI4xKws?si=c1gSfrvpS2fp_6MF" },
      { img: "/assets/YT2.jpg", title: "Raga Todi",       url: "https://youtu.be/lLxwR76qgWc?si=sUUmdwuxIhIt0qmo" },
      { img: "/assets/YT3.jpg", title: "Raga Kafi",       url: "https://youtu.be/1X_gCl0fdbw?si=Ea8F2PqNCCTYraZi" },
      { img: "/assets/YT4.jpg", title: "Raga Bhairav",    url: "https://youtu.be/z6YQ6oldjwM?si=ysW-LKXwHut5qzDq" },
    ],
  },
  {
    seriesLabel: "Series 02",
    title:       "Learn Hindustani Classical Vocal Online",
    subtitle:    "Structured lessons for aspiring singers — from foundational sur to raga study",
    playlistUrl: "https://www.youtube.com/@DebapriyaAdhikary",
    videos: [
      { img: "/assets/YT1.jpg", title: "Lesson 01 · Sur & Swara",  url: "#" },
      { img: "/assets/YT2.jpg", title: "Lesson 02 · Alankaar",     url: "#" },
      { img: "/assets/YT3.jpg", title: "Lesson 03 · Raga Grammar", url: "#" },
      { img: "/assets/YT4.jpg", title: "Lesson 04 · Bandish",      url: "#" },
    ],
  },
];

// ── HELPERS ───────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true, margin: "-50px" },
  transition:  { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
});

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="h-[1px] w-8 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">{text}</span>
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-3 py-2 my-4 px-6">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#c9a455]/30" />
    <span className="text-[#c9a455]/35 text-[8px]">◆</span>
    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#c9a455]/30" />
  </div>
);

const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
    <polygon points="5,3 18,10 5,17" fill="#c9a455" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// ── MAIN ──────────────────────────────────────────────────
const LearnMobile = () => (
  <main className="md:hidden overflow-x-hidden pt-20">

    {/* ══════════════════════════
        01 · CLASSES
    ══════════════════════════ */}
    <section className="px-6 pb-10">

      {/* Opener */}
      <motion.div className="mb-8" {...fadeUp(0.1)}>
        <SectionLabel text="Learn" />
        <h1 className="font-cinzel font-semibold text-[2rem] text-[#f0e6d0] tracking-wide leading-tight mb-1">
          Study the Art
        </h1>
        <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] tracking-wide mb-4">
          Hindustani Classical Vocal Training
        </p>
        <p className="font-jost font-light text-[#b8966e] text-sm leading-[1.9]">
          Rooted in the timeless traditions of Hindustani classical music, this learning journey offers
          students the opportunity to train under Debapriya Adhikary — a{" "}
          <span className="text-[#c9a455]/80 font-normal">National Award-winning artist</span>{" "}
          and torchbearer of the{" "}
          <span className="text-[#c9a455]/80 font-normal">Senia - Banaras</span>{" "}
          tradition. The training follows an unhurried and deeply personal approach, shaped around
          each student's voice, pace, and artistic growth.
        </p>
      </motion.div>

      {/* Classes image */}
      <motion.img
        src="/assets/Classes.png"
        alt="Debapriya Adhikary"
        className="w-full object-contain mb-6"
        style={{
          filter: "brightness(0.82) sepia(0.10)",
          maskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 90% at 50% 50%, black 30%, transparent 100%)",
        }}
        {...fadeUp(0.1)}
      />

      {/* One-on-One */}
      <motion.div className="mb-7" {...fadeUp(0.1)}>
        <SectionLabel text="01 · Regular Classes" />
        <h2 className="font-cinzel font-semibold text-[1.7rem] text-[#f0e6d0] tracking-wide leading-tight mb-1">
          One-on-One Training
        </h2>
        <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] mb-4">
          In the living tradition of guru-shishya parampara
        </p>
        <div className="space-y-3 font-jost font-light text-[#b8966e] text-sm leading-[1.9] mb-5">
          <p>
            Training is offered both{" "}
            <span className="text-[#c9a455]/80 font-normal">online and in-person</span>,
            structured around your schedule. Sessions are conducted in Bengali, Hindi, or English.
          </p>
          <p>
            The curriculum unfolds organically — from foundational sur and voice placement into
            raga grammar, composition, and the subtleties of improvisation.
          </p>
        </div>
      </motion.div>

      {/* What You Will Learn */}
      <motion.div className="mb-7" {...fadeUp(0.1)}>
        <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-4 flex items-center gap-3">
          <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
          What You Will Learn
        </p>
        <div className="space-y-2.5">
          {WHAT_YOU_LEARN.map((item, i) => (
            <motion.div key={i} className="flex items-start gap-3" {...fadeUp(i * 0.06)}>
              <span className="text-[#c9a455]/40 text-[7px] mt-[0.4rem] shrink-0">◆</span>
              <p className="font-jost font-light text-sm leading-relaxed">
                <span className="text-[#f0e6d0]/80 font-normal">{item.label}</span>
                <span className="text-[#b8966e]/60"> — {item.detail}</span>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quote */}
      <motion.blockquote
        className="border-l-2 border-[#c9a455]/30 pl-4 mb-7"
        {...fadeUp(0.1)}
      >
        <p className="font-playfair italic text-[#f0e6d0]/50 text-[0.88rem] leading-[1.85]">
          "Music is not merely a skill to be learned — it is a way of perceiving the world.
          My teaching begins not with notes, but with listening."
        </p>
      </motion.blockquote>

      {/* Trained Under */}
      <motion.div className="mb-8" {...fadeUp(0.1)}>
        <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-4 flex items-center gap-3">
          <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
          Trained Under
        </p>
        <div className="space-y-4 border-l border-[#c9a455]/15 pl-4">
          {GURUS.map((g, i) => (
            <motion.div key={i} {...fadeUp(i * 0.07)}>
              <p className="font-cinzel text-[0.8rem] tracking-wide text-[#c9a455]/65">{g.name}</p>
              <p className="font-jost font-light text-[0.76rem] text-[#b8966e]/50 leading-relaxed">{g.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* WhatsApp CTA */}
      <motion.div className="flex justify-center" {...fadeUp(0.1)}>
        <a
          href="https://wa.me/919038674555"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-jost text-[11px]
                     tracking-[0.35em] uppercase bg-[#c9a455] text-[#120a05]
                     px-10 py-4 hover:bg-[#d4b472] transition-colors duration-300"
        >
          <WhatsAppIcon />
          Enquire Now
        </a>
      </motion.div>
    </section>

    <Divider />

    {/* ══════════════════════════
        02 · WORKSHOPS
    ══════════════════════════ */}
    <section className="px-6 py-8">

      <motion.div className="mb-8" {...fadeUp(0)}>
        <SectionLabel text="02 · Workshops" />
        <h2 className="font-cinzel font-semibold text-[1.7rem] text-[#f0e6d0] tracking-wide leading-tight mb-1">
          Recorded Workshop Library
        </h2>
        <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] mb-3">
          Deep dives into raga, composition, tala &amp; the philosophy of Hindustani music
        </p>
        <p className="font-jost font-light text-[#b8966e] text-sm leading-[1.9]">
          Each recording is a complete immersive session — designed to be revisited.
          Purchase individually and learn at your own pace.
        </p>
      </motion.div>

      {/* 2-col workshop grid */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {WORKSHOPS.map((w, i) => (
          <motion.a
            key={i}
            href="#"
            className="group flex flex-col border border-[#c9a455]/20 overflow-hidden"
            {...fadeUp(i * 0.06)}
          >
            <div className="relative aspect-video overflow-hidden shrink-0">
              <img
                src={w.img} alt={w.title}
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.50) sepia(0.18)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-7 h-7 rounded-full border border-[#c9a455]/60 flex items-center justify-center bg-[#120a05]/50">
                  <PlayIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-1 p-2.5 bg-[#0d0703]/60">
              <p className="font-cinzel text-[0.7rem] tracking-wide text-[#f0e6d0]/85 leading-snug mb-1">
                {w.title}
              </p>
              <p className="font-playfair italic text-[#b8966e]/60 text-[0.65rem] leading-relaxed mb-2 flex-1">
                {w.subtitle}
              </p>
              <div className="flex flex-wrap gap-1">
                {w.tags.map((tag, t) => (
                  <span key={t} className="font-jost text-[6.5px] tracking-[0.2em] uppercase text-[#c9a455]/55 border border-[#c9a455]/20 px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center">
        <a
          href="https://linktr.ee/debapriyaadhikary"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-jost text-[10px] tracking-[0.3em] uppercase
                     text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
                     hover:border-[#c9a455] transition-all duration-300"
        >
          <span className="text-[#c9a455]/50 text-[7px]">◆</span>
          Upcoming Workshops →
        </a>
      </div>
    </section>

    <Divider />

    {/* ══════════════════════════
        03 · FREE RESOURCES
    ══════════════════════════ */}
    <section className="px-6 py-8 pb-14">

      <motion.div className="mb-8" {...fadeUp(0)}>
        <SectionLabel text="03 · Public Domain Resources" />
        <h2 className="font-cinzel font-semibold text-[1.7rem] text-[#f0e6d0] tracking-wide leading-tight mb-1">
          Open to All
        </h2>
        <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] mb-3">
          Two ongoing YouTube series — freely available, no enrolment required
        </p>
        <p className="font-jost font-light text-[#b8966e] text-sm leading-[1.9]">
          A growing library of recordings for anyone who wishes to listen, observe and absorb.
        </p>
      </motion.div>

      <div className="space-y-10">
        {YT_SERIES.map((series, si) => (
          <motion.div key={si} {...fadeUp(si * 0.1)}>

            {/* Series header */}
            <div className="mb-4 pb-3 border-b border-[#c9a455]/25">
              <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-[#c9a455]/50 block mb-1">
                {series.seriesLabel}
              </span>
              <h3 className="font-cinzel text-[1.05rem] text-[#f0e6d0]/90 tracking-wide leading-tight mb-1">
                {series.title}
              </h3>
              <p className="font-playfair italic text-[#b8966e]/70 text-[0.8rem] mb-2">
                {series.subtitle}
              </p>
              <a
                href={series.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-jost text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/60"
              >
                View Full Playlist →
              </a>
            </div>

            {/* 2-col thumbnails */}
            <div className="grid grid-cols-2 gap-3">
              {series.videos.map((v, vi) => (
                <a
                  key={vi}
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden mb-1.5">
                    <img
                      src={v.img} alt={v.title}
                      className="w-full h-full object-cover"
                      style={{ filter: "brightness(0.75)" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full border border-[#c9a455]/60 flex items-center justify-center bg-[#120a05]/50">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="absolute inset-0 border border-[#c9a455]/0 group-hover:border-[#c9a455]/40 transition-colors duration-300 pointer-events-none" />
                  </div>
                  <p className="font-cinzel text-[0.65rem] tracking-wide text-[#f0e6d0]/55 leading-snug">
                    {v.title}
                  </p>
                </a>
              ))}
            </div>

          </motion.div>
        ))}
      </div>

    </section>

  </main>
);

export default LearnMobile;
