import { Link } from "react-router-dom";
import { FaSpotify, FaWhatsapp } from "react-icons/fa";
import { SiLinktree } from "react-icons/si";

const NAV = [
  { label: "Home",    to: "/"              },
  { label: "About",   to: "/about"         },
  { label: "Learn",   to: "/learn"         },
  { label: "Gallery", to: "/gallery"       },
  { label: "Contact", to: "/learn#contact" },
];

const SOCIALS = [
  { label: "YouTube",   href: "https://www.youtube.com/@musingswithdeva",
    Icon: () => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    ),
  },
  { label: "Instagram", href: "https://www.instagram.com/musingswithdeva",
    Icon: () => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2.1 15.6 2 15.3 2 12s0-3.6.1-4.8c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
      </svg>
    ),
  },
  { label: "Spotify",  href: "https://open.spotify.com/artist/46ClZdZ6yv7I0rJVfUONEC?si=WO3ls2_2Sv2GXT1suYY0jw",
    Icon: () => <FaSpotify size={18} />,
  },
  { label: "Facebook", href: "https://www.facebook.com/Debapriyaadhikarysings",
    Icon: () => (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23 10.1 24v-8.4H7.1v-3.5h3V9.6c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.2h3.3l-.5 3.5h-2.8V24C19.6 23 24 18.1 24 12.1z"/>
      </svg>
    ),
  },
  { label: "Linktree", href: "https://linktr.ee/musingswithdeva",
    Icon: () => <SiLinktree size={17} />,
  },
];

const FooterMobile = () => (
  <footer className="md:hidden relative" style={{ backgroundColor: "#110903c9" }}>

    {/* Fade into footer */}
    <div
      className="absolute -top-16 left-0 right-0 h-16 pointer-events-none"
      style={{ background: "linear-gradient(to bottom, transparent, #110903c9)" }}
    />

    {/* Ornamental divider */}
    <div className="flex items-center justify-center gap-3 pt-3">
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#c9a455]/35" />
      <span className="text-[#c9a455]/45 text-[8px]">◆</span>
      <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#c9a455]/35" />
    </div>

    <div className="px-6 pt-10 pb-6 flex flex-col items-center gap-8 text-center">

      {/* Brand */}
      <div>
        <h3 className="font-cinzel text-[1.2rem] text-[#f0e6d0] tracking-wider">
          Debapriya Adhikary
        </h3>
        <p className="font-jost text-[8px] tracking-[0.45em] uppercase text-[#c9a455] mt-1">
          Artist
        </p>
        <p className="font-playfair italic text-[#b8966e]/80 text-[0.8rem] leading-relaxed mt-3">
          Carrying forward the legacy of the Senia - Banaras Gharana through
          performance, teaching, &amp; devotion to the music.
        </p>
      </div>

      {/* Socials */}
      <div className="flex items-center justify-center gap-6">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-[#b8966e]/45 hover:text-[#c9a455] transition-colors duration-300"
          >
            <Icon />
          </a>
        ))}
      </div>

      {/* Email */}
      <a
        href="mailto:musingswithdeva@gmail.com"
        className="font-jost text-[0.9rem] text-[#b8966e]/65 hover:text-[#f0e6d0] transition-colors duration-300"
      >
        musingswithdeva@gmail.com
      </a>

      {/* Nav links */}
      <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {NAV.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            className="font-jost text-[0.75rem] tracking-[0.08em] text-[#b8966e]/55 hover:text-[#f0e6d0] transition-colors duration-300"
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* WhatsApp CTA */}
      <a
        href="https://wa.me/+919038674555?text=Hi%2C"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 font-jost text-[9px] tracking-[0.28em] uppercase
                   text-[#c9a455] border border-[#c9a455]/35 px-5 py-2.5
                   hover:border-[#c9a455] transition-all duration-300"
      >
        <FaWhatsapp className="text-[#25D366]" />
        Connect on WhatsApp
      </a>

    </div>

    {/* Bottom bar */}
    <div className="border-t border-[#c9a455]/10 px-6 py-4 text-center">
      <p className="font-jost text-[8px] tracking-[0.25em] uppercase text-[#b8966e]/30">
        © 2025 Debapriya Adhikary. All Rights Reserved.
      </p>
    </div>

  </footer>
);

export default FooterMobile;
