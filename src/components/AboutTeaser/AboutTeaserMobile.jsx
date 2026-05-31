import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const credentials = [
  {
    value: "President's Award",
    label: "2002 · All India Radio",
    sub:   "AIR Music Competition",
  },
  {
    value: "A-Grade Artist",
    label: "All India Radio & Doordarshan",
    sub:   "Khayal - Radio Broadcast",
  },
  {
    value: "National Film Award",
    label: "2018 · President of India",
    sub:   "GIRIJA - A Lifetime in Music",
  },
];

const AboutTeaserMobile = () => (
  <section className="md:hidden px-6 ">

    {/* Pull quote */}
    <motion.blockquote
      className="relative font-playfair italic text-[#f0e6d0]/85 text-[1.35rem] leading-[1.6] mb-8 pl-5"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <span
        className="absolute left-0 top-1 bottom-1 w-[2px]"
        style={{ background: "linear-gradient(to bottom, #c9a455, transparent)" }}
      />
      "A voice shaped by decades of devotion — where every raga is not just performed, but lived."
    </motion.blockquote>

    {/* Bio */}
    <div className="space-y-4 mb-8">
      <motion.p
        className="font-jost font-light text-[#b8966e] text-sm leading-[1.75]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        Debapriya Adhikary is one of the foremost voices in contemporary Hindustani classical
        music — a torchbearer of the{" "}
        <em className="text-[#c9a455]/80 not-italic font-normal">Senia - Banaras</em>{" "}
        tradition and an{" "}
        <em className="text-[#c9a455]/80 not-italic font-normal">A-Grade Artist of All India Radio</em>
        , whose art carries the quiet weight of a tradition he has spent a lifetime learning and living.
      </motion.p>

      <motion.p
        className="font-jost font-light text-[#b8966e] text-sm leading-[1.75]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
      >
        Beyond music, he is a composer, filmmaker, educator, and producer. His documentary{" "}
        <em className="text-[#c9a455]/80 not-italic font-normal">Girija – A Lifetime In Music</em>{" "}
        earned him the National Film Award in 2018, presented by the President of India.
      </motion.p>
    </div>

    {/* Gold separator */}
    <motion.div
      className="h-[1px] mb-8"
      style={{ background: "linear-gradient(to right, transparent, #c9a455 40%, transparent)" }}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: "easeInOut" }}
    />

    {/* Credentials */}
    <div className="flex flex-col gap-6 mb-10">
      {credentials.map((c, i) => (
        <motion.div
          key={c.value}
          className="flex flex-col gap-1"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
        >
          <span className="font-cinzel text-[#c9a455] text-[0.9rem] tracking-wide">{c.value}</span>
          <span className="font-jost text-[#f0e6d0]/55 text-[10px] tracking-[0.2em] uppercase">{c.label}</span>
          <span className="font-playfair italic text-[#b8966e] text-sm">{c.sub}</span>
        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <div className="flex justify-center">
      <Link
        to="/about"
        className="inline-flex items-center gap-3 font-jost text-[11px] tracking-[0.3em] uppercase
                   text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
                   hover:border-[#c9a455] transition-all duration-300"
      >
        Discover His Journey <span>→</span>
      </Link>
    </div>

  </section>
);

export default AboutTeaserMobile;
