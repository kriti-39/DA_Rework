import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ── SECTION LABEL (local copy so component is self-contained) ─
const SectionLabel = ({ text }) => (
  <div className="flex items-center gap-4 mb-5">
    <div className="h-[1px] w-10 bg-[#c9a455]" />
    <span className="font-jost text-[11px] tracking-[0.45em] uppercase text-[#c9a455]">
      {text}
    </span>
  </div>
);

// ── IMAGE DATA — left: SM, centre: DS1, right: DA ─────────────
const TRIO = [
  { src: "/assets/SM.jpg",  label: "Samanwaya Sarkar",   offsetY: 0 },
  { src: "/assets/DS1.jpg", label: "DevaSaman",           offsetY: 0 },
  { src: "/assets/DA.JPG",  label: "Debapriya Adhikary",  offsetY: 0 },
];

// ── COMPONENT ─────────────────────────────────────────────────
const DevaSaman = () => {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);

  // Parallax zoom scoped to the text block
  const { scrollYProgress: bgProg } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });
  const bgRaw   = useTransform(bgProg, [0, 1], [1.0, 1.1]);
  const bgScale = useSpring(bgRaw, { stiffness: 40, damping: 20 });

  return (
    <section ref={sectionRef} className="relative overflow-hidden pt-4 pb-10 md:pt-6 md:pb-14">

      {/* ── Content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 lg:px-24">

        {/* Text block — DSbg sits behind it as its own background */}
        <div ref={textRef} className="relative overflow-hidden py-12 md:py-14 mb-2">

          {/* Background image — contained, centred, darkened */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ scale: bgScale, transformOrigin: "center center" }}
          >
            <img
              src="/assets/DSbg.png"
              alt=""
              className="w-full h-full object-contain object-center"
              style={{ filter: "brightness(0.18) sepia(0.35)" }}
            />
          </motion.div>

          {/* Text content sits on top */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
          <SectionLabel text="Brotherhood" />

          <h2
            className="font-cinzel font-semibold
                       text-[2rem] md:text-[2.6rem] lg:text-[3rem]
                       text-[#f0e6d0] tracking-wide leading-tight mb-2"
          >
            DevaSaman
          </h2>

          <p
            className="font-playfair italic text-[#c9a455]/80
                       text-[0.95rem] md:text-[1.05rem] tracking-wide mb-7"
          >
            Debapriya &amp; Samanwaya · Artistic Soulmates
          </p>

          <div
            className="space-y-5 font-jost font-light text-[#b8966e]
                       text-[0.88rem] md:text-[0.93rem] leading-[1.9]"
          >
            <p>
              Debapriya and Samanwaya are artistic soulmates who have been performing,
              composing, creating, and teaching together for over two decades — both as
              acclaimed soloists and as the distinctive duo{" "}
              <span className="text-[#c9a455]/90 font-normal">DevaSaman</span>. Among
              the very few enduring classical duos in the country, their partnership is
              built on a deep musical understanding, creative synergy, and a shared
              commitment to preserving and reimagining the beauty of Indian classical
              music for contemporary audiences.
            </p>
            <p>
              Together, they have directed the{" "}
              <span className="font-playfair italic text-[#f0e6d0]/60">
                National Award-winning documentary Girija – A Lifetime in Music
              </span>{" "}
              and composed music for films, theatre productions, and the Australian
              feature film{" "}
              <span className="font-playfair italic text-[#f0e6d0]/60">
                The Last Warrior
              </span>
              . Their performances seamlessly weave together tradition, emotion, and
              innovation, offering audiences a rich and immersive musical experience.
              Having toured extensively across India and internationally, they continue
              to captivate connoisseurs, enthusiasts, and listeners of all generations
              through concerts, collaborations, and educational initiatives around the
              world.
            </p>
          </div>
          </motion.div>
        </div>{/* end text+bg wrapper */}

        {/* ── Three-image trio ── */}
        <div
          className="mt-8 items-start"
          style={{ display: "grid", gridTemplateColumns: "1.3fr 2.8fr 1.3fr", gap: "10px", alignItems: "center" }}
        >
          {TRIO.map(({ src, label, offsetY }, i) => (
            <motion.div
              key={i}
              style={{ marginTop: offsetY }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 2.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 + i * 0.18,
              }}
            >
              <motion.div
                style={{ height: i === 1 ? "420px" : "336px", cursor: "pointer" }}
                whileHover={{
                  boxShadow: "0 6px 28px rgba(201,164,85,0.14)",
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <img
                  src={src}
                  alt={label}
                  style={{
                    width:          "100%",
                    height:         "100%",
                    objectFit:      "cover",
                    objectPosition: i === 1 ? "center 30%" : "center center",
                    display:        "block",
                    filter:         "brightness(0.82) sepia(0.10)",
                    maskImage:
                      "radial-gradient(ellipse 90% 88% at 50% 50%, black 30%, transparent 100%)",
                    WebkitMaskImage:
                      "radial-gradient(ellipse 90% 88% at 50% 50%, black 30%, transparent 100%)",
                  }}
                />
              </motion.div>

              {/* Label */}
              <p
                className="font-jost text-[10px] tracking-[0.35em] uppercase
                           text-[#b8966e]/50 mt-4 text-center"
              >
                {label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DevaSaman;
