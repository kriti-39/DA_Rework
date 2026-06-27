import { motion } from "framer-motion";

// ── TABLET PORTRAIT rendering of the Learn page ──
// Same content/data as desktop Learn.jsx, rebuilt as a single column. The
// desktop right column (image, quote, parampara, gurus) is `hidden lg:flex`,
// so it vanishes on tablets; here every section is restored in one column.
// Desktop/landscape use Learn.jsx; phones use LearnMobile.jsx.

const WHAT_YOU_LEARN = [
  { label: "Voice Culture", detail: "Swara placement, shruti sensitivity, breath control, tone production and resonance" },
  { label: "Palta Practice", detail: "Systematic voice training through alankars and paltas designed to strengthen sur, clarity, agility, and vocal stability." },
  { label: "Basic Ragas with Bandishes", detail: "Building a strong foundation in raga structure, phrasing, and presentation." },
  { label: "Advanced ragas with vilambit and drut bandishes", detail: "focusing on elaboration, layakari, taan development, and performance aesthetics." },
  { label: "Music forms of Purab Ang", detail: "Including khayal, tappa, thumri, dadra, kajri, and jhula." },
  { label: "Ornamentation", detail: "The expressive use of taan, meend, gamak, and murki." },
  { label: "Layakari", detail: "Developing rhythmic nuance and an intuitive relationship with tala." },
  { label: "Bandish Gayaki", detail: "Learning rare and traditional compositions along with their stylistic interpretation and presentation." },
];

const GURUS = [
  { name: "Pt. Samaresh Chawdhury",     detail: "Senia & Maihar Gharanas" },
  { name: "Dr. Girija Devi",            detail: "Padma Vibhushan · Benaras Gharana" },
  { name: "Pt. Kumar Prasad Mukherjee", detail: "Agra & Rampur-Sahaswan traditions" },
  { name: "Pt. Vijay Kichlu",           detail: "Padma Shri · Agra Gharana" },
  { name: "Pt. Uday Bhawalkar",         detail: "Dhrupad tradition · Dagarbaani" },
  { name: "Dr. Rajeeb Chakraborty",     detail: "Sarod Maestro · Senia Maihar" },
];

const WORKSHOPS = [
  { img: "/assets/workshop1.png", title: "Strengthen Your Voice With Deva",                  subtitle: "7 days extensive workshop",  url: "https://musingswithdeva.gumroad.com/l/voice",  tags: ["Beginner Friendly", "11 hr"] },
  { img: "/assets/workshop2.png", title: "Strengthen Your Voice With Deva",                  subtitle: "3 days workshop on Palta",   url: "https://musingswithdeva.gumroad.com/l/palta",  tags: ["Beginner Friendly", "4 hr 20 min"] },
  { img: "/assets/workshop3.png", title: "Strengthen Your Voice With Deva",                  subtitle: "Transform your voice",       url: "https://musingswithdeva.gumroad.com/l/syv3",   tags: ["Beginner Friendly", "~4 hr"] },
  { img: "/assets/workshop4.png", title: "Morning Riyaz with Guruji",                        subtitle: "",                           url: "https://musingswithdeva.gumroad.com/l/riyaz",  tags: ["Beginner Friendly", "2 hr 43 min"] },
  { img: "/assets/workshop5.png", title: "An Immersive Journey into Thumri, Kajri and Jhula", subtitle: "",                          url: "https://musingswithdeva.gumroad.com/l/thumri", tags: ["Beginner Friendly", "3 hr 15 min"] },
  { img: "/assets/workshop6.png", title: "Art of Bandish Gayaki",                            subtitle: "Raga: Bhimpalash",          url: "https://musingswithdeva.gumroad.com/l/gayaki", tags: ["Beginner Friendly", "2 hr 25 min"] },
];

const YT_SERIES = [
  {
    seriesLabel: "Series 01",
    title: "Raga Shastra",
    subtitle: "An in-depth exploration of ragas — their grammar, history and emotional essence",
    description: "In this series, a wide range of ragas from Hindustani Shastriya Sangeet are explored in depth with Debapriya Adhikary, who takes listeners on an immersive musical journey. Following the principles of Ashtaang Gayaki, he carefully explains each aspect of raga presentation, including its structure, mood, and expression, supported by detailed demonstrations in Vilambit and/or Drut compositions. This initiative is a sincere effort to document the richness and diversity of ragas, preserving their essence for future generations.",
    playlistUrl: "https://www.youtube.com/watch?v=R--sNOOQPWk",
    videos: [
      { img: "/assets/YT1.jpg", title: "Raga Bhimpalasi", url: "https://youtu.be/eBkjaI4xKws?si=c1gSfrvpS2fp_6MF" },
      { img: "/assets/YT2.jpg", title: "Raga Todi",       url: "https://youtu.be/lLxwR76qgWc?si=sUUmdwuxIhIt0qmo" },
      { img: "/assets/YT3.jpg", title: "Raga Kafi",       url: "https://youtu.be/1X_gCl0fdbw?si=Ea8F2PqNCCTYraZi" },
      { img: "/assets/YT4.jpg", title: "Raga Bhairav",    url: "https://youtu.be/z6YQ6oldjwM?si=ysW-LKXwHut5qzDq" },
    ],
  },
  {
    seriesLabel: "Series 02",
    title: "Learn Hindustani Classical Vocal Online",
    subtitle: "Structured lessons for aspiring singers — from foundational sur to raga study",
    description: "Debapriya Adhikary offers thoughtfully designed online vocal tutorials that focus on various aspects of Hindustani classical music. These include voice culture, raga understanding, and the finer elements of gayaki, presented in a clear and structured manner to benefit learners at different stages of their musical journey.",
    playlistUrl: "https://www.youtube.com/watch?v=7KVTyO3Vo0A&list=PLetziL4At--OuOU3YTJfsNPgi31K4ZY-f",
    videos: [
      { img: "/assets/SWD1.jpg", title: "Breathing Technique",   url: "https://youtu.be/AFONjmJuNko?si=HtZNZCG9KFLDB2TW" },
      { img: "/assets/SWD2.jpg", title: "How to Practice?",      url: "https://youtu.be/pcX88ZghBSk?si=DZUOFAz2QEgNiVH_" },
      { img: "/assets/SWD3.jpg", title: "Raga Bhupali / Bhoop",  url: "https://youtu.be/wVmuJbYiVIk?si=O2XTD4a4JUVznN_E" },
      { img: "/assets/SWD4.jpg", title: "Khamaj & Nuances",      url: "https://youtu.be/ZH_XQMnegKU?si=yj4g_1_uC3Fv-zLA" },
    ],
  },
];

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="h-[1px] w-10 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">{text}</span>
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-[#c9a455]/30" />
    <span className="text-[#c9a455]/35 text-[8px]">◆</span>
    <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-[#c9a455]/30" />
  </div>
);

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><polygon points="5,3 18,10 5,17" fill="#c9a455" /></svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] } },
};

const LearnTablet = () => {
  return (
    <main className="overflow-x-hidden">

      {/* ── OPENER + CLASSES ── */}
      <section className="pt-24 pb-6">
        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="mb-8">
            <SectionLabel text="Learn" />
            <h1 className="font-cinzel font-semibold text-[2.6rem] text-[#f0e6d0] tracking-wide leading-tight mb-2">
              Study the Art
            </h1>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1.1rem] tracking-wide mb-6">
              Hindustani Classical Vocal Training
            </p>
            <p className="font-jost font-light text-[#b8966e] text-[0.98rem] leading-[1.9]">
              Learning music is a lifelong journey that requires dedication, patience, and an openness to
              evolve. Through his years of rigorous training and experience, Debapriya Adhikary emphasizes not
              just the acquisition of technical skills, but also the cultivation of sensitivity, expression,
              and a deep connection with the art form. His approach encourages learners to internalize music as
              a way of life rather than merely a discipline. Under his guidance, students are introduced to the
              foundational as well as advanced aspects of Hindustani classical music, including voice culture,
              raga development, and stylistic nuances.
            </p>
          </motion.div>
        </div>

        {/* Classes image — full width */}
        <motion.img
          src="/assets/Classes.png"
          alt="Debapriya Adhikary"
          className="w-full object-contain my-2"
          style={{
            filter: "brightness(0.82) sepia(0.10)",
            maskImage: "radial-gradient(ellipse 86% 90% at 50% 50%, black 32%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 86% 90% at 50% 50%, black 32%, transparent 100%)",
          }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }}
        />

        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          {/* Quote */}
          <blockquote className="border-l-2 border-[#c9a455]/30 pl-5 my-8">
            <p className="font-playfair italic text-[#f0e6d0]/55 text-[1rem] leading-[1.85]">
              "Music is not merely a skill to be learned — it is a way of perceiving the world.
              My teaching begins not with notes, but with listening."
            </p>
          </blockquote>

          {/* 01 Regular Classes */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
            <SectionLabel text="01 · Regular Classes" />
            <h2 className="font-cinzel font-semibold text-[2.2rem] text-[#f0e6d0] tracking-wide leading-tight mb-2">
              One-on-One Training
            </h2>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1.05rem] mb-6">
              In the living tradition of guru-shishya parampara
            </p>
            <p className="font-jost font-light text-[#b8966e] text-[0.98rem] leading-[1.9] mb-8">
              Classes are offered both <span className="text-[#c9a455]/80 font-normal">online and in-person</span>,
              and are shaped around your individual schedule and pace of learning. Sessions may be conducted in
              Bengali, Hindi, or English. Rather than following a rigid syllabus, the learning unfolds
              organically — guided by listening, absorption, and readiness. From foundational sur and voice
              placement, the journey gradually opens into raga grammar, bandish, and the deeper subtleties of
              improvisation.
            </p>

            <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-4 flex items-center gap-3">
              <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
              What You Will Learn
            </p>
            <div className="space-y-3 mb-9">
              {WHAT_YOU_LEARN.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#c9a455]/40 text-[7px] mt-[0.42rem] shrink-0">◆</span>
                  <p className="font-jost font-light text-[0.92rem] leading-relaxed">
                    <span className="text-[#f0e6d0]/80 font-normal">{item.label}</span>
                    <span className="text-[#b8966e]/60"> — {item.detail}</span>
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Parampara note */}
          <div className="space-y-4 font-jost font-light text-[#b8966e] text-[0.98rem] leading-[1.9] mb-9">
            <p>
              In the Indian classical tradition, the purity of art is preserved through the sacred{" "}
              <span className="font-playfair italic text-[#c9a455]/80">Guru–Shishya parampara</span>, where
              knowledge is passed down across generations with devotion, discipline, and deep spiritual
              understanding. A true Guru carries forward the spirit of a lineage, transmitting not only knowledge
              and technique but also the values, discipline, and emotional richness embedded within the
              tradition. Under such guidance, music transforms into a lifelong journey — an inheritance of sound,
              philosophy, and surrender.
            </p>
            <p>
              When you are learning from Sri. Debapriya Adhikary, you are receiving a culmination of the
              teachings received from his Gurus coupled with his own studies and realisations.
            </p>
          </div>

          {/* Gurus */}
          <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-4 flex items-center gap-3">
            <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
            Gurus
          </p>
          <div className="space-y-4 border-l border-[#c9a455]/15 pl-5 mb-10">
            {GURUS.map((g, i) => (
              <div key={i}>
                <p className="font-cinzel text-[0.85rem] tracking-wide text-[#c9a455]/65">{g.name}</p>
                <p className="font-jost font-light text-[0.8rem] text-[#b8966e]/50 leading-relaxed">{g.detail}</p>
              </div>
            ))}
          </div>

          {/* WhatsApp Enquire */}
          <a
            href="https://wa.me/+917003886380?text=Namaskar%2C%20I%20wish%20to%20enquire%20about%20learning%20sessions%20with%20Debapriya%20Ji."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-4 font-jost text-[11px] tracking-[0.35em] uppercase
                       bg-[#c9a455] text-[#120a05] px-12 py-4 hover:bg-[#d4b472] transition-colors duration-300"
          >
            <WhatsAppIcon />
            Enquire Now
          </a>
        </div>
      </section>

      <Divider />

      {/* ── 02 WORKSHOPS ── */}
      <section className="py-10">
        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          <motion.div className="mb-9" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel text="02 · Workshops" />
            <h2 className="font-cinzel font-semibold text-[2.2rem] text-[#f0e6d0] tracking-wide leading-tight mb-2">
              Recorded Workshop Library
            </h2>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1.05rem] mb-5">
              Deep dives into raga, composition, tala &amp; the philosophy of Hindustani music
            </p>
            <div className="font-jost font-light text-[#b8966e] text-[0.98rem] leading-[1.9] space-y-4">
              <p>
                Debapriya Adhikary conducts in-depth workshops designed to provide a comprehensive understanding
                of Hindustani classical vocal music. These sessions focus on strengthening the voice, improving
                tonal quality, and developing control through systematic practice techniques. Special emphasis is
                given to paltas, breath control, and building a strong foundation essential for advanced musical
                expression.
              </p>
              <p>
                The workshops also explore key elements of gayaki, including bandish development, tappa, and
                stylistic nuances across forms. Through detailed explanations, demonstrations, and interactive
                learning, participants gain practical insights into both the technical and aesthetic aspects of
                music.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Workshop grid — wider container */}
        <div className="max-w-3xl mx-auto px-10 sm:px-14">
          <div className="grid grid-cols-2 gap-4 mb-9">
            {WORKSHOPS.map((w, i) => (
              <a
                key={i}
                href={w.url} target="_blank" rel="noopener noreferrer"
                className="group flex flex-col border border-[#c9a455]/20 hover:border-[#c9a455]/45 transition-colors duration-400 overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden shrink-0">
                  <img src={w.img} alt={w.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" style={{ filter: "brightness(0.92)" }} />
                </div>
                <div className="flex flex-col flex-1 p-4 bg-[#0d0703]/60">
                  <p className="font-cinzel text-[0.82rem] tracking-wide text-[#f0e6d0]/85 leading-snug mb-1">{w.title}</p>
                  {w.subtitle && <p className="font-playfair italic text-[#b8966e]/60 text-[0.76rem] leading-relaxed mb-3 flex-1">{w.subtitle}</p>}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {w.tags.map((tag, t) => (
                      <span key={t} className="font-jost text-[7.5px] tracking-[0.25em] uppercase text-[#c9a455]/55 border border-[#c9a455]/20 px-2 py-0.5">{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div className="flex justify-center">
            <a
              href="https://linktr.ee/musingswithdeva?utm_source=linktree_profile_share&ltsid=509ec3ae-5cb0-4382-84ba-ad2cdc95bfdd"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.3em] uppercase text-[#c9a455] border border-[#c9a455]/40 px-8 py-3 hover:border-[#c9a455] hover:bg-[#c9a455]/5 transition-all duration-300 group"
            >
              <span className="text-[#c9a455]/50 text-[8px]">◆</span>
              Stay Tuned for Upcoming Workshops
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 03 PUBLIC DOMAIN RESOURCES ── */}
      <section className="py-12">
        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          <motion.div className="mb-10" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel text="03 · Public Domain Resources" />
            <h2 className="font-cinzel font-semibold text-[2.2rem] text-[#f0e6d0] tracking-wide leading-tight mb-2">
              Open to All
            </h2>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1.05rem] mb-4">
              All freely available lessons on You Tube
            </p>
            <p className="font-jost font-light text-[#b8966e] text-[0.95rem] leading-[1.9]">
              A growing library of recordings for anyone who wishes to listen, observe and absorb. Each series
              has a distinct focus — explore both and find where you wish to begin.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto px-10 sm:px-14 space-y-12">
          {YT_SERIES.map((series, si) => (
            <div key={si}>
              <div className="flex items-end justify-between mb-5 pb-4 border-b border-[#c9a455]/25 gap-6">
                <div className="min-w-0">
                  <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-[#c9a455]/50 block mb-1">{series.seriesLabel}</span>
                  <h3 className="font-cinzel text-[1.3rem] text-[#f0e6d0]/90 tracking-wide leading-tight mb-1">{series.title}</h3>
                  <p className="font-playfair italic text-[#b8966e]/70 text-[0.85rem]">{series.subtitle}</p>
                </div>
                <a href={series.playlistUrl} target="_blank" rel="noopener noreferrer" className="shrink-0 inline-flex items-center gap-2 font-jost text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/60 hover:text-[#c9a455] transition-colors duration-300 group">
                  Playlist
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
              {series.description && (
                <p className="font-jost font-light text-[#b8966e] text-[0.88rem] leading-[1.9] mb-6">{series.description}</p>
              )}
              <div className="grid grid-cols-2 gap-4">
                {series.videos.map((v, vi) => (
                  <a key={vi} href={v.url} target="_blank" rel="noopener noreferrer" className="group block">
                    <div className="relative aspect-video overflow-hidden mb-2">
                      <img src={v.img} alt={v.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]" style={{ filter: "brightness(0.75)" }} />
                      <div className="absolute inset-0 bg-[#120a05]/0 group-hover:bg-[#120a05]/50 flex items-center justify-center transition-all duration-300">
                        <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 w-10 h-10 rounded-full border border-[#c9a455] flex items-center justify-center backdrop-blur-sm bg-[#120a05]/40">
                          <PlayIcon />
                        </div>
                      </div>
                    </div>
                    <p className="font-cinzel text-[0.72rem] tracking-wide text-[#f0e6d0]/55 group-hover:text-[#c9a455]/80 transition-colors duration-300">{v.title}</p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default LearnTablet;
