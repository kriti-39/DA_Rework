import { motion } from "framer-motion";

// ── GURUS ─────────────────────────────────────────────────
const GURUS = [
  { img: "/assets/guru1.png", name: "Smt. Anita Adhikary" },
  { img: "/assets/guru2.jpeg", name: "Pt. Samaresh Chawdhury" },
  { img: "/assets/guru3.jpeg", name: "Padmavibhushan Vid. Girija Devi" },
  { img: "/assets/guru4.jpeg", name: "Padmashri Pt. Vijay Kichlu" },
  { img: "/assets/guru5.jpeg", name: "Pt. Kumar Prasad Mukherjee" },
  { img: "/assets/guru6.jpeg",  name: "Pt. Uday Bhawalkar" },
  { img: "/assets/guru7.jpeg", name: "Dr. Rajeeb Chakraborty" },
];

const Gurus = () => (
  <section className="relative py-10 md:py-4 md:pb-14 px-6 md:px-16 lg:px-24">

    {/* Heading flanked by gold rules */}
    <div className="flex items-center justify-center gap-5 mb-10 md:mb-14">
      <div className="h-[1px] flex-1 max-w-[180px] bg-gradient-to-r from-transparent to-[#c9a455]/35" />
      <h2 className="font-cinzel text-[1.4rem] md:text-[1.9rem] tracking-[0.3em] text-[#f0e6d0]">
        GURUS
      </h2>
      <div className="h-[1px] flex-1 max-w-[180px] bg-gradient-to-l from-transparent to-[#c9a455]/35" />
    </div>

    {/* Portrait row — wraps gracefully on narrow screens */}
    <div className="flex flex-wrap justify-center gap-x-5 md:gap-x-8 gap-y-9 max-w-[1500px] mx-auto">
      {GURUS.map((g, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center w-[100px] md:w-[150px]"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
        >
          {/* Circular portrait */}
          <div
            className="rounded-full overflow-hidden border border-[#c9a455]/30
                       w-[92px] h-[92px] md:w-[132px] md:h-[132px]"
            style={{ boxShadow: "0 8px 26px rgba(0,0,0,0.55)" }}
          >
            <img
              src={g.img}
              alt={g.name}
              draggable={false}
              className="w-full h-full object-cover"
              style={{ filter: "brightness(0.98)" }}
            />
          </div>

          {/* Name */}
          <p className="font-playfair italic text-[#b8966e] text-[0.68rem] md:text-[0.8rem]
                        text-center mt-4 leading-snug">
            {g.name}
          </p>
        </motion.div>
      ))}
    </div>

  </section>
);

export default Gurus;
