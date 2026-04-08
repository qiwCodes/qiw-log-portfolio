import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "aether-one",
    title: "Aether One",
    subtitle: "Immersive premium headphone concept landing page",
    year: "2026",
    category: "Product Landing Page",
    summary:
      "Aether One is an immersive product landing page for a premium wireless headphone concept, built to showcase high-end motion design, responsive layout work, and a scroll-linked 3D product experience.",
    problem:
      "Most headphone concept pages feel static and fail to communicate premium product quality, interaction depth, and technical polish.",
    solution:
      "Aether One combines cinematic motion, responsive storytelling sections, and a scroll-reactive 3D model sequence to deliver a high-end product narrative.",
    architecture:
      "Built with a React-based frontend, performance-conscious animation orchestration, and 3D scene integration tuned for smooth behavior across screen sizes.",
    challenges: [
      "Balancing cinematic motion with performance and accessibility.",
      "Keeping scroll-linked 3D interactions smooth on lower-powered devices.",
      "Maintaining premium visual fidelity across responsive breakpoints.",
    ],
    result:
      "Delivered a polished showcase experience that highlights interaction quality, responsive craft, and advanced front-end execution.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "Tailwind CSS",
    ],
    links: [
      { label: "Live", href: "https://aether-one-two.vercel.app/" },
      { label: "GitHub", href: "https://github.com/qiwCodes/aether-one" },
    ],
  },
  {
    slug: "documind-ai",
    title: "DocuMind AI",
    subtitle: "TypeScript monorepo for citation-aware RAG document workspace (In Development)",
    year: "2026",
    category: "AI Application / In Development",
    summary:
      "DocuMind AI is being rebuilt as a production-oriented TypeScript monorepo with a Next.js 16 web app, authentication, document ingestion, hybrid retrieval, and citation-aware RAG chat.",
    problem:
      "Teams need reliable document Q&A with traceable citations, better follow-up understanding, and a more production-ready architecture than a prototype app.",
    solution:
      "The project now focuses on a full-stack workspace: authenticated document management, parsing and chunking, hybrid lexical + vector retrieval, and response formatting optimized for lists, comparisons, and Markdown tables.",
    challenges: [
      "Migrating from the previous Python/Streamlit implementation to a scalable monorepo architecture.",
      "Keeping retrieval quality high while combining lexical and vector search across varied documents.",
      "Balancing citation quality, response formatting, and follow-up question handling.",
    ],
    result:
      "Currently in active development, with core ingestion, retrieval, and citation-aware chat flows implemented while product polish and deployment hardening continue.",
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Clerk",
      "PostgreSQL + Prisma",
      "Groq",
      "OpenAI Embeddings",
    ],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/qiwCodes/documind-ai" },
    ],
  },
  {
    slug: "green-leaf-detect",
    title: "green-leaf-detect",
    subtitle: "Plant disease detection with deep learning",
    year: "2024",
    category: "ML & Deep Learning",
    summary:
      "AI app that analyzes plant leaf photos to identify diseases and provide practical first-step care recommendations.",
    problem:
      "Farmers and hobby growers often struggle to identify leaf diseases early without expert support, leading to delayed treatment.",
    solution:
      "The project uses a fine-tuned MobileNetV2 model with an easy upload flow to classify plant diseases and surface actionable guidance.",
    challenges: [
      "Improving classification confidence across varied lighting and image quality.",
      "Keeping model inference fast enough for a smooth app experience.",
      "Mapping model outputs to clear and practical care recommendations.",
    ],
    result:
      "Provides quick, beginner-friendly plant disease checks and helps users act faster with AI-assisted suggestions.",
    techStack: [
      "Python",
      "Streamlit",
      "TensorFlow / Keras",
      "MobileNetV2",
      "Grad-CAM",
    ],
    links: [
      { label: "Live", href: "#" },
      { label: "GitHub", href: "https://github.com/qiwCodes/green-leaf-detect" },
    ],
  },
];

export const projectMap = new Map(projects.map((project) => [project.slug, project]));
