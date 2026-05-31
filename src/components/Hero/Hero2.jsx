import { useMemo, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroMobile from "./HeroMobile";

// ── GOLDEN WAVE LINES ─────────────────────────────────────
const GoldenWaves = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const NUM   = 38;
    const SPEED = 0.005;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width;
      const H = canvas.height;
      const cy = H * 0.52;

      for (let i = 0; i < NUM; i++) {
        const norm   = i / (NUM - 1);
        const offset = (norm - 0.5) * 2;

        const brightness = Math.pow(1 - Math.abs(offset), 1.6);
        const alpha      = brightness * 0.22;

        ctx.strokeStyle = `rgba(201,164,85,${alpha.toFixed(3)})`;
        ctx.lineWidth   = 0.75;
        ctx.beginPath();

        for (let x = 0; x <= W; x += 2) {
          const xp    = x / W;
          const wave1 = Math.sin(xp * Math.PI * 2.2 - t + offset * 0.6) * H * 0.18;
          const wave2 = Math.sin(xp * Math.PI * 4.4 + t * 0.55 + offset * 1.2) * H * 0.055;
          const spread = offset * H * 0.13;
          const y = cy + wave1 + wave2 + spread;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      t += SPEED;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.99 }}
    />
  );
};

// ── COMPONENT ─────────────────────────────────────────────
const Hero2 = () => {
  const gifUrl = useMemo(
    () => `/assets/ezgif-3-6b6c1ea089.gif?t=${Date.now()}`,
    []
  );

  const { scrollY } = useScroll();
  const nameY = useTransform(scrollY, [0, 900], [0, 180]);
  const imgY  = useTransform(scrollY, [0, 900], [0, -120]);

  return (
    <section className="relative w-full overflow-x-hidden">

      {/* ══════════════════════════════════════════════════
          DESKTOP LAYOUT — completely unchanged
      ══════════════════════════════════════════════════ */}
      <div className="hidden md:flex flex-col items-center">

        {/* Name — z-10, behind photo, moves DOWN */}
        <motion.div
          className="relative z-10 text-center w-full pt-24 px-4"
          style={{ y: nameY }}
        >
          <motion.h1
            className="font-cinzel font-semibold text-[3.8rem] lg:text-[4.8rem] xl:text-[5.5rem] text-[#f0e6d0] tracking-[0.05em] leading-none"
            initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          >
            Debapriya{" "}
            <motion.span
              className="inline-block ml-16"
              initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0,  filter: "blur(0px)"  }}
              transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.58 }}
            >
              Adhikary
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Photo + subtext — z-20, moves UP */}
        <motion.div
          className="relative z-20 w-full flex flex-col items-center -mt-[18vw]"
          style={{ y: imgY }}
        >
          <div className="relative w-full flex justify-center">
            <GoldenWaves />
            <motion.img
              src="/assets/h5.png"
              alt="Debapriya Adhikary"
              className="relative h-[110vh] w-full object-contain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2.4, ease: [0.6, 0.05, 0.15, 1], delay: 0.3 }}
              style={{
                WebkitMaskImage: `url('${gifUrl}')`,
                WebkitMaskSize: "cover",
                WebkitMaskPosition: "center",
                maskImage: `url('${gifUrl}')`,
                maskSize: "cover",
                maskPosition: "center",
              }}
            />
          </div>

          <motion.div
            className="flex flex-col items-center gap-3 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2.5 }}
          >
            <p className="font-playfair italic text-[#c9a455] text-[24px] tracking-wide text-center">
              Singer · Composer · Mentor · Producer
            </p>
            <p className="font-jost font-light text-[#b8966e] text-[16px] tracking-[0.25em] uppercase text-center">
              A-Grade Artist · All India Radio &amp; Doordarshan
            </p>
          </motion.div>
        </motion.div>

      </div>

      {/* ── MOBILE LAYOUT — see HeroMobile.jsx ── */}
      <HeroMobile />

    </section>
  );
};

export default Hero2;
