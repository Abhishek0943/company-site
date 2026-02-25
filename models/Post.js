import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            // Changed from String to Mixed to support both JSON (new posts) and String HTML (old posts)
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        published: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: false, // We handle them manually to preserve exact JSON parity
    }
);

// Prevent mongoose from recompiling the model if it already exists
const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

export default Post;
