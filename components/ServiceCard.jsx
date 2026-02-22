import Link from "next/link";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ service, index = 0 }) {
    return (
        <div
            className={`card ${styles.serviceCard} animate-fade-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
            id={service.id}
        >
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{service.icon}</span>
            </div>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.description}>
                {service.shortDescription || service.description}
            </p>
            <div className={styles.technologies}>
                {service.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className={styles.techTag}>
                        {tech}
                    </span>
                ))}
            </div>
            {service.features && (
                <ul className={styles.features}>
                    {service.features.slice(0, 3).map((feature) => (
                        <li key={feature}>
                            <span className={styles.checkmark}>↗</span>
                            {feature}
                        </li>
                    ))}
                </ul>
            )}
            <Link href={`/services#${service.id}`} className={styles.learnMore}>
                Learn More
                <span className={styles.arrow}>→</span>
            </Link>
        </div>
    );
}
