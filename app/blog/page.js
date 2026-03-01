import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { generateHTML } from '@tiptap/html/server';
import { getTiptapExtensions } from '@/lib/tiptapConfig';

export const dynamic = 'force-dynamic';

async function getPublishedPosts() {
    try {
        await connectDB();
        const posts = await Post.find({ published: true })
            .sort({ createdAt: -1 })
            .lean();
        return posts;
    } catch (error) {
        console.error('Error fetching posts from MongoDB:', error);
        return [];
    }
}

export const metadata = {
    title: 'Blog - VexioApp Insights',
    description: 'Read the latest thoughts, tutorials, and technical deep-dives from VexioApp.',
    openGraph: {
        title: 'Blog - VexioApp Insights',
        description: 'Read the latest thoughts, tutorials, and technical deep-dives from VexioApp.',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
};

export default async function BlogIndex() {
    const posts = await getPublishedPosts();

    return (
        <section className="section" style={{ paddingTop: "10rem", minHeight: "100vh" }}>
            <div className="container" style={{ maxWidth: "900px" }}>
                <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                    <h1 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
                        Our <span style={{ color: "var(--accent)" }}>Insights</span>
                    </h1>
                    <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
                        Thoughts, tutorials, and technical deep-dives into software development, DevOps, and building scalable applications.
                    </p>
                </div>

                {posts.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "5rem 0", background: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>No Posts Yet</h3>
                        <p style={{ color: "var(--text-secondary)" }}>Check back soon for new articles!</p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        {posts.map((post) => {
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
                            const snippet = textContent.length > 200 ? textContent.substring(0, 200) + '...' : textContent;

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
                                        {snippet}
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
        </section>
    );
}
