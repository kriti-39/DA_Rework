import { useMemo } from "react";
import { motion } from "framer-motion";

const HeroMobile = () => {
  const gifUrl = useMemo(
    () => `/assets/ezgif-3-6b6c1ea089.gif?t=${Date.now()}`,
    []
  );

  return (
    <div className="md:hidden flex flex-col items-center">

      {/* Navbar clearance */}
      <div className="h-16 w-full" />

      {/* Image with GIF mask */}
      <motion.img
        src="/assets/heroImgMob.png"
        alt="Debapriya Adhikary"
        className="w-full object-contain object-top"
        style={{
          height: "130vw",
          WebkitMaskImage: `url('${gifUrl}')`,
          WebkitMaskSize: "cover",
          WebkitMaskPosition: "center",
          maskImage: `url('${gifUrl}')`,
          maskSize: "cover",
          maskPosition: "center",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.4, ease: [0.6, 0.05, 0.15, 1], delay: 0.3 }}
      />

      {/* Name */}
      <motion.h1
        className="font-cinzel font-semibold text-[2.5rem]  text-[#f0e6d0] tracking-[0.06em] leading-none text-center px-2 pb-3 mt-2"
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        Debapriya Adhikary
      </motion.h1>

      {/* Subtext */}
      <motion.div
        className="flex flex-col items-center gap-2 pt-0 pb-8 px-4"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 1.2 }}
      >
        <p className="font-playfair italic text-[#c9a455] text-[1rem] tracking-wide text-center">
          Singer · Composer · Mentor · Producer
        </p>
        <p className="font-jost font-light text-[#b8966e] text-[10px] tracking-[0.18em] uppercase text-center">
          A-Grade Artist · All India Radio &amp; Doordarshan
        </p>
      </motion.div>

    </div>
  );
};

export default HeroMobile;
