/** Shown inside the circular badge; defaults from link label when omitted. */
export type ProjectLinkIcon = "website" | "github" | "link";

export type ProjectLink = {
  label: string;
  href: string;
  icon?: ProjectLinkIcon;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  challenges: string[];
  result: string;
  architecture?: string;
  techStack: string[];
  links: ProjectLink[];
};
