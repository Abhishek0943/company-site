import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import styles from "./page.module.css";

export const metadata = {
    title: "Projects — VexioApp",
    description:
        "Explore our portfolio of web and mobile applications built with modern technologies.",
    openGraph: {
        title: "Projects — VexioApp",
        description: "Explore our portfolio of web and mobile applications built with modern technologies.",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
};

export default function ProjectsPage() {
    return (
        <>
            {/* ========== PAGE HEADER ========== */}
            <section className={styles.pageHeader}>
                <div className="grid-bg"></div>
                <div className={`container ${styles.headerContent}`}>
                    <span className="section-label">Portfolio</span>
                    <h1 className="animate-fade-up">
                        Our <span className="gradient-text">Projects</span>
                    </h1>
                    <p className={`${styles.headerSub} animate-fade-up delay-2`}>
                        Real-world solutions we&apos;ve built for businesses across different industries.
                    </p>
                </div>
            </section>

            {/* ========== PROJECTS ========== */}
            <section className={`section ${styles.projectsSection}`}>
                <div className="container">
                    {projects.length > 0 ? (
                        <>
                            <div className={styles.projectsGrid}>
                                {projects.map((project, i) => (
                                    <ProjectCard key={project.id} project={project} index={i} />
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyVisual}>
                                <div className={styles.emptyOrb}></div>
                                <div className={styles.emptyIcon}>⟐</div>
                            </div>
                            <h2>Portfolio Coming Soon</h2>
                            <p>
                                We&apos;re curating our best work to showcase here. In the meantime,
                                let&apos;s discuss how we can build something amazing for you.
                            </p>
                            <div className={styles.emptyActions}>
                                <Link href="/contact" className="btn btn-primary">
                                    Start a Project →
                                </Link>
                                <Link href="/services" className="btn btn-outline">
                                    View Our Services
                                </Link>
                            </div>

                            {/* Showcase capabilities */}
                            <div className={styles.capabilities}>
                                <h3>What We&apos;ve Built</h3>
                                <div className={styles.capGrid}>
                                    {[
                                        {
                                            icon: "💰",
                                            title: "Cashback Platform",
                                            desc: "Multi-vendor discount aggregator with mobile apps and admin panel",
                                            tech: "MERN + React Native",
                                        },
                                        {
                                            icon: "🔮",
                                            title: "Astrology App",
                                            desc: "Real-time consultation platform with chat and payments",
                                            tech: "Socket.IO + Redis",
                                        },
                                        {
                                            icon: "🎓",
                                            title: "College Management",
                                            desc: "Listing and comparison platform for students",
                                            tech: "MERN Stack",
                                        },
                                        {
                                            icon: "🍔",
                                            title: "Food Delivery",
                                            desc: "Three interconnected apps for users, vendors, and delivery",
                                            tech: "React Native",
                                        },
                                        {
                                            icon: "💬",
                                            title: "Social Media App",
                                            desc: "Full social platform with real-time chat and notifications",
                                            tech: "React Native",
                                        },
                                        {
                                            icon: "🏢",
                                            title: "ERP System",
                                            desc: "Enterprise management with offline support and sync",
                                            tech: "React Native + SQLite",
                                        },
                                    ].map((cap, i) => (
                                        <div
                                            key={cap.title}
                                            className={`card ${styles.capCard} animate-fade-up`}
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        >
                                            <span className={styles.capIcon}>{cap.icon}</span>
                                            <h4>{cap.title}</h4>
                                            <p>{cap.desc}</p>
                                            <span className={styles.capTech}>{cap.tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
