import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/models/Message";

export async function POST(req) {
    try {
        await connectDB();
        const data = await req.json();

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Save to MongoDB
        const newMessage = await Message.create({
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message,
        });

        return NextResponse.json(
            { message: "Message sent successfully!", id: newMessage._id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error saving message:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
