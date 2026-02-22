import { company } from "@/data/company";
import ContactForm from "@/components/ContactForm";
import styles from "./page.module.css";

export const metadata = {
    title: "Contact — Pundir Tech",
    description:
        "Get in touch with Pundir Tech. Let's discuss your next web or mobile app project.",
};

export default function ContactPage() {
    return (
        <>
            {/* ========== PAGE HEADER ========== */}
            <section className={styles.pageHeader}>
                <div className="grid-bg"></div>
                <div className={`container ${styles.headerContent}`}>
                    <span className="section-label">Contact</span>
                    <h1 className="animate-fade-up">
                        Let&apos;s Build Something
                        <br />
                        <span className="gradient-text">Together</span>
                    </h1>
                    <p className={`${styles.headerSub} animate-fade-up delay-2`}>
                        Have a project in mind? We&apos;d love to hear about it. Send us a message
                        and we&apos;ll get back to you as soon as possible.
                    </p>
                </div>
            </section>

            {/* ========== CONTACT ========== */}
            <section className={`section ${styles.contactSection}`}>
                <div className={`container ${styles.contactGrid}`}>
                    {/* Info */}
                    <div className={styles.contactInfo}>
                        <div className={styles.infoBlock}>
                            <h3>Email</h3>
                            <a href={`mailto:${company.contact.email}`} className={styles.infoLink}>
                                {company.contact.email}
                            </a>
                        </div>
                        <div className={styles.infoBlock}>
                            <h3>Phone</h3>
                            <a href={`tel:${company.contact.phone}`} className={styles.infoLink}>
                                {company.contact.phone}
                            </a>
                        </div>
                        <div className={styles.infoBlock}>
                            <h3>Location</h3>
                            {company.contact.locations.map((loc) => (
                                <p key={loc} className={styles.infoText}>
                                    {loc}
                                </p>
                            ))}
                        </div>
                        <div className={styles.infoBlock}>
                            <h3>Social</h3>
                            <div className={styles.socialLinks}>
                                <a
                                    href={company.social.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                >
                                    GitHub ↗
                                </a>
                                <a
                                    href={company.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                >
                                    LinkedIn ↗
                                </a>
                            </div>
                        </div>

                        <div className={styles.responseBadge}>
                            <span className={styles.responseDot}></span>
                            Usually responds within 24 hours
                        </div>
                    </div>

                    {/* Form */}
                    <div className={styles.formWrapper}>
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* ========== FAQ ========== */}
            <section className={`section ${styles.faqSection}`}>
                <div className="container">
                    <span className="section-label">FAQ</span>
                    <h2 className="section-title">
                        Common <span className="gradient-text">Questions</span>
                    </h2>
                    <div className={styles.faqGrid}>
                        {[
                            {
                                q: "What technologies do you work with?",
                                a: "We specialize in React, Next.js, Node.js, Express, MongoDB, React Native, TypeScript, AWS, Docker, Redis, and Socket.IO.",
                            },
                            {
                                q: "How long does a typical project take?",
                                a: "Timeline varies by scope. A simple web app takes 2-4 weeks, while complex platforms with mobile apps can take 2-4 months.",
                            },
                            {
                                q: "Do you provide ongoing support?",
                                a: "Yes! We offer maintenance and support packages to keep your application running smoothly after launch.",
                            },
                            {
                                q: "Can you work with our existing codebase?",
                                a: "Absolutely. We can audit, optimize, and extend existing applications. We also offer code review and refactoring services.",
                            },
                        ].map((faq, i) => (
                            <div
                                key={i}
                                className={`card ${styles.faqCard} animate-fade-up`}
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <h3>{faq.q}</h3>
                                <p>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
