import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';
import { generateJSON } from '@tiptap/html/server';
import { getTiptapExtensions } from '@/lib/tiptapConfig';

export async function GET(request, { params }) {
    try {
        const { id } = await params;
        await connectDB();

        // The frontend often fetches by either ID (from admin) or slug (from public blog)
        const post = await Post.findOne({
            $or: [{ id: id }, { slug: id }]
        }).lean();

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching post from MongoDB:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        await connectDB();

        let content = body.content;
        if (typeof content === 'string') {
            content = generateJSON(content, getTiptapExtensions());
        }

        const updatedData = {
            ...body,
            content,
            updatedAt: new Date(),
        };

        const post = await Post.findOneAndUpdate(
            { id: id },
            { $set: updatedData },
            { new: true, runValidators: true }
        ).lean();

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error updating post in MongoDB:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        await connectDB();

        const result = await Post.findOneAndDelete({ id: id });

        if (!result) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post from MongoDB:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
