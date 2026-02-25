"use client";
import { useState } from 'react';
import styles from './FAQSection.module.css';

const faqs = [
    {
        question: "What technologies do you specialize in?",
        answer: "We specialize in modern web and mobile tech stacks, predominantly React, Next.js, Node.js, and React Native. We also have deep expertise in cloud architecture with AWS and database design using MongoDB and PostgreSQL."
    },
    {
        question: "How long does a typical project take?",
        answer: "A standard web application or MVP usually takes between 6 to 12 weeks from scope definition to launch. More complex enterprise systems or custom platforms can take several months depending on the requirements."
    },
    {
        question: "Do you offer post-launch support and maintenance?",
        answer: "Absolutely. We provide comprehensive post-launch support, including bug fixes, server monitoring, security updates, and performance optimizations. We view our client relationships as long-term partnerships."
    },
    {
        question: "How do you handle project pricing?",
        answer: "We offer both fixed-price contracts for well-defined scopes and time-and-materials pricing for more dynamic, ongoing projects. We ensure transparent scoping so you understand exactly what you are paying for."
    }
];

export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className={`section ${styles.faqSection}`}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                    <span className="section-label">Got Questions?</span>
                    <h2 className="section-title">
                        Frequently Asked <span className="gradient-text">Questions</span>
                    </h2>
                </div>
                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
                            onClick={() => toggleFaq(index)}
                        >
                            <div className={styles.faqHeader}>
                                <h3>{faq.question}</h3>
                                <span className={styles.faqIcon}>
                                    {activeIndex === index ? '−' : '+'}
                                </span>
                            </div>
                            <div className={styles.faqBody}>
                                <div className={styles.faqContent}>
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
