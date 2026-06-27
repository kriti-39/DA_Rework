import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DevaSaman from "../components/DevaSaman/DevaSaman";
import Gurus from "../components/Gurus/Gurus";
import Performances from "../components/Performances/Performances";

// ── TABLET PORTRAIT rendering of the About page ──
// Same content/data as the desktop About page, rebuilt as a single column
// so it fills a portrait tablet (768–1279px) instead of the desktop's
// two-column (lg:flex-row) layout that clusters left at this width.
// Desktop/landscape still use About.jsx; phones use AboutMobile.jsx.

const AWARDS = [
  { year: "1994",    title: "First Prize · Inter District Music Competition",         org: "Dhanbad",                                                                  highlight: false },
  { year: "2001",    title: "First Prize · Akhil Bharatiya Sangeet Pratiyogita",      org: "Prayag Sangeet Samiti, Allahabad",                                          highlight: false },
  { year: "2001–02", title: "First Prize · Inter College & East Zonal Youth Festival", org: "AIU, Govt. of India · Vinoba Bhave University & ISM Dhanbad",                highlight: false },
  { year: "2002",    title: "PRESIDENT'S AWARD - AIR NATIONAL MUSIC COMPETITION",     org: "First prize conferred on behalf of President of India",                     highlight: true  },
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
  "/assets/new22.jpeg",
];

const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="h-[1px] w-10 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
      {text}
    </span>
  </div>
);

const Divider = () => (
  <div className="flex items-center justify-center gap-4 py-2">
    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent to-[#c9a455]/30" />
    <span className="text-[#c9a455]/35 text-[8px]">◆</span>
    <div className="h-[1px] w-32 bg-gradient-to-l from-transparent to-[#c9a455]/30" />
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } },
};

const AboutTablet = () => {
  const [lbIdx, setLbIdx] = useState(null);
  const N = GALLERY_IMGS.length;
  const closeLb = () => setLbIdx(null);
  const lbPrev = (e) => { e.stopPropagation(); setLbIdx(i => (i - 1 + N) % N); };
  const lbNext = (e) => { e.stopPropagation(); setLbIdx(i => (i + 1) % N); };

  const imgMask = {
    filter: "brightness(0.86) sepia(0.08)",
    maskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 34%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(ellipse 90% 88% at 50% 50%, black 34%, transparent 100%)",
  };

  return (
    <main className="overflow-x-hidden">

      {/* ── OPENER ── */}
      <section className="relative pt-28 pb-4">
        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionLabel text="About" />
            <h1 className="font-cinzel font-semibold text-[2.6rem] text-[#f0e6d0] tracking-wide leading-tight">
              Debapriya Adhikary
            </h1>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1.1rem] tracking-wide mb-7">
              Singer · Composer · Mentor · Producer
            </p>
          </motion.div>

          <motion.div
            className="space-y-4 font-jost font-light text-[#b8966e] text-[0.98rem] leading-[1.9]"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
          >
            <p className="font-playfair italic text-[#f0e6d0]/55 text-[1rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-5">
              "I didn't begin learning music with the intention of becoming a professional performer.
              My mother always said that music is the greatest form of wisdom — something I should
              embrace as a lifelong companion."
            </p>
            <p>
              Born in the industrial township of{" "}
              <span className="text-[#c9a455]/80 font-normal">Sindri, Jharkhand</span>, into a humble and
              educated Bengali family, Debapriya displayed a natural affinity for the arts from an early age.
              His introduction to music did not begin through formal lessons, but through the quiet, immersive
              world of listening to his mother,{" "}
              <span className="text-[#c9a455]/80 font-normal">Anita Adhikary</span>, sing and practise at home.
              A disciple of Pt. Jivnath Jha, affectionately known as Taanraj, she became his very first source
              of musical inspiration.
            </p>
            <p>
              Recognising her son's innate sensitivity towards music, she introduced him to Pt. Samaresh
              Chawdhury of the Senia and Maihar gharanas, who later accepted Debapriya as his Gandabandh
              disciple. From the age of eight, Debapriya underwent rigorous training under his guidance for
              fourteen formative years. Throughout this journey, his mother travelled tirelessly between Sindri
              and Durgapur, never allowing weather, festivals, or circumstance to interrupt his learning — a
              quiet testament to her unwavering dedication and belief in her son's path.
            </p>
          </motion.div>
        </div>

        {/* AboutHero image — full width */}
        <motion.img
          src="/assets/AboutHero.png"
          alt="Debapriya Adhikary"
          className="w-full object-contain mt-6"
          style={imgMask}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 1.6 }}
        />

        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          <motion.div
            className="space-y-4 font-jost font-light text-[#b8966e] text-[0.98rem] leading-[1.9] pt-6"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}
          >
            <p className="font-playfair italic text-[#f0e6d0]/55 text-[1rem] leading-[1.8] border-l-2 border-[#c9a455]/30 pl-5">
              "Mom never allowed any excuse when it came to learning. I remember once she got completely
              drenched in heavy rain while taking me to the railway station — she remained wet, standing near
              the door for four hours just to dry herself, yet never suggested skipping the class."
            </p>
            <p>
              Under the guidance of Pt. Samaresh Chawdhury, Debapriya cultivated a profound understanding of
              voice culture, tonal smoothness, and the clarity required to render intricate musical movements
              with grace and precision. These formative years laid the foundation for the artistic identity that
              would gradually unfold in the years to come. Yet his training extended far beyond technique alone.
              It was an education in discipline, patience, humility, and the art of deep listening — values that
              became inseparable from his music and personality alike.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="h-[1px] w-6 bg-[#c9a455]/50" />
              <span className="font-jost text-[14px] tracking-[0.4em] uppercase text-[#c9a455]/70">
                Musical Journey
              </span>
            </div>
            <p>
              Debapriya's musical journey found deeper expression under the legendary{" "}
              <span className="text-[#c9a455]/80 font-normal">Padma Vibhushan awardee Dr. Girija Devi</span>{" "}
              of the Benaras gharana, with whom he trained as a Gandabandh disciple for eleven transformative
              years. Under her affectionate yet rigorous guidance, he immersed himself in the rich expressive
              traditions of Thumri, Tappa, Tap-Thumri, Dadra, Kajri, and Jhula, while also absorbing rare
              compositions and the distinctive khayal gayaki of Benaras. More than repertoire alone, Dr. Girija
              Devi shaped his artistic vision with emotional depth, inner strength, and an understanding that
              music must transcend the boundaries of notes and words.
            </p>
            <p>
              Through her teachings, he learned to approach music not merely as performance, but as a living
              expression of experience, devotion, and humanity. He also received guidance from Pt. Kumar Prasad
              Mukherjee of the Agra and Rampur-Sahaswan traditions, and from Pt. Vijay Kichlu of the Agra
              gharana, who entrusted him with numerous rare bandishes and a deeply refined understanding of the
              technical and aesthetic beauty of ragas. A torchbearer of the Senia-Banaras tradition, his music
              is marked by a rare balance of tradition and innovation. More than three decades of rigorous
              training have shaped a style distinguished by clarity, emotional depth, and technical finesse.
            </p>
            <p>
              An A-Grade Artist of All India Radio, as well as a recipient of the National Film Award and the
              President's Award, he represents a unique confluence of scholarship, performance, and creative
              vision. He holds a Master's degree in Music and was awarded the Junior Research Fellowship by the
              Ministry of Culture, Government of India, for his research on the history of Thumri and the
              contribution of Girija Devi. Continuing his lifelong pursuit of musical refinement, he is
              presently training under Pt. Uday Bhawalkar, immersing himself in the profound nuances of Dhrupad.
            </p>
          </motion.div>
        </div>
      </section>

      <Gurus />
      <Performances />
      <Divider />
      <DevaSaman />
      <Divider />

      {/* ── GIRIJA DOCUMENTARY ── */}
      <section className="py-10">
        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel text="The Award - Winning Documentary" />
            <h2 className="font-cinzel font-semibold text-[2.2rem] text-[#f0e6d0] tracking-wide leading-tight mb-2">
              GIRIJA -<br />A LIFETIME IN MUSIC
            </h2>
            <p className="font-playfair italic text-[#c9a455]/80 text-[1.05rem] tracking-wide mb-6">
              Tribute to Gurumaa, the Thumri Queen
            </p>
          </motion.div>

          {/* Video first on tablet */}
          <div
            className="relative w-full mb-7"
            style={{ paddingBottom: "56.25%", border: "1px solid rgba(201,164,85,0.30)", boxShadow: "0 0 48px rgba(201,164,85,0.08)" }}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/Ooz9sy3YHeo"
              title="Girija – A Lifetime in Music"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="space-y-5 font-jost font-light text-[#b8966e] text-[0.98rem] leading-[1.9]">
            <p>
              <span className="font-playfair italic text-[#f0e6d0]/55">Girija – A Lifetime in Music</span>{" "}
              is a heartfelt tribute by the duo DevaSaman to their revered Gurumaa, the legendary Girija Devi.
              The film reflects not only her unparalleled musical brilliance, but also the spiritual depth,
              warmth, and human simplicity that defined her life and presence.
            </p>
            <p className="font-playfair italic text-[#f0e6d0]/55 text-[0.95rem] leading-[1.85] border-l-2 border-[#c9a455]/30 pl-5">
              "Our thought was to let the world know about her vision, through which she could build a beautiful
              bridge between the living world and the spiritual realms. She could effortlessly break through
              paradigms and create beauty with simple words, relating them to daily life. We used to be awestruck
              by her simplicity, nurtured in the midst of her divinity." … the duo says. "Life was never so
              beautiful until we began to see music through her, and understand the subtleties she revealed with
              every word of music she uttered."
            </p>
            <p>
              This nationally and internationally award-winning documentary offers a visual journey through the
              music, philosophy, ideas, and inspiration of the legendary Girija Devi. More than a musical
              portrait, it reflects the struggle of a woman navigating the socio-economic transformations of
              pre- and post-independence India — preserving her artistic integrity within a male-dominated
              society and emerging as a lasting symbol of strength and grace.
            </p>
            <p>
              The film features rare anecdotes and interviews with stalwarts such as Pt. Ravi Shankar, Kishori
              Amonkar, Ustad Abdul Rashid Khan, Pt. Birju Maharaj, Ustad Amjad Ali Khan, and Pt. Rajan & Sajan
              Mishra, among many others, making it a valuable resource for students, connoisseurs, and lovers of
              Indian classical music.
            </p>
            <p className="font-playfair italic text-[#f0e6d0]/50 text-[0.95rem] leading-[1.85] border-l-2 border-[#c9a455]/30 pl-5">
              "We are immensely grateful to the entire team of the film, including Madhu Chandra and Sudha Datta
              as producers; our co-director and editor Sankalp Meshram; cinematographers Naiyer Ghufran and
              Prabal Bose; sound engineer Partha Sarathi Sanyal; sound mixer Ajay PB and many more, for making
              this dream project a real historical gem."
              <span className="block mt-2 not-italic font-jost text-[10px] tracking-[0.3em] uppercase text-[#c9a455]/50">
                — Debapriya Adhikary &amp; Samanwaya Sarkar
              </span>
            </p>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── RECOGNITION ── */}
      <section className="pt-8 pb-16">
        <div className="max-w-2xl mx-auto px-10 sm:px-14">
          <motion.div className="mb-9" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
            <SectionLabel text="Recognition" />
            <h2 className="font-cinzel text-[2.4rem] text-[#f0e6d0] tracking-wider leading-none">
              A Life in Music
            </h2>
          </motion.div>

          {/* Awards image */}
          <motion.img
            src="/assets/AwardsImg.png"
            alt=""
            className="w-full object-contain mb-9"
            style={{
              filter: "brightness(0.80) sepia(0.12)",
              maskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 30%, transparent 100%)",
              WebkitMaskImage: "radial-gradient(ellipse 92% 88% at 50% 50%, black 30%, transparent 100%)",
            }}
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.4 }}
          />

          {/* Timeline */}
          <div className="relative mb-12">
            <div className="absolute left-[3.8rem] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#c9a455]/40 via-[#c9a455]/20 to-transparent" />
            <div className="space-y-0">
              {AWARDS.map((award, i) => (
                <motion.div
                  key={i}
                  className="relative pl-[5.2rem]"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
                >
                  <span className={`absolute left-0 top-[1rem] w-[3.3rem] text-right font-cinzel text-[0.72rem] tracking-[0.1em] leading-none ${award.highlight ? "text-[#c9a455]" : "text-[#c9a455]/45"}`}>
                    {award.year}
                  </span>
                  <span className={`absolute left-[3.8rem] -translate-x-1/2 top-[1.02rem] text-[6px] leading-none ${award.highlight ? "text-[#c9a455]" : "text-[#c9a455]/35"}`}>◆</span>
                  <div className="border-b py-4" style={{ borderColor: award.highlight ? "rgba(201,164,85,0.22)" : "rgba(255,255,255,0.05)" }}>
                    <p className={`font-cinzel text-[0.92rem] tracking-wide leading-snug mb-1 ${award.highlight ? "text-[#f0e6d0] font-semibold" : "text-[#f0e6d0]/75 font-normal"}`}>
                      {award.title}
                      {award.highlight && <span className="ml-2 font-jost text-[7px] tracking-[0.3em] uppercase text-[#c9a455] align-middle">★</span>}
                    </p>
                    <p className="font-jost font-light text-[0.82rem] text-[#b8966e]/55 tracking-[0.04em] leading-relaxed">
                      {award.org}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Fellowships */}
          <div className="mb-10">
            <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-6 flex items-center gap-3">
              <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
              Fellowships &amp; Scholarships
            </p>
            <div className="space-y-5">
              {FELLOWSHIPS.map((f, i) => (
                <div key={i} className="border-l-2 border-[#c9a455]/20 pl-4">
                  <p className="font-cinzel text-[0.82rem] tracking-wide text-[#c9a455]/60 mb-0.5">{f.period}</p>
                  <p className="font-jost font-light text-[0.95rem] text-[#f0e6d0]/75 leading-snug mb-0.5">{f.title}</p>
                  {f.org && <p className="font-jost text-[0.8rem] text-[#b8966e]/50 leading-relaxed">{f.org}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Affiliations */}
          <div>
            <p className="font-jost text-[11px] tracking-[0.4em] uppercase text-[#c9a455]/70 mb-6 flex items-center gap-3">
              <span className="h-[1px] w-5 bg-[#c9a455]/50 inline-block" />
              Affiliations &amp; Certifications
            </p>
            <div className="space-y-3">
              {AFFILIATIONS.map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-[#c9a455]/30 text-[8px] mt-[0.35rem] shrink-0">◆</span>
                  <p className="font-jost font-light text-[0.95rem] text-[#f0e6d0]/75 leading-relaxed tracking-[0.03em]">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── MOMENTS IN FRAME — auto-scroll carousel ── */}
      <section className="py-8">
        <div className="max-w-2xl mx-auto px-10 sm:px-14 mb-8">
          <SectionLabel text="Gallery" />
          <h2 className="font-cinzel text-[2.2rem] text-[#f0e6d0] tracking-wider leading-none">
            Moments in Frame
          </h2>
        </div>

        <style>{`@keyframes aboutTabMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
        <div
          className="overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          <div
            className="flex gap-4"
            style={{
              width: "max-content",
              animation: "aboutTabMarquee 60s linear infinite",
              animationPlayState: lbIdx !== null ? "paused" : "running",
            }}
          >
            {[...GALLERY_IMGS, ...GALLERY_IMGS].map((src, i) => (
              <div
                key={i}
                className="relative flex-none overflow-hidden cursor-pointer w-[58vw] landscape:w-[40vw]"
                style={{ aspectRatio: "7 / 6", border: "1px solid rgba(201,164,85,0.14)" }}
                onClick={() => setLbIdx(i % N)}
              >
                <img src={src} alt="" className="w-full h-full object-cover" style={{ filter: "brightness(0.84) sepia(0.05)" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lbIdx !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-6 cursor-pointer"
            style={{ backdropFilter: "blur(22px)", background: "rgba(4,2,0,0.86)" }}
            onClick={closeLb}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <button onClick={lbPrev} className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]/70 bg-[#060200]/60">←</button>
            <motion.div
              className="relative" onClick={e => e.stopPropagation()}
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={GALLERY_IMGS[lbIdx]} alt="" className="max-w-[82vw] max-h-[78vh] object-contain" style={{ border: "1px solid rgba(201,164,85,0.35)" }} />
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-jost text-[10px] tracking-[0.45em] uppercase text-[#c9a455]/40 whitespace-nowrap">
                {lbIdx + 1} / {N} · Tap outside to close
              </p>
            </motion.div>
            <button onClick={lbNext} className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-[#c9a455]/40 flex items-center justify-center text-[#c9a455]/70 bg-[#060200]/60">→</button>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
};

export default AboutTablet;
