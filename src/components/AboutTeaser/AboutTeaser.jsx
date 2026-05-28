import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
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
  {
    value: "National Film Award",
    label: "2018 · President of India",
    sub: "Girija – A Lifetime In Music",
  },
  {
    value: "A-Grade Artist",
    label: "All India Radio & Doordarshan",
    sub: "Broadcast excellence",
  },
  {
    value: "Vocalist · Filmmaker",
    label: "30+ Years on Stage & Screen",
    sub: "Composer · Educator · Producer",
  },
];

const AboutTeaser = () => {
  return (
    <section className="relative w-full overflow-hidden">

      {/* Warm radial accent — left side */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 55%, #1e0e05 0%, transparent 58%)",
        }}
      />

      {/* Grain texture */}
      

      <div className="relative z-10 max-w-6xl mx-auto px-8 md:px-16 lg:px-20 pt-6 pb-16 md:pt-8 md:pb-20">

        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-14"
          variants={fadeIn}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="h-[1px] w-10 bg-[#c9a455]" />
          <span className="font-jost text-[12px] tracking-[0.45em] uppercase text-[#c9a455]">
            The Artist
          </span>
        </motion.div>

        {/* Pull quote */}
        <motion.blockquote
          className="relative font-playfair italic text-[#f0e6d0]/85 text-[1.55rem] md:text-[1.95rem] lg:text-[2.3rem] leading-[1.55] max-w-3xl mb-16 pl-7"
          variants={fadeUp}
          custom={0.12}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Gold left accent */}
          <span
            className="absolute left-0 top-2 bottom-2 w-[2px]"
            style={{
              background: "linear-gradient(to bottom, #c9a455, transparent)",
            }}
          />
          "A voice shaped by decades of devotion — where every raga is not just performed, but lived."
        </motion.blockquote>

        {/* Bio columns */}
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <motion.p
            className="font-jost font-light text-[#a08060] text-sm md:text-[1.1rem] leading-[1.6]"
            variants={fadeUp}
            custom={0.2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            Debapriya Adhikary is one of the foremost voices in contemporary
            Hindustani classical music — a vocalist whose art carries the quiet
            weight of a tradition he has spent a lifetime learning and living.
            His performances move between the intimacy of a late-night riyaz and
            the commanding presence of a grand concert stage.
          </motion.p>

          <motion.p
            className="font-jost font-light text-[#a08060] text-sm md:text-[1.1rem] leading-[1.6]"
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            Beyond music, he is a composer, filmmaker, educator, and producer —
            a rare polymath of the classical world. His documentary{" "}
            <em className="text-[#c9a455]/80 not-italic font-normal">
              Girija – A Lifetime In Music
            </em>{" "}
            earned him the National Film Award in 2018, presented by the
            President of India, cementing his place as a guardian of living
            cultural heritage.
          </motion.p>
        </div>

        {/* Gold separator */}
        <motion.div
          className="h-[1px] mb-10"
          style={{
            background:
              "linear-gradient(to right, transparent, #c9a455 40%, transparent)",
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Credentials row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16">
          {credentials.map((c, i) => (
            <motion.div
              key={c.value}
              className="flex flex-col gap-1.5"
              variants={fadeUp}
              custom={i * 0.12}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <span className="font-cinzel text-[#c9a455] text-[0.95rem] md:text-base tracking-wide">
                {c.value}
              </span>
              <span className="font-jost text-[#f0e6d0]/60 text-[10px] tracking-[0.2em] uppercase">
                {c.label}
              </span>
              <span className="font-playfair italic text-[#a08060] text-sm mt-0.5">
                {c.sub}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeIn}
          custom={0.15}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-3 font-jost text-[11px] tracking-[0.3em] uppercase text-[#c9a455] border border-[#c9a455]/40 px-8 py-4 hover:border-[#c9a455] hover:bg-[#c9a455]/5 transition-all duration-300 group"
          >
            Discover His Journey
            <span className="transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTeaser;
