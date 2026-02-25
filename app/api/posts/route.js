import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { generateJSON } from '@tiptap/html/server';
import { getTiptapExtensions } from '@/lib/tiptapConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const posts = await Post.find().sort({ createdAt: -1 }).lean();

        // Return JSON format expected by frontend (e.g., swapping _id to plain object if needed, 
        // but current frontend relies on the exact 'id' string generated during POST)
        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching posts from MongoDB:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        await connectDB();
        let content = body.content;
        if (typeof content === 'string') {
            content = generateJSON(content, getTiptapExtensions());
        }
        const newPostData = {
            id: Date.now().toString(),
            ...body,
            content,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const post = await Post.create(newPostData);
        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post in MongoDB:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
