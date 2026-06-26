import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Tablet-only rendering of the Home "About" teaser (md–lg, ~768–1023px).
// Same content as desktop — bio kept single-column (two columns are too
// cramped at this width) and spacing tuned to a fixed tablet range.

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 1.2, ease: "easeOut", delay },
  }),
};

const credentials = [
  { value: "President's Award",     label: "2002 · All India Radio",          sub: "AIR Music Competition" },
  { value: "A-Grade Artist",        label: "All India Radio & Doordarshan",   sub: "Khayal - Radio Broadcast" },
  { value: "National Film Award",   label: "2018 · President of India",       sub: "GIRIJA - A Lifetime in Music" },
];

const AboutTeaserTablet = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 25% 55%, #1e0e05 0%, transparent 58%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-10 py-16">

        <motion.div
          className="flex items-center gap-4 mb-10"
          variants={fadeIn} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
        >
          <div className="h-[1px] w-10 bg-[#c9a455]" />
          <span className="font-jost text-[12px] tracking-[0.45em] uppercase text-[#c9a455]">
            The Artist
          </span>
        </motion.div>

        <motion.blockquote
          className="relative font-playfair italic text-[#f0e6d0]/85 text-[1.7rem] leading-[1.55] mb-10 pl-7"
          variants={fadeUp} custom={0.1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
        >
          <span
            className="absolute left-0 top-2 bottom-2 w-[2px]"
            style={{ background: "linear-gradient(to bottom, #c9a455, transparent)" }}
          />
          "A voice shaped by decades of devotion — where every raga is not just performed, but lived."
        </motion.blockquote>

        <div className="flex flex-col gap-5 mb-10">
          <motion.p
            className="font-jost font-light text-[#b8966e] text-[1rem] leading-[1.65]"
            variants={fadeUp} custom={0.18} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            Debapriya Adhikary is one of the foremost voices in contemporary Hindustani classical music — a torchbearer of the{" "}
            <em className="text-[#c9a455]/80 not-italic font-normal">Senia - Banaras</em>{" "}
            tradition and an{" "}
            <em className="text-[#c9a455]/80 not-italic font-normal">A - Grade Artist of All India Radio</em>,
            whose art carries the quiet weight of a tradition he has spent a lifetime learning and living.
            His performances move between the intimacy of a late-night riyaz and the commanding presence
            of a grand concert stage.
          </motion.p>

          <motion.p
            className="font-jost font-light text-[#b8966e] text-[1rem] leading-[1.65]"
            variants={fadeUp} custom={0.26} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}
          >
            Beyond music, he is a composer, filmmaker, educator, and producer — a rare polymath of the
            classical world. His documentary{" "}
            <em className="text-[#c9a455]/80 not-italic font-normal">Girija – A Lifetime In Music</em>{" "}
            earned him the National Film Award in 2018, presented by the President of India, cementing
            his place as a guardian of living cultural heritage.
          </motion.p>
        </div>

        <motion.div
          className="h-[1px] mb-10"
          style={{ background: "linear-gradient(to right, transparent, #c9a455 40%, transparent)" }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        <div className="grid grid-cols-3 gap-6 mb-14">
          {credentials.map((c, i) => (
            <motion.div
              key={c.value}
              className="flex flex-col gap-1.5"
              variants={fadeUp} custom={i * 0.1} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            >
              <span className="font-cinzel text-[#c9a455] text-[0.92rem] tracking-wide">{c.value}</span>
              <span className="font-jost text-[#f0e6d0]/60 text-[9px] tracking-[0.18em] uppercase">{c.label}</span>
              <span className="font-playfair italic text-[#b8966e] text-[0.85rem] mt-0.5">{c.sub}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="flex justify-center"
          variants={fadeIn} custom={0.15} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-3 font-jost text-[11px] tracking-[0.3em] uppercase
                       text-[#c9a455] border border-[#c9a455]/40 px-8 py-4
                       hover:border-[#c9a455] hover:bg-[#c9a455]/5 transition-all duration-300 group"
          >
            Discover His Journey
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTeaserTablet;
