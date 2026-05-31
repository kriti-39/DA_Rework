import { motion } from "framer-motion";

const videos = [
  {
    img:   "/assets/T1.jpg",
    url:   "https://youtu.be/8CQZlAVIf10?si=fBEe2krXeXht7zh7",
    title: "Raga Durga - Live Performance",
  },
  {
    img:   "/assets/T2.jpg",
    url:   "https://youtu.be/ZVAUejtnaQY?si=p1hlpcQvurIKSmJg",
    title: "Raushan Raushan",
  },
  {
    img:   "/assets/T3.jpg",
    url:   "https://youtu.be/Wsw3jzqXsag?si=TMWyR1esRuIhFfZb",
    title: "Miyan Malhar - A Monsoon Treat",
  },
  {
    img:   "/assets/T4.jpg",
    url:   "https://youtu.be/xUUH27-Nmek?si=ywpsINVj5wE2pZ8E",
    title: "Raga Marwa - An Evening Charm",
  },
];

const PlayIcon = () => (
  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
    <polygon points="5,3 18,10 5,17" fill="#c9a455" />
  </svg>
);

const WatchSectionMobile = () => {
  return (
    <section className="md:hidden px-6 py-14">

      {/* Heading */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-[1px] w-8 bg-[#c9a455]/60" />
          <span className="font-jost text-[9px] tracking-[0.5em] uppercase text-[#c9a455]">
            Watch
          </span>
          <div className="h-[1px] w-8 bg-[#c9a455]/60" />
        </div>
        <h2 className="font-cinzel text-[1.5rem] text-[#f0e6d0] tracking-[0.08em] leading-tight mb-3">
          30+ Years On Screen &amp; Stage
        </h2>
        <p className="font-playfair italic text-[#b8966e] text-[15px]">
          Performances · Recordings
        </p>
      </div>

      {/* Video cards — vertical stack */}
      <div className="flex flex-col gap-5">
        {videos.map((video, i) => (
          <motion.div
            key={i}
            className="relative w-full overflow-hidden rounded-xl cursor-pointer group"
            style={{ aspectRatio: "16 / 9" }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
            onClick={() => window.open(video.url, "_blank", "noopener")}
          >
            {/* Thumbnail */}
            <img
              src={video.img}
              alt={video.title}
              className="w-full h-full object-cover"
            />

            {/* Bottom gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0702]/90 via-[#0c0702]/20 to-transparent pointer-events-none" />

            {/* Title */}
            <div className="absolute bottom-3 left-4 right-12 flex items-center gap-2">
              <div className="w-[3px] h-[3px] rounded-full bg-[#c9a455]/70 shrink-0" />
              <p className="font-jost text-[10px] tracking-[0.2em] uppercase text-[#c9a455]/80 truncate">
                {video.title}
              </p>
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border border-[#c9a455] flex items-center justify-center bg-[#0c0702]/50 backdrop-blur-sm">
                <PlayIcon />
              </div>
            </div>

            {/* Gold border */}
            <div className="absolute inset-0 border border-[#c9a455]/20 rounded-xl pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <a
          href="/performances"
          className="inline-flex items-center gap-3 font-jost text-[10px] tracking-[0.28em] uppercase text-[#c9a455] border border-[#c9a455]/40 px-6 py-3 hover:border-[#c9a455] transition-all duration-300"
        >
          View All Performances
          <span>→</span>
        </a>
      </div>

    </section>
  );
};

export default WatchSectionMobile;
