import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export default async function sitemap() {
    const baseUrl = "https://vexioapp.com";

    // Static pages
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
    ];

    // Dynamic blog post pages
    let blogPages = [];
    try {
        await connectDB();
        const posts = await Post.find({ published: true })
            .select("slug updatedAt createdAt")
            .lean();

        blogPages = posts.map((post) => ({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: post.updatedAt || post.createdAt || new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        }));
    } catch (error) {
        console.error("Sitemap: Error fetching blog posts:", error);
    }

    return [...staticPages, ...blogPages];
}
