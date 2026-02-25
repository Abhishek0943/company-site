'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('/api/posts');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setIsLoading(false);
        }
    };

    const deletePost = async (id) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter((p) => p.id !== id));
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Failed to delete post', error);
        }
    };

    if (isLoading) {
        return <div className="text-gray-400 animate-pulse">Loading posts...</div>;
    }

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                    <h1 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(2rem, 4vw, 2.5rem)", fontWeight: 800, marginBottom: "0.5rem", color: "var(--text-primary)" }}>Blog Posts</h1>
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>Manage your website's blog content.</p>
                </div>
                <Link
                    href="/admin/editor"
                    className="btn btn-primary"
                >
                    Add New Post
                </Link>
            </div>

            <div className="card" style={{ padding: 0 }}>
                {posts.length === 0 ? (
                    <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
                        <div style={{ width: "64px", height: "64px", background: "var(--bg-elevated)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", fontSize: "1.5rem" }}>
                            <span>✍️</span>
                        </div>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>No posts yet</h3>
                        <p style={{ color: "var(--text-secondary)", maxWidth: "400px", margin: "0 auto" }}>
                            Your blog is currently empty. Click the button above to write your first post.
                        </p>
                    </div>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse", minWidth: "600px" }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid var(--border)", fontSize: "0.85rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", background: "rgba(255, 255, 255, 0.02)" }}>
                                    <th style={{ padding: "1.2rem 1.5rem", fontWeight: 600 }}>Title</th>
                                    <th style={{ padding: "1.2rem", fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: "1.2rem", fontWeight: 600 }}>Date</th>
                                    <th style={{ padding: "1.2rem 1.5rem", fontWeight: 600, textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {posts.map((post) => (
                                    <tr key={post.id} style={{ borderBottom: "1px solid var(--border)", transition: "background var(--transition-fast)" }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                                        <td style={{ padding: "1.2rem 1.5rem" }}>
                                            <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.25rem", fontSize: "1.05rem" }}>{post.title || 'Untitled Post'}</div>
                                            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>/{post.slug || 'no-slug'}</div>
                                        </td>
                                        <td style={{ padding: "1.2rem" }}>
                                            <span style={{ padding: "0.25rem 0.75rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700, borderRadius: "20px", border: `1px solid ${post.published ? 'rgba(0, 229, 200, 0.2)' : 'rgba(255, 170, 0, 0.2)'}`, background: post.published ? 'rgba(0, 229, 200, 0.1)' : 'rgba(255, 170, 0, 0.1)', color: post.published ? 'var(--accent)' : '#ffaa00' }}>
                                                {post.published ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td style={{ padding: "1.2rem", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </td>
                                        <td style={{ padding: "1.2rem 1.5rem", textAlign: "right", fontSize: "0.95rem", fontWeight: 600 }}>
                                            <Link href={`/admin/editor?id=${post.id}`} style={{ color: "var(--accent)", marginRight: "1rem", textDecoration: "none", transition: "var(--transition-fast)" }}>
                                                Edit
                                            </Link>
                                            <button onClick={() => deletePost(post.id)} style={{ color: "#ff4d4d", background: "none", border: "none", cursor: "pointer", fontWeight: 600, transition: "var(--transition-fast)" }} onMouseEnter={(e) => e.currentTarget.style.opacity = 0.8} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
