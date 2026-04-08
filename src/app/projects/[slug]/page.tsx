import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, projectMap } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { ProjectLinkGlyph, resolveProjectLinkIcon } from "@/components/project-link-icon";
import type { Project, ProjectLink } from "@/types/project";
import styles from "./project-sheet.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectMap.get(slug);

  if (!project) {
    return { title: "Project Not Found - qiw.log" };
  }

  return {
    title: `${project.title} - qiw.log`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      siteName: siteConfig.name,
      title: `${project.title} - qiw.log`,
      description: project.summary,
    },
  };
}

function linkDisplayLabel(project: Project, link: ProjectLink) {
  if (link.label === "Live") {
    return `${project.title} Website`;
  }
  return link.label;
}

function linkRel(link: ProjectLink) {
  return link.href.startsWith("http") ? "noreferrer" : undefined;
}

function linkTarget(link: ProjectLink) {
  return link.href.startsWith("http") ? "_blank" : undefined;
}

function linkAriaLabel(link: ProjectLink, display: string) {
  if (link.href.startsWith("http")) {
    return `${display} (opens in a new tab)`;
  }
  return display;
}

function isDisabledLink(link: ProjectLink) {
  return link.href.trim() === "#";
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectMap.get(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.root}>
      <Link href="/#selected-work" className={styles.back}>
        &larr; Back
      </Link>

      <article className={styles.card}>
        <p className={styles.category}>
          <span>{project.category}</span>
          <span className={styles.categorySep} aria-hidden>
            &middot;
          </span>
          <span>{project.year}</span>
        </p>
        <h1>{project.title}</h1>
        <p className={styles.subtitle}>{project.subtitle}</p>
        <hr className={styles.divider} />

        <h2 className={styles.sectionTitle}>Overview</h2>
        <p className={styles.body}>{project.summary}</p>

        <h2 className={styles.sectionTitle}>Links</h2>
        <ul className={styles.links}>
          {project.links.map((link) => {
            const display = linkDisplayLabel(project, link);
            const external = link.href.startsWith("http");
            const disabled = isDisabledLink(link);
            return (
              <li key={link.label} className={styles.linkItem}>
                {disabled ? (
                  <span className={`${styles.linkRow} ${styles.linkRowDisabled}`} aria-disabled="true">
                    <span className={styles.linkIcon} aria-hidden>
                      <ProjectLinkGlyph kind={resolveProjectLinkIcon(link)} />
                    </span>
                    <span className={styles.linkLabel}>{display}</span>
                  </span>
                ) : (
                  <a
                    href={link.href}
                    target={linkTarget(link)}
                    rel={linkRel(link)}
                    className={styles.linkRow}
                    aria-label={external ? linkAriaLabel(link, display) : undefined}
                  >
                    <span className={styles.linkIcon} aria-hidden>
                      <ProjectLinkGlyph kind={resolveProjectLinkIcon(link)} />
                    </span>
                    <span className={styles.linkLabel}>{display}</span>
                    {external ? <span className={styles.linkArrow} aria-hidden /> : null}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </article>

      <details className={styles.details}>
        <summary>Full case study</summary>

        <div className={styles.detailBlock}>
          <h3>Problem</h3>
          <p>{project.problem}</p>
        </div>
        <div className={styles.detailBlock}>
          <h3>Solution</h3>
          <p>{project.solution}</p>
        </div>
        {project.architecture ? (
          <div className={styles.detailBlock}>
            <h3>Architecture</h3>
            <p>{project.architecture}</p>
          </div>
        ) : null}
        <div className={styles.detailBlock}>
          <h3>Tech stack</h3>
          <ul className={styles.tagList}>
            {project.techStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.detailBlock}>
          <h3>Challenges</h3>
          <ul className={styles.tagList}>
            {project.challenges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.detailBlock}>
          <h3>Result</h3>
          <p>{project.result}</p>
        </div>
      </details>
    </main>
  );
}
