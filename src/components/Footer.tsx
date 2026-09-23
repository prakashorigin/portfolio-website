"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

type SocialLink = {
  name: string;
  href: string;
  icon: typeof FaGithub;
};

const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/prakashorigin",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/prakash-sharma-8ba4233a3/",
    icon: FaLinkedin,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logo & Tagline */}
          <div>
            <p className="max-w-md text-sm leading-6 text-gray-500">
              Mern Stack Developer building modern, responsive, and
              user-friendly web experiences.
            </p>
          </div>

          {/* Social Links & Scroll Top */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <motion.a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit Prakash's ${name} profile`}
                title={name}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] text-gray-500 transition-all duration-300 hover:border-purple-500/20 hover:bg-purple-500/10 hover:text-purple-400"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            ))}

            {/* Scroll To Top */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              whileHover={{
                scale: 1.1,
                y: -2,
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
              title="Back to top"
              className="ml-2 flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-purple-500/20 hover:bg-purple-500/10"
            >
              <FaArrowUp className="h-4 w-4 text-purple-400" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
