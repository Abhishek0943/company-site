import { unstable_noStore as noStore } from "next/cache";
import connectDB from "@/lib/mongodb";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function sitemap() {
  noStore();

  const baseUrl = "https://vexioapp.com";

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
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

  try {
    await connectDB();

    const posts = await Post.find({ published: true })
      .select("slug updatedAt createdAt")
      .lean();

    const blogPages= posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt ?? post.createdAt ?? new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    return [...staticPages, ...blogPages];
  } catch (error) {
    console.error("Sitemap error:", error);
    return staticPages;
  }
}