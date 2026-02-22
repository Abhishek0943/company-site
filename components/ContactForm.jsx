"use client";
import { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // For now, just show success. Integrate with API later.
        setStatus("success");
        setTimeout(() => setStatus(""), 4000);
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <div className={styles.field}>
                    <label htmlFor="name" className={styles.label}>
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                        className={styles.input}
                    />
                </div>
            </div>
            <div className={styles.field}>
                <label htmlFor="subject" className={styles.label}>
                    Subject
                </label>
                <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    required
                    className={styles.input}
                />
            </div>
            <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    required
                    rows={6}
                    className={styles.textarea}
                />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
                Send Message
                <span>→</span>
            </button>
            {status === "success" && (
                <p className={styles.success}>
                    ✓ Message sent successfully! We&apos;ll get back to you soon.
                </p>
            )}
        </form>
    );
}
