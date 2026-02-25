import fs from 'fs';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '..', '.env.local') });
import mongoose from 'mongoose';

// Manually connect using the URI
const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error('ERROR: MONGODB_URI is not set in .env.local');
    process.exit(1);
}

// Inline schema definition for standalone script execution
const PostSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    published: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, { timestamps: false });

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

const dataFilePath = path.join(process.cwd(), '..', 'data', 'posts.json');

async function migrate() {
    console.log('Starting migration from JSON to MongoDB...');

    if (!fs.existsSync(dataFilePath)) {
        console.log(`No file found at ${dataFilePath}. Nothing to migrate.`);
        process.exit(0);
    }

    try {
        const rawData = fs.readFileSync(dataFilePath, 'utf8');
        const posts = JSON.parse(rawData);

        if (posts.length === 0) {
            console.log('posts.json is empty. Nothing to migrate.');
            process.exit(0);
        }

        console.log(`Found ${posts.length} posts. Connecting to MongoDB...`);
        await mongoose.connect(uri);
        console.log('Connected directly to MongoDB.');

        // Insert posts one by one to avoid duplicate key errors if already migrated
        let inserted = 0;
        let skipped = 0;

        for (const post of posts) {
            // Check if post already exists by ID
            const existing = await Post.findOne({ id: post.id });
            if (!existing) {
                await Post.create(post);
                inserted++;
                console.log(`Migrated: ${post.title}`);
            } else {
                skipped++;
                console.log(`Skipped (already exists): ${post.title}`);
            }
        }

        console.log(`Migration complete! Successfully inserted ${inserted} posts. Skipped ${skipped} posts.`);
    } catch (error) {
        console.error('Hit an error during migration:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB.');
        process.exit(0);
    }
}

migrate();
