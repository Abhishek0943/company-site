import BlogListClient from './BlogListClient';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { generateHTML } from '@tiptap/html/server';
import { getTiptapExtensions } from '@/lib/tiptapConfig';

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

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
    const rawPosts = await getPublishedPosts();

    // Process snippets on the server before sending to client
    const posts = rawPosts.map((post) => {
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

        return {
            ...post,
            snippet,
            // Convert any non-serializable properties before passing to client component
            _id: post._id ? post._id.toString() : null,
        }
    });

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
                    <BlogListClient posts={posts} />
                )}
            </div>
        </section>
    );
}
