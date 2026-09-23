"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaCode, FaServer, FaPalette, FaRocket } from "react-icons/fa";

const highlights = [
  {
    icon: FaCode,
    title: "Frontend Development",
    description:
      "Building responsive and modern interfaces with React, Next.js, TypeScript, and Tailwind CSS.",
  },
  {
    icon: FaServer,
    title: "Backend Development",
    description:
      "Developing reliable REST APIs and backend services with Node.js, Express.js, and databases.",
  },
  {
    icon: FaPalette,
    title: "UI/UX Design",
    description:
      "Creating clean, intuitive, and user-friendly interfaces with modern design principles.",
  },
  {
    icon: FaRocket,
    title: "Performance",
    description:
      "Optimizing applications for speed, responsiveness, SEO, and a smooth user experience.",
  },
];

const stats = [
  {
    number: "1+",
    label: "Years Experience",
  },
  {
    number: "15+",
    label: "Projects Built",
  },
  {
    number: "10+",
    label: "Projects Delivered",
  },
];

export default function About() {
  const ref = useRef<HTMLElement | null>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-24 section-container"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2
            id="about-heading"
            className="mb-4 text-4xl font-bold md:text-5xl"
          >
            About <span className="gradient-text">Me</span>
          </h2>

          <div
            className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500"
            aria-hidden="true"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <h3 className="mb-6 text-2xl font-semibold text-gray-200">
              Passionate Developer Building the{" "}
              <span className="gradient-text">Future of Web</span>
            </h3>

            <div className="space-y-4 leading-relaxed text-gray-400">
              <p>
                Hello! I&apos;m{" "}
                <strong className="text-white">Prakash Sharma</strong>, a
                motivated MERN Stack Developer with strong knowledge of
                React.js, Node.js, Express.js, and MongoDB. I specialize in
                building responsive frontend interfaces, RESTful APIs, and
                full-stack web applications.
              </p>

              <p>
                I&apos;m passionate about writing clean, maintainable, and
                scalable code while continuously learning modern technologies
                and improving my development skills.
              </p>

              <p>
                Outside of coding, I enjoy exploring new technologies, working
                on personal projects, and expanding my knowledge of modern web
                development.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.5,
                  }}
                  className="glass rounded-xl p-4 text-center transition-all duration-300 hover:border-purple-500/30"
                >
                  <div className="gradient-text text-2xl font-bold">
                    {stat.number}
                  </div>

                  <div className="mt-1 text-xs text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  transition={{
                    delay: 0.5 + index * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="glass group rounded-2xl p-6 transition-all duration-300 hover:border-purple-500/40"
                >
                  {/* Icon */}
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600/20 to-cyan-500/20 transition-all duration-300 group-hover:from-purple-600/40 group-hover:to-cyan-500/40">
                    <Icon
                      className="h-6 w-6 text-purple-400 transition-colors duration-300 group-hover:text-purple-300"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Content */}
                  <h4 className="mb-2 font-semibold text-white">
                    {item.title}
                  </h4>

                  <p className="text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
