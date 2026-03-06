'use client';
import { useState } from 'react';
import Link from 'next/link';
import { generateHTML } from '@tiptap/html';

export default function BlogListClient({ posts }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.title?.toLowerCase().includes(query) ||
            post.slug?.toLowerCase().includes(query)
        );
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <div style={{ marginBottom: "2rem" }}>
                <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "1rem 1.5rem",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--border)",
                        background: "var(--bg-elevated)",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                        outline: "none",
                        transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = "var(--accent)";
                        e.target.style.boxShadow = "0 0 0 2px rgba(14, 211, 207, 0.1)";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "var(--border)";
                        e.target.style.boxShadow = "none";
                    }}
                />
            </div>

            {filteredPosts.length === 0 ? (
                <div style={{ textAlign: "center", padding: "5rem 0", background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                    <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>No Posts Found</h3>
                    <p style={{ color: "var(--text-secondary)" }}>Try adjusting your search terms.</p>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                    {filteredPosts.map((post) => {
                        return (
                            <Link href={`/blog/${post.slug}`} key={post.id} className="card" style={{ display: "flex", flexDirection: "column", textDecoration: "none" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                                    <time dateTime={post.createdAt}>
                                        {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </time>
                                    <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border-hover)", display: "inline-block" }}></span>
                                    <span style={{ color: "var(--accent)", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Technology</span>
                                </div>
                                <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontFamily: "var(--font-body)", marginBottom: "1rem", color: "var(--text-primary)" }}>{post.title}</h2>
                                <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "2rem", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                                    {post.snippet}
                                </p>
                                <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--accent)", marginTop: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                    Read Article <span>→</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
