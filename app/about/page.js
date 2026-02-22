import Link from "next/link";
import { company, experience, techStack } from "@/data/company";
import styles from "./page.module.css";

export const metadata = {
    title: "About — Pundir Tech",
    description:
        "Learn about Pundir Tech, our mission, experience, and the technology stack we use to build scalable digital solutions.",
};

export default function AboutPage() {
    const categories = [...new Set(techStack.map((t) => t.category))];

    return (
        <>
            {/* ========== PAGE HEADER ========== */}
            <section className={styles.pageHeader}>
                <div className="grid-bg"></div>
                <div className={`container ${styles.headerContent}`}>
                    <span className="section-label">About Us</span>
                    <h1 className="animate-fade-up">
                        The Team Behind
                        <br />
                        <span className="gradient-text">Pundir Tech</span>
                    </h1>
                    <p className={`${styles.headerSub} animate-fade-up delay-2`}>
                        {company.longDescription}
                    </p>
                </div>
            </section>

            {/* ========== FOUNDER ========== */}
            <section className={`section ${styles.founderSection}`}>
                <div className={`container ${styles.founderGrid}`}>
                    <div className={styles.founderVisual}>
                        <div className={styles.founderAvatar}>
                            <span>AP</span>
                        </div>
                        <div className={styles.founderGlow}></div>
                    </div>
                    <div className={styles.founderContent}>
                        <span className="section-label">Founder</span>
                        <h2>{company.founder.name}</h2>
                        <p className={styles.founderTitle}>{company.founder.title}</p>
                        <p className={styles.founderBio}>{company.founder.bio}</p>
                        <p className={styles.founderEdu}>🎓 {company.founder.education}</p>
                        <div className={styles.founderSocials}>
                            <a
                                href={company.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                            >
                                GitHub ↗
                            </a>
                            <a
                                href={company.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline"
                            >
                                LinkedIn ↗
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========== EXPERIENCE ========== */}
            <section className={`section ${styles.experienceSection}`}>
                <div className="container">
                    <span className="section-label">Journey</span>
                    <h2 className="section-title">
                        Work <span className="gradient-text">Experience</span>
                    </h2>
                    <div className={styles.timeline}>
                        {experience.map((exp, i) => (
                            <div
                                key={i}
                                className={`${styles.timelineItem} animate-fade-up`}
                                style={{ animationDelay: `${i * 0.15}s` }}
                            >
                                <div className={styles.timelineDot}></div>
                                <div className={styles.timelineCard}>
                                    <div className={styles.timelineMeta}>
                                        <span className={styles.timelinePeriod}>{exp.period}</span>
                                        <span className={styles.timelineLocation}>{exp.location}</span>
                                    </div>
                                    <h3 className={styles.timelineRole}>{exp.role}</h3>
                                    <p className={styles.timelineCompany}>{exp.company}</p>
                                    <ul className={styles.timelineHighlights}>
                                        {exp.highlights.map((h, j) => (
                                            <li key={j}>{h}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== TECH STACK ========== */}
            <section className={`section ${styles.techSection}`}>
                <div className="container">
                    <span className="section-label">Technology</span>
                    <h2 className="section-title">
                        Our <span className="gradient-text">Tech Stack</span>
                    </h2>
                    <p className="section-subtitle">
                        We work with modern, battle-tested technologies.
                    </p>
                    <div className={styles.techCategories}>
                        {categories.map((cat) => (
                            <div key={cat} className={styles.techCategory}>
                                <h4 className={styles.techCatTitle}>{cat}</h4>
                                <div className={styles.techTags}>
                                    {techStack
                                        .filter((t) => t.category === cat)
                                        .map((t) => (
                                            <span key={t.name} className={styles.techBadge}>
                                                {t.name}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== VALUES ========== */}
            <section className={`section ${styles.valuesSection}`}>
                <div className="container">
                    <span className="section-label">Our Principles</span>
                    <h2 className="section-title">
                        What Drives <span className="gradient-text">Us</span>
                    </h2>
                    <div className={styles.valuesGrid}>
                        {company.values.map((val, i) => (
                            <div
                                key={val.title}
                                className={`card ${styles.valueCard} animate-fade-up`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <span className={styles.valueIcon}>{val.icon}</span>
                                <h3>{val.title}</h3>
                                <p>{val.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ========== CTA ========== */}
            <section className={`section ${styles.ctaSection}`}>
                <div className={`container ${styles.ctaContent}`}>
                    <h2>
                        Want to work <span className="gradient-text">with us</span>?
                    </h2>
                    <p>Let&apos;s discuss your next project.</p>
                    <Link href="/contact" className="btn btn-primary">
                        Get In Touch →
                    </Link>
                </div>
            </section>
        </>
    );
}
