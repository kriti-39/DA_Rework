import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ── NAV LINKS ─────────────────────────────────────────────
const NAV = [
  { label: "Home",    to: "/"              },
  { label: "About",   to: "/about"         },
  { label: "Learn",   to: "/learn"         },
  { label: "Gallery", to: "/gallery"       },
  { label: "Contact", to: "/learn#contact" },
];

// ── ICONS ─────────────────────────────────────────────────
const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.47 14.38c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.88 1.08-.16.19-.33.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.17.19-.28.28-.47.1-.19.05-.35-.02-.49-.07-.14-.63-1.51-.86-2.07-.23-.54-.46-.47-.63-.47-.16 0-.35-.02-.54-.02s-.49.07-.74.35c-.26.28-1 .98-1 2.4 0 1.41 1.02 2.78 1.17 2.97.14.19 2.02 3.08 4.89 4.32.68.3 1.22.47 1.63.6.69.22 1.31.19 1.8.12.55-.08 1.69-.69 1.93-1.36.23-.67.23-1.24.16-1.36-.07-.12-.26-.19-.54-.33zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.24-.37A9.86 9.86 0 0 1 2.2 12C2.2 6.58 6.62 2.2 12.05 2.2A9.78 9.78 0 0 1 19 5.07a9.73 9.73 0 0 1 2.86 6.93c0 5.43-4.42 9.8-9.81 9.8zM12.05 0C5.4 0 0 5.37 0 12c0 2.12.56 4.1 1.52 5.82L0 24l6.35-1.66A12.04 12.04 0 0 0 12.05 24C18.7 24 24 18.63 24 12S18.7 0 12.05 0z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2.1 15.6 2 15.3 2 12s0-3.6.1-4.8c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23 10.1 24v-8.4H7.1v-3.5h3V9.6c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.2h3.3l-.5 3.5h-2.8V24C19.6 23 24 18.1 24 12.1z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SOCIALS = [
  { label: "YouTube",   href: "https://www.youtube.com/@DebapriyaAdhikary", Icon: YouTubeIcon   },
  { label: "Instagram", href: "#",                                           Icon: InstagramIcon },
  { label: "Twitter",   href: "#",                                           Icon: TwitterIcon   },
  { label: "Facebook",  href: "#",                                           Icon: FacebookIcon  },
];

// ── FOOTER ────────────────────────────────────────────────
const Footer = () => {
  return (
    <footer className="relative" style={{ backgroundColor: "#110903c9" }}>

      {/* ── Gradient overlay — fades site content into footer ── */}
      <div
        className="absolute -top-28 left-0 right-0 h-28 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #110903c9)" }}
      />

      {/* Ornamental divider */}
      <div className="flex items-center justify-center gap-4 pt-3">
        <div className="h-[1px] w-80 bg-gradient-to-r from-transparent to-[#c9a455]/35" />
        <span className="text-[#c9a455]/45 text-[9px]">◆</span>
        <div className="h-[1px] w-80 bg-gradient-to-l from-transparent to-[#c9a455]/35" />
      </div>

      {/* ── Main 3-col grid ── */}
      <motion.div
        className="max-w-[1400px] mx-auto px-8 md:px-16 pt-14 pb-10
                   grid grid-cols-3 gap-16 items-start"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* ── LEFT — Brand ── */}
        <div className="space-y-4">
          <div>
            <h3 className="font-cinzel text-[1.4rem] text-[#f0e6d0] tracking-wider leading-tight">
              Debapriya Adhikary
            </h3>
            <p className="font-jost text-[9px] tracking-[0.45em] uppercase text-[#c9a455] mt-1.5">
              Hindustani Classical Vocalist
            </p>
          </div>
          <p className="font-playfair italic text-[#a08060]/80 text-[0.875rem] leading-relaxed">
            Carrying forward the legacy of the<br />
            Patiala-Kasur gharana through<br />
            performance, teaching, &
            devotion to the raga.
          </p>
        </div>

        {/* ── CENTER — Navigate ── */}
        <div className="flex flex-col items-center space-y-5">
          <p className="font-jost text-[9px] tracking-[0.5em] uppercase text-[#c9a455]">
            Navigate
          </p>
          <nav className="flex flex-col items-center gap-2">
            {NAV.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="font-jost text-[0.8rem] tracking-[0.08em]
                           text-[#a08060]/65 hover:text-[#f0e6d0]
                           transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── RIGHT — Get in Touch ── */}
        <div className="space-y-5">
          <p className="font-jost text-[9px] tracking-[0.5em] uppercase text-[#c9a455]">
            Get in Touch
          </p>

          {/* Email — click opens mail client */}
          <a
            href="mailto:contact@debapriyaadhikary.com"
            className="flex items-center gap-3 group w-fit"
          >
            <span className="text-[#c9a455]/60 group-hover:text-[#c9a455] transition-colors duration-300 flex-none">
              <EmailIcon />
            </span>
            <span className="font-jost text-[0.88rem] text-[#a08060]/65
                             group-hover:text-[#f0e6d0] transition-colors duration-300">
              contact@debapriyaadhikary.com
            </span>
          </a>

          {/* Social icons — above the button */}
          <div className="flex items-center gap-5 pt-1">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[#a08060]/45 hover:text-[#c9a455] transition-colors duration-300
                           [&>svg]:w-[19px] [&>svg]:h-[19px]"
              >
                <Icon />
              </a>
            ))}
          </div>

          {/* WhatsApp CTA — replace number below */}
          <a
            href="https://wa.me/919999999999?text=Hi%2C+I+would+like+to+enquire+about+classes+and+workshops."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-jost text-[9.5px]
                       tracking-[0.28em] uppercase text-[#c9a455]
                       border border-[#c9a455]/35 px-4 py-2.5
                       hover:border-[#c9a455] hover:bg-[#c9a455]/5
                       transition-all duration-300 group"
          >
            <span className="opacity-80"><WhatsAppIcon /></span>
            Classes &amp; Workshops
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

      </motion.div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#c9a455]/10">
        <div className="max-w-[1100px] mx-auto px-8 md:px-16 py-5
                        flex items-center justify-between">
          <p className="font-jost text-[8px] tracking-[0.3em] uppercase text-[#a08060]/30">
            © 2025 Debapriya Adhikary. All Rights Reserved.
          </p>
          <p className="font-jost text-[8px] tracking-[0.25em] uppercase text-[#a08060]/20">
            Hindustani Classical Music
          </p>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
