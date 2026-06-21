import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Gurus from "../components/Gurus/Gurus";
import PerformancesMobile from "../components/Performances/PerformancesMobile";

// ── DATA ──────────────────────────────────────────────────
const AWARDS = [
  { year: "1994",    title: "First Prize · Inter District Music Competition",         org: "Dhanbad",                                                                  highlight: false },
  { year: "2001",    title: "First Prize · Akhil Bharatiya Sangeet Pratiyogita",      org: "Prayag Sangeet Samiti, Allahabad",                                          highlight: false },
  { year: "2001–02", title: "First Prize · Inter College & East Zonal Youth Festival", org: "AIU, Govt. of India · Vinoba Bhave University & ISM Dhanbad",               highlight: false },
  { year: "2002",    title: "PRESIDENT'S AWARD - AIR NATIONAL MUSIC COMPETITION",      org: "First prize conferred on behalf of President of India",                       highlight: true  },
  { year: "2003",    title: "ITC–SRA Promising Artiste Award",                        org: "ITC–Sangeet Research Academy, Mumbai",                                      highlight: false },
  { year: "2004",    title: "Golden Talent Contest",                                  org: "Pandit Ravi Kichlu Foundation",                                             highlight: false },
  { year: "2006",    title: "Master of Music · Topper",                               org: "University of Calcutta",                                                    highlight: false },
  { year: "2018",    title: "National Film Award - Best Documentary",                 org: "Conferred by the Hon'ble President of India · Girija – A Lifetime in Music", highlight: true  },
  { year: "2019",    title: "Person Who Cares for Art of the East",                   org: "Sharq Taronalari International Music Festival · UNESCO & Ministry of Culture, Govt. of Uzbekistan", highlight: false },
];

const FELLOWSHIPS = [
  { period: "2015–16", title: "National Junior Fellowship",  org: "Ministry of Culture, Govt. of India" },
  { period: "2003–05", title: "National Scholarship",        org: "Ministry of Culture, Govt. of India" },
  { period: "2005–10", title: "Jnana Pravaha Scholarship",   org: ""                                    },
];

const AFFILIATIONS = [
  "Member, Indian Council for Cultural Relations (ICCR)",
  "Diploma in Personal Fitness Training & Certified Nutritionist",
  "Associate Certified Pranic Healer",
];

const GALLERY_IMGS = [
   "/assets/AG1.jpg",
  "/assets/AG2.jpeg",
  "/assets/hh1.jpg",
  "/assets/AG4.jpg",
  "/assets/new27.jpeg",
  "/assets/new26.jpeg",
  "/assets/AG7.jpg",
];
const MARQUEE_IMGS = [...GALLERY_IMGS, ...GALLERY_IMGS];

const DEVASAMAN_TRIO = [
  { src: "/assets/SM.jpg",  label: "Samanwaya Sarkar"   },
  { src: "/assets/devasaman.jpeg", label: "DevaSaman"           },
  { src: "/assets/AG7.jpg",  label: "Debapriya Adhikary"  },
];

// ── HELPERS ───────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  whileInView:{ opacity: 1, y: 0  },
  viewport:   { once: true, margin: "-50px" },
  transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
});

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="h-[1px] w-8 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">{text}</span>
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-3 py-2 my-4">
    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#c9a455]/30" />
    <span className="text-[#c9a455]/35 text-[8px]">◆</span>
    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#c9a455]/30" />
  </div>
);

// ── LIGHTBOX ──────────────────────────────────────────────
const Lightbox = ({ idx, total, onClose, onPrev, onNext }) => (
  <motion.div
    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    style={{ background: "rgba(4,2,0,0.88)", backdropFilter: "blur(16px)" }}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      className="relative w-full"
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={e => e.stopPropagation()}
    >
      <img
        src={GALLERY_IMGS[idx]} alt=""
        className="w-full max-h-[70vh] object-contain"
        style={{ border: "1px solid rgba(201,164,85,0.30)" }}
      />
      <div className="flex justify-between items-center mt-4">
        <button onClick={onPrev} className="w-10 h-10 rounded-full border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]">←</button>
        <span className="font-jost text-[9px] tracking-[0.3em] uppercase text-[#c9a455]/50">{idx + 1} / {total}</span>
        <button onClick={onNext} className="w-10 h-10 rounded-full border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]">→</button>
      </div>
      <button onClick={onClose} className="absolute -top-2 right-0 font-jost text-[9px] tracking-[0.3em] uppercase text-[#b8966e]/50">Close ✕</button>
    </motion.div>
  </motion.div>
);

// ── MAIN ─────────────────────────────────────────────────
const AboutMobile = () => {
  const [lbIdx, setLbIdx] = useState(null);
  const N = GALLERY_IMGS.length;

  return (
    <main className="md:hidden overflow-x-hidden pt-20">

      {/* ══════════════════════════
          HERO OPENER
      ══════════════════════════ */}
      <section className="px-6 pb-10">

        <motion.div {...fadeUp(0.1)}>
          <SectionLabel text="About" />
          <h1 className="font-cinzel font-semibold text-[1.5rem] text-[#f0e6d0] tracking-wide leading-tight">
            Debapriya Adhikary
          </h1>
          <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] tracking-wide ">
            Singer · Composer · Mentor · Producer
          </p>
        </motion.div>

        {/* Hero image */}
        <motion.div className="mb-1" {...fadeUp(0.15)}>
          <img
            src="/assets/AboutHero.png"
            alt="Debapriya Adhikary"
            className="w-full object-contain"
            style={{
              filter: "brightness(0.88) sepia(0.08)",
              maskImage: "radial-gradient(ellipse 88% 90% at 50% 48%, black 32%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 88% 90% at 50% 48%, black 32%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Bio */}
        <div className="space-y-4 font-jost font-light text-[#b8966e] text-sm leading-[1.85]">
          <motion.p
            className="font-playfair italic text-[#f0e6d0]/50 text-[0.88rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-4"
            {...fadeUp(0.1)}
          >
            "I didn't begin learning music with the intention of becoming a professional performer.
            My mother always said that music is the greatest form of wisdom — something I should
            embrace as a lifelong companion."
          </motion.p>

          <motion.p {...fadeUp(0.15)}>
            Born in the industrial township of{" "}
            <span className="text-[#c9a455]/80 font-normal">Sindri, Jharkhand</span>, into a humble
            and educated Bengali family, Debapriya displayed a natural affinity for the arts from an
            early age. His introduction to music did not begin through formal lessons, but through the
            quiet, immersive world of listening to his mother,{" "}
            <span className="text-[#c9a455]/80 font-normal">Anita Adhikary</span>, sing and practise at
            home. A disciple of Pt. Jivnath Jha, affectionately known as Taanraj, she became his very
            first source of musical inspiration.
          </motion.p>

          <motion.p {...fadeUp(0.2)}>
            Recognising her son's innate sensitivity towards music, she introduced him to
            Pt. Samaresh Chawdhury of the Senia and Maihar gharanas, who later accepted Debapriya as
            his Gandabandh disciple. From the age of eight, Debapriya underwent rigorous training under
            his guidance for fourteen formative years. Throughout this journey, his mother travelled
            tirelessly between Sindri and Durgapur, never allowing weather, festivals, or circumstance
            to interrupt his learning — a quiet testament to her unwavering dedication and belief in
            her son's path.
          </motion.p>

          {/* About3 image */}
          <motion.img
            src="/assets/About3.png"
            alt=""
            className="w-full object-contain"
            style={{
              filter: "brightness(0.82) sepia(0.10)",
              maskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 32%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 32%, transparent 100%)",
            }}
            {...fadeUp(0.1)}
          />

          <motion.p
            className="font-playfair italic text-[#f0e6d0]/50 text-[0.88rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-4"
            {...fadeUp(0.1)}
          >
            "Mom never allowed any excuse when it came to learning. I remember once she got
            completely drenched in heavy rain while taking me to the railway station — she remained
            wet, standing near the door for four hours just to dry herself, yet never suggested
            skipping the class."
          </motion.p>

          <motion.p {...fadeUp(0.1)}>
            Under the guidance of Pt. Samaresh Chawdhury, Debapriya cultivated a profound
            understanding of voice culture, tonal smoothness, and the clarity required to render
            intricate musical movements with grace and precision. These formative years laid the
            foundation for the artistic identity that would gradually unfold in the years to come. Yet
            his training extended far beyond technique alone. It was an education in discipline,
            patience, humility, and the art of deep listening — values that became inseparable from his
            music and personality alike.
          </motion.p>

          <motion.div className="flex items-center gap-3 pt-1" {...fadeUp(0.1)}>
            <div className="h-[1px] w-6 bg-[#c9a455]/50" />
            <span className="font-jost text-[12px] tracking-[0.4em] uppercase text-[#c9a455]/70">Musical Journey</span>
          </motion.div>

          <motion.p {...fadeUp(0.1)}>
            Debapriya's musical journey found deeper expression under the legendary{" "}
            <span className="text-[#c9a455]/80 font-normal">Padma Vibhushan awardee Dr. Girija Devi</span>{" "}
            of the Benaras gharana, with whom he trained as a Gandabandh disciple for eleven
            transformative years. Under her affectionate yet rigorous guidance, he immersed himself in
            the rich expressive traditions of Thumri, Tappa, Tap-Thumri, Dadra, Kajri, and Jhula, while
            also absorbing rare compositions and the distinctive khayal gayaki of Benaras. More than
            repertoire alone, Dr. Girija Devi shaped his artistic vision with emotional depth, inner
            strength, and an understanding that music must transcend the boundaries of notes and words.
          </motion.p>

          <motion.p {...fadeUp(0.1)}>
            Through her teachings, he learned to approach music not merely as performance, but as a
            living expression of experience, devotion, and humanity. He also received guidance from
            Pt. Kumar Prasad Mukherjee of the Agra and Rampur-Sahaswan traditions, and from
            Pt. Vijay Kichlu of the Agra gharana, who entrusted him with numerous rare bandishes and a
            deeply refined understanding of the technical and aesthetic beauty of ragas. A torchbearer
            of the Senia-Banaras tradition, Debapriya Adhikary's music is marked by a rare balance of
            tradition and innovation. More than three decades of rigorous training have shaped a style
            distinguished by clarity, emotional depth, and technical finesse. His command over gamaks,
            intricate taans, meends, and swargam has earned him admiration from audiences and
            connoisseurs across the world.
          </motion.p>

          <motion.p {...fadeUp(0.1)}>
            An A-Grade Artist of All India Radio, as well as a recipient of the National Film Award and
            the President's Award, he represents a unique confluence of scholarship, performance, and
            creative vision. He holds a Master's degree in Music and was awarded the Junior Research
            Fellowship by the Ministry of Culture, Government of India, for his research on the history
            of Thumri and the contribution of Girija Devi. Continuing his lifelong pursuit of musical
            refinement, he is presently training under Pt. Uday Bhawalkar, immersing himself in the
            profound nuances of Dhrupad.
          </motion.p>
        </div>
      </section>

     

      {/* ══════════════════════════
          GURUS
      ══════════════════════════ */}
      <Gurus />


      {/* ══════════════════════════
          PERFORMANCES
      ══════════════════════════ */}
      <PerformancesMobile />

      <Divider />

      {/* ══════════════════════════
          BROTHERHOOD — DevaSaman
      ══════════════════════════ */}
      <section className="px-6 py-8">

        <motion.div {...fadeUp(0)}>
          <SectionLabel text="Musical Brotherhood" />
          <h2 className="font-cinzel font-semibold text-[1.8rem] text-[#f0e6d0] tracking-wide leading-tight mb-1">
            DevaSaman
          </h2>
          <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] tracking-wide mb-5">
            Debapriya &amp; Samanwaya · Artistic Soulmates
          </p>
        </motion.div>

        <div className="space-y-4 font-jost font-light text-[#b8966e] text-sm leading-[1.85] mb-8">
          <motion.p {...fadeUp(0.1)}>
            Debapriya and Samanwaya are artistic soulmates who have been performing, composing,
            creating, and teaching together for over two decades — both as acclaimed soloists and
            as the distinctive duo <span className="text-[#c9a455]/90 font-normal">DevaSaman</span>.
            Among the very few enduring classical duos in the country, their partnership is built
            on a deep musical understanding, creative synergy, and a shared commitment to preserving
            and reimagining the beauty of Indian classical music for contemporary audiences.
          </motion.p>
          <motion.p {...fadeUp(0.15)}>
            Together, they have directed the{" "}
            <span className="font-playfair italic text-[#f0e6d0]/55">National Award-winning documentary Girija – A Lifetime in Music</span>{" "}
            and composed music for films, theatre productions, and the Australian feature film{" "}
            <span className="font-playfair italic text-[#f0e6d0]/55">The Last Warrior</span>. Their
            performances seamlessly weave together tradition, emotion, and innovation, offering
            audiences a rich and immersive musical experience. Having toured extensively across India
            and internationally, they continue to captivate connoisseurs, enthusiasts, and listeners of
            all generations through concerts, collaborations, and educational initiatives around the
            world.
          </motion.p>
        </div>

        {/* Trio images — vertical stack */}
        <div className="flex flex-col gap-4">
          {DEVASAMAN_TRIO.map((item, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)}>
              <img
                src={item.src}
                alt={item.label}
                className="w-full object-cover"
                style={{
                  aspectRatio: i === 1 ? "16/9" : "4/3",
                  filter: "brightness(0.82) sepia(0.10)",
                  maskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 30%, transparent 100%)",
                  WebkitMaskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 30%, transparent 100%)",
                }}
              />
              <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-[#b8966e]/50 mt-2 text-center">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════
          GIRIJA LEGACY
      ══════════════════════════ */}
      <section className="px-6 py-8">

        <motion.div {...fadeUp(0)}>
          <SectionLabel text="The Award - Winning Documentary" />
          <h2 className="font-cinzel font-semibold text-[1.8rem] text-[#f0e6d0] tracking-wide leading-tight mb-1">
            Girija – A Lifetime in Music
          </h2>
          <p className="font-playfair italic text-[#c9a455]/80 text-[0.95rem] tracking-wide mb-5">
            Tribute to Gurumaa, the Thumri Queen
          </p>
        </motion.div>

        <div className="space-y-4 font-jost font-light text-[#b8966e] text-sm leading-[1.85] mb-6">
          <motion.p {...fadeUp(0.1)}>
            <span className="font-playfair italic text-[#f0e6d0]/55">Girija – A Lifetime in Music</span>{" "}
            is a heartfelt tribute by the duo DevaSaman to their revered Gurumaa, the legendary Girija
            Devi. The film reflects not only her unparalleled musical brilliance, but also the spiritual
            depth, warmth, and human simplicity that defined her life and presence.
          </motion.p>

          <motion.p
            className="font-playfair italic text-[#f0e6d0]/50 text-[0.88rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-4"
            {...fadeUp(0.15)}
          >
            "Our thought was to let the world know about her vision, through which she could build a
            beautiful bridge between the living world and the spiritual realms. She could effortlessly
            break through paradigms and create beauty with simple words, relating them to daily life.
            We used to be awestruck by her simplicity, nurtured in the midst of her divinity." … the
            duo says. "Life was never so beautiful until we began to see music through her, and
            understand the subtleties she revealed with every word of music she uttered."
            
          </motion.p>

          <motion.p {...fadeUp(0.1)}>
            This nationally and internationally award-winning documentary offers a visual journey
            through the music, philosophy, ideas, and inspiration of the legendary Girija Devi. More
            than a musical portrait, it reflects the struggle of a woman navigating the socio-economic
            transformations of pre- and post-independence India — preserving her artistic integrity
            within a male-dominated society and emerging as a lasting symbol of strength and grace.
          </motion.p>

          <motion.p {...fadeUp(0.12)}>
            The film features rare anecdotes and interviews with stalwarts such as Pt. Ravi Shankar,
            Kishori Amonkar, Ustad Abdul Rashid Khan, Pt. Birju Maharaj, Ustad Amjad Ali Khan, and
            Pt. Rajan &amp; Sajan Mishra, among many others, making it a valuable resource for students,
            connoisseurs, and lovers of Indian classical music.
          </motion.p>

          <motion.p
            className="font-playfair italic text-[#f0e6d0]/50 text-[0.88rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-4"
            {...fadeUp(0.14)}
          >
            "We are immensely grateful to the entire team of the film, including Madhu Chandra and
            Sudha Datta as producers; our co-director and editor Sankalp Meshram, cinematographers
            Naiyer Ghufran and Prabal Bose, sound engineer Partha Sarathi Sanyal, sound mixer Ajay PB
            and many more, for making this dream project a real historical gem."
            <span className="block mt-2 not-italic font-jost text-[10px] tracking-[0.3em] uppercase text-[#c9a455]/50">
              — Debapriya Adhikary &amp; Samanwaya Sarkar
            </span>
          </motion.p>
        </div>

        {/* YouTube embed */}
        <motion.div {...fadeUp(0.15)}>
          <div
            className="relative w-full"
            style={{
              paddingBottom: "56.25%",
              border: "1px solid rgba(201,164,85,0.30)",
              boxShadow: "0 0 32px rgba(201,164,85,0.08)",
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
          <p className="font-jost text-[10px] tracking-[0.3em] uppercase text-[#b8966e]/60 mt-2">
            Documentary · Girija – A Lifetime in Music
          </p>
        </motion.div>
      </section>

      <Divider />

      {/* ══════════════════════════
          RECOGNITION — AWARDS
      ══════════════════════════ */}
      <section className="px-6 py-8">

        <motion.div className="mb-8" {...fadeUp(0)}>
          <SectionLabel text="Recognition" />
          <h2 className="font-cinzel text-[1.8rem] text-[#f0e6d0] tracking-wider leading-none">
            A Life in Music
          </h2>
        </motion.div>

        {/* Awards image */}
        <motion.div className="mb-8" {...fadeUp(0.1)}>
          <img
            src="/assets/AwardsImg.png"
            alt=""
            className="w-full object-contain "
            style={{
              filter: "brightness(0.80) sepia(0.12)",
              maskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 30%, transparent 100%)",
            }}
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative mb-6">
          <div className="absolute left-[3.5rem] top-0 bottom-0 w-[1px]
                          bg-gradient-to-b from-[#c9a455]/40 via-[#c9a455]/20 to-transparent" />
          <div className="space-y-0">
            {AWARDS.map((award, i) => (
              <motion.div
                key={i}
                className="relative pl-[4.8rem]"
                {...fadeUp(i * 0.06)}
              >
                <span className={`absolute left-0 top-[1rem] w-[3rem] text-right
                                  font-cinzel text-[0.65rem] tracking-[0.08em] leading-none
                                  ${award.highlight ? "text-[#c9a455]" : "text-[#c9a455]/40"}`}>
                  {award.year}
                </span>
                <span className={`absolute left-[3.5rem] -translate-x-1/2 top-[1.02rem]
                                  text-[6px] leading-none
                                  ${award.highlight ? "text-[#c9a455]" : "text-[#c9a455]/30"}`}>
                  ◆
                </span>
                <div className="border-b py-2.5"
                     style={{ borderColor: award.highlight ? "rgba(201,164,85,0.22)" : "rgba(255,255,255,0.05)" }}>
                  <p className={`font-cinzel text-[0.8rem] tracking-wide leading-snug mb-0.5
                                ${award.highlight ? "text-[#f0e6d0] font-semibold" : "text-[#f0e6d0]/70"}`}>
                    {award.title}
                    {award.highlight && <span className="ml-2 font-jost text-[7px] text-[#c9a455]">★</span>}
                  </p>
                  <p className="font-jost font-light text-[0.75rem] text-[#b8966e]/50 leading-relaxed">
                    {award.org}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Fellowships */}
        <motion.div {...fadeUp(0.1)}>
          <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-5 flex items-center gap-3">
            <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
            Fellowships &amp; Scholarships
          </p>
          <div className="space-y-4">
            {FELLOWSHIPS.map((f, i) => (
              <motion.div key={i} className="border-l-2 border-[#c9a455]/20 pl-4" {...fadeUp(i * 0.1)}>
                <p className="font-cinzel text-[0.78rem] tracking-wide text-[#c9a455]/60 mb-0.5">{f.period}</p>
                <p className="font-jost font-light text-[0.88rem] text-[#f0e6d0]/75 leading-snug mb-0.5">{f.title}</p>
                {f.org && <p className="font-jost text-[0.75rem] text-[#b8966e]/50">{f.org}</p>}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Affiliations */}
        <motion.div className="mt-9" {...fadeUp(0.1)}>
          <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-5 flex items-center gap-3">
            <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
            Affiliations &amp; Certifications
          </p>
          <div className="space-y-3">
            {AFFILIATIONS.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-[#c9a455]/30 text-[8px] mt-[0.35rem] shrink-0">◆</span>
                <p className="font-jost font-light text-[0.85rem] text-[#f0e6d0]/75 leading-relaxed tracking-[0.03em]">
                  {a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      

      {/* ══════════════════════════
          GALLERY — infinite marquee
      ══════════════════════════ */}
      <section className="py-8 overflow-hidden">

        <div className="px-6 mb-6">
          <motion.div {...fadeUp(0)}>
            <SectionLabel text="Gallery" />
            <h2 className="font-cinzel text-[1.8rem] text-[#f0e6d0] tracking-wider leading-none">
              Moments in Frame
            </h2>
          </motion.div>
        </div>

        {/* Marquee */}
        <motion.div
          className="overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex gap-3 py-2"
            style={{ width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          >
            {MARQUEE_IMGS.map((src, i) => (
              <div
                key={i}
                className="flex-none cursor-pointer relative overflow-hidden"
                style={{
                  width: "44vw",
                  height: "56vw",
                  borderRadius: "4px",
                  border: "1px solid rgba(201,164,85,0.15)",
                }}
                onClick={() => setLbIdx(i % N)}
              >
                <img
                  src={src} alt=""
                  className="w-full h-full object-cover"
                  style={{ filter: "brightness(0.72) sepia(0.08)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0702]/60 to-transparent" />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <p className="text-center font-jost text-[9px] tracking-[0.4em] uppercase text-[#c9a455]/30 mt-4">
          Tap to view
        </p>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lbIdx !== null && (
          <Lightbox
            idx={lbIdx}
            total={N}
            onClose={() => setLbIdx(null)}
            onPrev={() => setLbIdx(i => (i - 1 + N) % N)}
            onNext={() => setLbIdx(i => (i + 1) % N)}
          />
        )}
      </AnimatePresence>

    </main>
  );
};

export default AboutMobile;
