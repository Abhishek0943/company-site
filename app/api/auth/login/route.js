import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
    try {
        const body = await request.json();
        const { password } = body;

        // Check if the password matches the environment variable
        // Make sure you add ADMIN_PASSWORD to your .env.local file!
        const correctPassword = process.env.ADMIN_PASSWORD;

        if (!correctPassword) {
            console.error('ADMIN_PASSWORD environment variable is not set!');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        if (password === correctPassword) {
            // Set cookie for authentication
            const cookieStore = await cookies();
            cookieStore.set('admin_token', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/',
            });

            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { error: 'Bad request' },
            { status: 400 }
        );
    }
}
