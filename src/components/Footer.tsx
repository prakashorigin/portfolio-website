"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative section-container border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & tagline */}
          <div>
            <h3 className="text-2xl font-bold gradient-text mb-2">Prakash</h3>
            <p className="text-sm text-gray-500">
              Full Stack Developer building modern web experiences.
            </p>
          </div>

          {/* Social & scroll up */}
          <div className="flex items-center justify-end gap-4">
            {[
              { icon: FaGithub, href: "https://github.com/prakashorigin" },
              {
                icon: FaLinkedin,
                href: "https://www.linkedin.com/in/prakash-sharma-8ba4233a3/",
              },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-purple-400 transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}

            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 p-2.5 glass rounded-xl hover:bg-purple-500/10 transition-colors"
              aria-label="Scroll to top"
            >
              <FaArrowUp className="w-4 h-4 text-purple-400" />
            </motion.button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center text-sm text-gray-500"></div>
      </div>
    </footer>
  );
}
