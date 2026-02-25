import Link from 'next/link';
import { generateHTML } from '@tiptap/html/server';
import { getTiptapExtensions } from '@/lib/tiptapConfig';

export default function HomeBlogSection({ posts }) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="section" style={{ background: "var(--bg-secondary)" }}>
            <div className="container">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                        <span className="section-label">Insights</span>
                        <h2 className="section-title" style={{ marginBottom: 0 }}>
                            Latest From The <span className="gradient-text">Blog</span>
                        </h2>
                    </div>
                    <Link href="/blog" className="btn btn-outline" style={{ fontSize: "0.9rem", padding: "0.5rem 1.25rem" }}>
                        View All Posts →
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
                    {posts.slice(0, 3).map((post) => {
                        let textContent = '';
                        if (typeof post.content === 'string') {
                            textContent = post.content.replace(/<[^>]*>?/gm, '');
                        } else if (post.content && typeof post.content === 'object') {
                            try {
                                const generatedHtml = generateHTML(post.content, getTiptapExtensions());
                                textContent = generatedHtml.replace(/<[^>]*>?/gm, '');
                            } catch (e) {
                                console.error("Error parsing TipTap JSON for snippet:", e);
                            }
                        }

                        const snippet = textContent.length > 120 ? textContent.substring(0, 120) + '...' : textContent;

                        return (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="card" style={{ display: "flex", flexDirection: "column", textDecoration: "none", transition: "transform var(--transition-fast), border-color var(--transition-fast)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                                    <time dateTime={post.createdAt}>
                                        {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </time>
                                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border-hover)", display: "inline-block" }}></span>
                                    <span style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Technology</span>
                                </div>
                                <h3 style={{ fontSize: "1.25rem", fontFamily: "var(--font-body)", marginBottom: "1rem", color: "var(--text-primary)", fontWeight: 700 }}>
                                    {post.title}
                                </h3>
                                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "1.5rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", flexGrow: 1 }}>
                                    {snippet}
                                </p>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    Read Article <span>→</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
