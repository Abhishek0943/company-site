import { services } from "@/data/services";
import styles from "./page.module.css";

export const metadata = {
    title: "Services — VexioApp",
    description:
        "Explore our IT services: web development, mobile apps, API & backend, cloud & DevOps, real-time solutions, and ERP systems.",
    openGraph: {
        title: "Services — VexioApp",
        description: "Explore our IT services: web development, mobile apps, API & backend, cloud & DevOps, real-time solutions, and ERP systems.",
        images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
};

export default function ServicesPage() {
    return (
        <>
            {/* ========== PAGE HEADER ========== */}
            <section className={styles.pageHeader}>
                <div className="grid-bg"></div>
                <div className={`container ${styles.headerContent}`}>
                    <span className="section-label">Services</span>
                    <h1 className="animate-fade-up">
                        What We <span className="gradient-text">Build</span>
                    </h1>
                    <p className={`${styles.headerSub} animate-fade-up delay-2`}>
                        End-to-end technology solutions — from concept to deployment.
                        We deliver production-grade software that scales with your business.
                    </p>
                </div>
            </section>

            {/* ========== SERVICES ========== */}
            <section className={`section ${styles.servicesSection}`}>
                <div className="container">
                    {services.map((service, i) => (
                        <div
                            key={service.id}
                            id={service.id}
                            className={`${styles.serviceBlock} animate-fade-up`}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            <div className={styles.serviceHeader}>
                                <div className={styles.serviceIconWrap}>
                                    <span className={styles.serviceIcon}>{service.icon}</span>
                                </div>
                                <div>
                                    <h2 className={styles.serviceTitle}>{service.title}</h2>
                                    <div className={styles.serviceTechs}>
                                        {service.technologies.map((tech) => (
                                            <span key={tech} className={styles.techPill}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className={styles.serviceDesc}>{service.description}</p>
                            {service.features && (
                                <div className={styles.featuresList}>
                                    <h4 className={styles.featuresTitle}>What&apos;s Included</h4>
                                    <ul>
                                        {service.features.map((f) => (
                                            <li key={f}>
                                                <span className={styles.featureCheck}>✓</span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* ========== PROCESS ========== */}
            <section className={`section ${styles.processSection}`}>
                <div className="container">
                    <span className="section-label">Our Process</span>
                    <h2 className="section-title">
                        How We <span className="gradient-text">Work</span>
                    </h2>
                    <div className={styles.processGrid}>
                        {[
                            {
                                step: "01",
                                title: "Discovery",
                                desc: "We understand your business, goals, and technical requirements through in-depth discussions.",
                            },
                            {
                                step: "02",
                                title: "Design & Plan",
                                desc: "We architect the solution, design the UI/UX, and create a detailed project roadmap.",
                            },
                            {
                                step: "03",
                                title: "Development",
                                desc: "We build with agile sprints, keeping you updated with regular demos and progress reports.",
                            },
                            {
                                step: "04",
                                title: "Deploy & Support",
                                desc: "We deploy to production, monitor performance, and provide ongoing support and maintenance.",
                            },
                        ].map((proc, i) => (
                            <div
                                key={proc.step}
                                className={`card ${styles.processCard} animate-fade-up`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <span className={styles.processStep}>{proc.step}</span>
                                <h3>{proc.title}</h3>
                                <p>{proc.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
