"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const categories = ["All", "fullstack", "frontend", "backend", "game"];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 section-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center gap-3 mb-12 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                activeCategory === cat
                  ? "keep-white bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                  : "glass text-gray-400 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="glass rounded-2xl overflow-hidden group hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Project image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900/40 to-cyan-900/40 flex items-center justify-center">
                {/* Featured badge */}
                {project.featured && (
                  <div className="keep-white absolute top-3 right-3 z-10 px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-xs font-bold text-white">
                    🌟 Featured
                  </div>
                )}

                {/* Difficulty badge */}
                {project.difficulty && (
                  <div
                    className={`keep-white absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold text-white ${
                      project.difficulty === "Beginner"
                        ? "bg-green-500/20 text-green-300 border border-green-500/50"
                        : project.difficulty === "Intermediate"
                          ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500/50"
                          : "bg-red-500/20 text-red-300 border border-red-500/50"
                    }`}
                  >
                    {project.difficulty}
                  </div>
                )}

                <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity group-hover:scale-110 duration-500">
                  {project.category === "fullstack"
                    ? "🚀"
                    : project.category === "frontend"
                      ? "🎨"
                      : project.category === "game"
                        ? "🎮"
                        : "⚡"}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

                {/* Overlay links */}
                <div className="keep-white absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/50">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/10 hover:bg-purple-500/30 transition-colors"
                  >
                    <FaGithub className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 rounded-full bg-white/10 hover:bg-cyan-500/30 transition-colors"
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Project info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors flex-1">
                    {project.title}
                  </h3>
                  {project.date && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {project.date}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
