import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Tablet-only rendering of the Home "Watch" section (md–lg, ~768–1023px).
// Desktop uses a 700vh scroll-pinned conveyor belt with floating city
// labels — too tall/cluttered for a tablet viewport. Replaced with a
// straightforward horizontal carousel of the same videos.

const videos = [
  { img: "/assets/T1.jpg", url: "https://youtu.be/8CQZlAVIf10?si=fBEe2krXeXht7zh7",  title: "Raga Durga - Live Performance" },
  { img: "/assets/T2.jpg", url: "https://youtu.be/ZVAUejtnaQY?si=p1hlpcQvurIKSmJg",  title: "Raushan Raushan" },
  { img: "/assets/T3.jpg", url: "https://youtu.be/Wsw3jzqXsag?si=TMWyR1esRuIhFfZb",  title: "Miyan Malhar - A Monsoon Treat" },
  { img: "/assets/T4.jpg", url: "https://youtu.be/xUUH27-Nmek?si=ywpsINVj5wE2pZ8E",  title: "Raga Marwa - An Evening Charm" },
];

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
    <polygon points="5,3 18,10 5,17" fill="#c9a455" />
  </svg>
);

const WatchSectionTablet = () => {
  return (
    <section className="px-10 py-16">

      {/* Heading */}
      <div className="text-center mb-9">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#c9a455]/60" />
          <span className="font-jost text-[10px] tracking-[0.5em] uppercase text-[#c9a455]">
            Watch
          </span>
          <div className="h-[1px] w-8 bg-[#c9a455]/60" />
        </div>
        <h2 className="font-cinzel text-[1.9rem] text-[#f0e6d0] tracking-[0.08em] leading-tight mb-3">
          30+ Years On Screen &amp; Stage
        </h2>
        <p className="font-playfair italic text-[#b8966e] text-[1.05rem]">
          Performances · Recordings
        </p>
      </div>

      {/* Horizontal auto-scrolling carousel — same speed as every other carousel site-wide */}
      <div
        className="overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          maskImage:       "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
        }}
      >
        <motion.div
          className="flex gap-5"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 91, repeat: Infinity, ease: "linear" }}
        >
          {[...videos, ...videos].map((video, i) => (
            <motion.div
              key={i}
              className="relative flex-none overflow-hidden rounded-xl cursor-pointer group"
              style={{ width: "62vw", aspectRatio: "16 / 9" }}
              onClick={() => window.open(video.url, "_blank", "noopener")}
            >
              <img src={video.img} alt={video.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0702]/90 via-[#0c0702]/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-5 right-14 flex items-center gap-2 pointer-events-none">
                <div className="w-[3px] h-[3px] rounded-full bg-[#c9a455]/70 shrink-0" />
                <p className="font-jost text-[11px] tracking-[0.2em] uppercase text-[#c9a455]/80 truncate">
                  {video.title}
                </p>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 w-14 h-14 rounded-full border border-[#c9a455] flex items-center justify-center bg-[#0c0702]/50 backdrop-blur-sm">
                  <PlayIcon />
                </div>
              </div>

              <div className="absolute inset-0 border border-[#c9a455]/20 group-hover:border-[#c9a455]/45 transition-colors duration-300 rounded-xl pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <Link
          to="/gallery"
          className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.28em] uppercase
                     text-[#c9a455] border border-[#c9a455]/40 px-6 py-3
                     hover:border-[#c9a455] hover:bg-[#c9a455]/5 transition-all duration-300 group"
        >
          View All Performances
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

    </section>
  );
};

export default WatchSectionTablet;
