export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  live: string;
  category: "fullstack" | "frontend" | "backend" | "game";
  featured?: boolean;
  date?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export const projects: Project[] = [
  {
    id: 1,
    title: "CrazySnake Game",
    description:
      "Advanced Snake Game featuring four difficulty levels, unlockable skins, power-ups, particle effects, responsive canvas, and mobile swipe controls.",
    image: "/projects/snake-game.svg",
    tags: ["React", "Node.js", "Express", "Canvas"],
    github: "https://github.com/prakashorigin/CrazySnake-Game",
    live: "https://crazysnake.vercel.app",
    category: "fullstack",
    featured: true,
    date: "2025-06",
    difficulty: "Advanced",
  },
  {
    id: 2,
    title: "Video Intelligence System",
    description:
      "AI-powered video analysis system for real-time object detection, multi-object tracking, and intelligent video processing.",
    image: "/projects/video-intelligence.svg",
    tags: ["Python", "OpenCV", "AI", "Machine Learning"],
    github: "https://github.com/prakashorigin/Video-Intelligence-System",
    live: "https://github.com/prakashorigin/Video-Intelligence-System#demo",
    category: "backend",
    featured: true,
    date: "2025-05",
    difficulty: "Advanced",
  },
  {
    id: 3,
    title: "Car Racing Game",
    description:
      "Fast-paced car racing game built with JavaScript and HTML5 Canvas, with smooth controls, procedural obstacles, and increasing difficulty.",
    image: "/projects/car-racing.svg",
    tags: ["JavaScript", "HTML5 Canvas", "CSS", "Game Dev"],
    github: "https://github.com/prakashorigin/Car-Racing-Game",
    live: "https://car-racing-game.vercel.app",
    category: "game",
    date: "2025-04",
    difficulty: "Intermediate",
  },
  {
    id: 4,
    title: "Tic Tac Toe",
    description:
      "Classic Tic Tac Toe game with a Python Flask backend, responsive frontend, AI opponent, win detection, and game history.",
    image: "/projects/tic-tac-toe.svg",
    tags: ["Python", "Flask", "HTML", "CSS"],
    github: "https://github.com/prakashorigin/tic-tac-toe",
    live: "https://tictactoe-prakash.vercel.app",
    category: "game",
    date: "2025-03",
    difficulty: "Beginner",
  },
  {
    id: 5,
    title: "Rock Paper Scissor",
    description:
      "Interactive Python game with an AI opponent, real-time score tracking, game statistics, and clean session history.",
    image: "/projects/rock-paper-scissor.svg",
    tags: ["Python", "Game Logic", "CLI"],
    github: "https://github.com/prakashorigin/rock-paper-scissor",
    live: "https://github.com/prakashorigin/rock-paper-scissor",
    category: "game",
    date: "2025-02",
    difficulty: "Beginner",
  },
];
export const skills = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "HTML/CSS", category: "Frontend" },
  { name: "JavaScript", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "MongoDB", category: "Backend" },
  { name: "GitHub", category: "Tools" },
  { name: "Render", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Vercel", category: "Tools" },
];
