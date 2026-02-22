import styles from "./ProjectCard.module.css";

export default function ProjectCard({ project, index = 0 }) {
    return (
        <div
            className={`card ${styles.projectCard} animate-fade-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className={styles.imageWrapper}>
                {project.image ? (
                    <img src={project.image} alt={project.title} className={styles.image} />
                ) : (
                    <div className={styles.placeholder}>
                        <span>⟐</span>
                    </div>
                )}
                {project.category && (
                    <span className={styles.category}>{project.category}</span>
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.description}>{project.description}</p>
                <div className={styles.technologies}>
                    {project.technologies.map((tech) => (
                        <span key={tech} className={styles.techTag}>
                            {tech}
                        </span>
                    ))}
                </div>
                <div className={styles.links}>
                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            <span>Live Demo</span>
                            <span>↗</span>
                        </a>
                    )}
                    {project.githubUrl && (
                        <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.link}
                        >
                            <span>GitHub</span>
                            <span>↗</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
