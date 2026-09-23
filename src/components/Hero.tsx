"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiArrowDown } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Next.js Developer",
  "UI/UX Designer",
  "Web Developer",
];

type SocialLink = {
  icon: typeof FaGithub;
  href: string;
  label: string;
};

const socialLinks: SocialLink[] = [
  {
    icon: FaGithub,
    href: "https://github.com/prakashorigin",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/prakash-sharma-8ba4233a3/",
    label: "LinkedIn",
  },
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRoleText = roles[currentRole];

    const typingSpeed = isDeleting ? 45 : 90;

    const timer = window.setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentRoleText.slice(0, displayText.length + 1);

        setDisplayText(nextText);

        if (nextText === currentRoleText) {
          window.setTimeout(() => {
            setIsDeleting(true);
          }, 1800);
        }
      } else {
        const nextText = currentRoleText.slice(0, displayText.length - 1);

        setDisplayText(nextText);

        if (nextText === "") {
          setIsDeleting(false);
          setCurrentRole((previousRole) => (previousRole + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => window.clearTimeout(timer);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8"
    >
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-12rem] top-1/4 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl animate-float"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-1/4 right-[-12rem] h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-14 lg:flex-row lg:gap-20">
          {/* ==================== LEFT CONTENT ==================== */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.5,
              }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-400/10 bg-green-400/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)] animate-pulse"
              />

              <span>Available for work</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="mb-6 text-5xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-5xl lg:text-5xl"
            >
              Hi, I&apos;m <span className="gradient-text">Prakash</span>
              <br />
              <span className="text-1xl text-white sm:text-4xl md:text-4xl lg:text-4xl">
                Sharma
              </span>
            </motion.h1>

            {/* Typing Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.5,
              }}
              className="mb-7 min-h-9 text-xl font-medium text-gray-400 sm:text-2xl"
              aria-live="polite"
            >
              <span>{displayText}</span>

              <span
                aria-hidden="true"
                className="ml-1 text-purple-400 cursor-blink"
              >
                |
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
              }}
              className="mx-auto mb-10 max-w-2xl text-base leading-7 text-gray-500 sm:text-lg lg:mx-0"
            >
              I build modern, responsive, and performant web applications using
              React, Next.js, TypeScript, Node.js, and modern web technologies —
              with a focus on clean code and great user experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 1,
                duration: 0.8,
              }}
              className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
            >
              <a
                href="#projects"
                className="keep-white inline-flex min-w-40 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 px-7 py-3.5 font-medium text-white shadow-lg shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                View My Work
              </a>

              <a
                href="#contact"
                className="inline-flex min-w-40 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3.5 font-medium text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-black"
              >
                Get in Touch
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.8,
              }}
              className="flex items-center justify-center gap-4 lg:justify-start"
            >
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Prakash Sharma's ${label} profile`}
                  title={label}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 backdrop-blur-md transition-all duration-300 hover:border-purple-500/30 hover:bg-purple-500/10 hover:text-purple-400"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ==================== PROFILE IMAGE ==================== */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              x: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.8,
            }}
            className="flex-shrink-0"
          >
            <div className="relative h-64 w-64 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96">
              {/* Outer Glow */}
              <div
                aria-hidden="true"
                className="absolute inset-[-20px] rounded-full bg-gradient-to-br from-purple-600/30 via-transparent to-cyan-500/30 blur-2xl"
              />

              {/* Rotating Border */}
              <motion.div
                aria-hidden="true"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-[-5px] rounded-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 opacity-60"
              />

              {/* Image Container */}
              <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-black/60 bg-black shadow-2xl shadow-purple-500/20">
                <Image
                  src="/images/prakash.jpeg"
                  alt="Portrait of Prakash Sharma"
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />

                {/* Image Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-purple-500/5"
                />
              </div>

              {/* Decorative Ring */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 rounded-full border border-purple-500/10"
              />
            </div>
          </motion.div>
        </div>

        {/* ==================== SCROLL INDICATOR ==================== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.5,
            duration: 0.8,
          }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2"
        >
          <motion.a
            href="#about"
            aria-label="Scroll to About section"
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
            }}
            className="flex flex-col items-center gap-2 text-gray-500 transition-colors duration-300 hover:text-purple-400"
          >
            <span className="text-xs tracking-wider">Scroll Down</span>

            <HiArrowDown aria-hidden="true" className="h-4 w-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
