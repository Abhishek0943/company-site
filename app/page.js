import Link from "next/link";
import { company } from "@/data/company";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/testimonials";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import FAQSection from "@/components/FAQSection";
import HomeBlogSection from "@/components/HomeBlogSection";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";
import styles from "./page.module.css";

export const dynamic = 'force-dynamic';

async function getRecentPosts() {
  try {
    await connectDB();
    const posts = await Post.find({ published: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .lean();
    return posts;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

export default async function Home() {
  const featuredProjects = projects.filter((p) => p.featured);
  const recentPosts = await getRecentPosts();

  return (
    <>
      {/* ========== HERO ========== */}
      <section className={styles.hero}>
        <div className="grid-bg"></div>
        <div className={styles.heroGlow}></div>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroBadge}>
            <span className={styles.badgeDot}></span>
            Available for projects
          </div>
          <h1 className={`${styles.heroTitle} animate-fade-up`}>
            We Build
            <br />
            <span className="gradient-text">Digital Futures</span>
          </h1>
          <p className={`${styles.heroSubtitle} animate-fade-up delay-2`}>
            {company.description}
          </p>
          <div className={`${styles.heroCtas} animate-fade-up delay-3`}>
            <Link href="/contact" className="btn btn-primary">
              Start a Project
              <span>→</span>
            </Link>
            <Link href="/services" className="btn btn-outline">
              Our Services
            </Link>
          </div>
          <div className={`${styles.heroStats} animate-fade-up delay-5`}>
            {company.stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroScrollIndicator}>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* ========== SERVICES ========== */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">
            Services We <span className="gradient-text">Offer</span>
          </h2>
          <p className="section-subtitle">
            End-to-end technology solutions to bring your ideas to life.
          </p>
          <div className={styles.servicesGrid}>
            {services.slice(0, 6).map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className={styles.servicesCta}>
            <Link href="/services" className="btn btn-outline">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ABOUT SNIPPET ========== */}
      <section className={`section ${styles.aboutSection}`}>
        <div className={`container ${styles.aboutGrid}`}>
          <div className={styles.aboutContent}>
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">
              Crafting Code That <span className="gradient-text">Matters</span>
            </h2>
            <p className={styles.aboutText}>{company.longDescription}</p>
            <div className={styles.aboutValues}>
              {company.values.slice(0, 2).map((val) => (
                <div key={val.title} className={styles.valueItem}>
                  <span className={styles.valueIcon}>{val.icon}</span>
                  <div>
                    <strong>{val.title}</strong>
                    <p>{val.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="btn btn-outline" style={{ marginTop: "1rem" }}>
              Learn More About Us →
            </Link>
          </div>
          <div className={styles.aboutVisual}>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeDot} style={{ background: "#ff5f56" }}></span>
                <span className={styles.codeDot} style={{ background: "#ffbd2e" }}></span>
                <span className={styles.codeDot} style={{ background: "#27c93f" }}></span>
                <span className={styles.codeTitle}>vexioapp.js</span>
              </div>
              <pre className={styles.codeContent}>
                {`const VexioApp = {
  expertise: [
    "React & Next.js",
    "React Native",
    "Node.js & Express",
    "MongoDB & Redis",
    "AWS Cloud",
  ],
  passion: "Building scalable
    digital solutions",
  motto: () => "Code that 
    delivers results",
};`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PROJECTS ========== */}
      <section className={`section ${styles.projectsSection}`}>
        <div className="container">
          <span className="section-label">Our Work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world solutions we&apos;ve built for businesses.
          </p>
          {featuredProjects.length > 0 ? (
            <div className={styles.projectsGrid}>
              {featuredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          ) : (
            <div className={styles.comingSoon}>
              <div className={styles.comingSoonIcon}>⟐</div>
              <h3>Projects Coming Soon</h3>
              <p>
                We&apos;re preparing our portfolio showcase. Check back soon to see
                our latest work.
              </p>
              <Link href="/contact" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Start a Project With Us →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ========== TESTIMONIALS ========== */}
      {testimonials.length > 0 && (
        <section className={`section ${styles.testimonialsSection}`}>
          <div className="container">
            <span className="section-label">Client Voices</span>
            <h2 className="section-title">
              What People <span className="gradient-text">Say</span>
            </h2>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`card ${styles.testimonialCard} animate-fade-up`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className={styles.testimonialStars}>
                    {"★".repeat(t.rating)}
                  </div>
                  <p className={styles.testimonialContent}>
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.authorAvatar}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <strong>{t.name}</strong>
                      <p>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== BLOG SECTION ========== */}
      <HomeBlogSection posts={recentPosts} />

      {/* ========== FAQ SECTION ========== */}
      <FAQSection />

      {/* ========== CTA ========== */}
      <section className={`section ${styles.ctaSection}`}>
        <div className="grid-bg"></div>
        <div className={`container ${styles.ctaContent}`}>
          <h2 className={styles.ctaTitle}>
            Ready to Build Something <span className="gradient-text">Amazing</span>?
          </h2>
          <p className={styles.ctaSubtitle}>
            Let&apos;s turn your idea into a production-grade digital product.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className="btn btn-primary">
              Get In Touch
              <span>→</span>
            </Link>
            <Link href="/services" className="btn btn-outline">
              Explore Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
