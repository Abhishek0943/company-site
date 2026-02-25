import Link from 'next/link';
import { notFound } from 'next/navigation';
import HtmlRenderer from '@/components/HtmlRenderer';
import { ArrowLeft } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { generateHTML } from '@tiptap/html/server';
import { getTiptapExtensions } from '@/lib/tiptapConfig';

export const dynamic = 'force-dynamic';


async function getPostBySlug(slug) {
    try {
        await connectDB();
        const post = await Post.findOne({ slug }).lean();
        return post;
    } catch (error) {
        console.error('Error fetching post from MongoDB:', error);
        return null;
    }
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    // Handle extraction for both pure HTML strings (old) and JSON trees (new)
    let textDescription = '';
    if (typeof post.content === 'string') {
        textDescription = post.content.replace(/<[^>]*>?/gm, '').substring(0, 160);
    } else if (post.content && typeof post.content === 'object') {
        const generatedHtml = generateHTML(post.content, getTiptapExtensions());
        textDescription = generatedHtml.replace(/<[^>]*>?/gm, '').substring(0, 160);
    }

    return {
        title: `${post.title} - Pundir Tech`,
        description: textDescription,
    };
}

export default async function BlogPostPage({ params }) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Backwards Compatibility: 
    // If the database has an old post stored as an HTML string, use it directly.
    // If it's a new post stored as a TipTap JSON object, generate the HTML on the server.
    let finalHtmlContent = '';
    if (typeof post.content === 'string') {
        finalHtmlContent = post.content;
    } else if (post.content && typeof post.content === 'object') {
        finalHtmlContent = generateHTML(post.content, getTiptapExtensions());
    }

    // Fallback calculation for read time if string vs object
    const contentTextLength = typeof post.content === 'string'
        ? post.content.length
        : JSON.stringify(post.content).length;

    return (
        <article className="section" style={{ minHeight: "100vh", paddingTop: "8rem" }}>
            <div className="container">
                <Link href="/blog" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--accent)", textDecoration: "none", marginBottm: "3rem", fontWeight: 500 }}>
                    <ArrowLeft size={18} /> Back to all posts
                </Link>

                <header style={{ marginBottom: "4rem", marginTop: "3rem" }}>
                    <h1 style={{ fontFamily: "var(--font-body)", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, lineHeight: 1.15, marginBottom: "2rem", color: "var(--text-primary)" }}>
                        {post.title}
                    </h1>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", color: "var(--text-secondary)", fontSize: "0.95rem", fontWeight: 500 }}>
                        <time dateTime={post.createdAt}>
                            {new Date(post.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </time>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border-hover)" }}></span>
                        <span style={{ color: "var(--accent)" }}>Technology</span>
                        <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--border-hover)" }}></span>
                        <span>{Math.max(1, Math.ceil(contentTextLength / 3000))} min read</span>
                    </div>
                </header>


                <main>
                    <HtmlRenderer html={finalHtmlContent} />
                </main>


                <div style={{ marginTop: "3rem", backgroundColor: "#0a0a0a", border: "1px solid #282b31ff", borderRadius: "16px", padding: "2rem" }} className="p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 shadow-2xl">
                    <div className="text-center sm:text-left">
                        <h3 className="text-xl font-bold mb-2">Pundir Tech</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-md">
                            We build scalable architectures, stunning user interfaces, and robust backend systems for modern businesses.
                        </p>
                        <Link href="/contact" className="text-[#0ed3cf] hover:text-white font-medium transition-colors border-b border-[#0ed3cf]/30 hover:border-white pb-0.5">
                            Work with us →
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
}
