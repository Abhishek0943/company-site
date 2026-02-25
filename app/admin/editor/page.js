'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEditor, EditorContent } from '@tiptap/react';
import { getTiptapExtensions } from '@/lib/tiptapConfig';
import {
    Bold, Italic, Strikethrough, Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Code, Image as ImageIcon,
    Table as TableIcon, Save, ArrowLeft, Loader2, Underline as UnderlineIcon,
    AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Highlighter
} from 'lucide-react';
import Link from 'next/link';
import 'highlight.js/styles/atom-one-dark.css';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const [showImageInput, setShowImageInput] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const addImage = useCallback(() => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl }).run();
            setImageUrl('');
            setShowImageInput(false);
        }
    }, [editor, imageUrl]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", padding: "0.75rem", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", position: "sticky", zIndex: 40, borderTopLeftRadius: "var(--radius-md)", borderTopRightRadius: "var(--radius-md)" }}>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('bold') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('bold') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                onMouseEnter={(e) => { if (!editor.isActive('bold')) { e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)"; e.currentTarget.style.color = "var(--text-primary)"; } }}
                onMouseLeave={(e) => { if (!editor.isActive('bold')) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)"; } }}
                title="Bold"
            >
                <Bold size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('italic') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('italic') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Italic"
            >
                <Italic size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('strike') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('strike') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Strikethrough"
            >
                <Strikethrough size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={!editor.can().chain().focus().toggleUnderline().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('underline') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('underline') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Underline"
            >
                <UnderlineIcon size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('highlight') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('highlight') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Highlight"
            >
                <Highlighter size={18} />
            </button>

            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <button
                    onClick={() => {
                        const previousUrl = editor.getAttributes('link').href;
                        const url = window.prompt('URL', previousUrl);
                        if (url === null) return;
                        if (url === '') {
                            editor.chain().focus().extendMarkRange('link').unsetLink().run();
                            return;
                        }
                        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                    }}
                    style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('link') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('link') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                    title="Insert Link"
                >
                    <LinkIcon size={18} />
                </button>
            </div>

            <div style={{ width: "1px", height: "24px", background: "var(--border)", margin: "auto 4px" }} />

            <button
                onClick={() => editor.chain().focus().setTextAlign('left').run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive({ textAlign: 'left' }) ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive({ textAlign: 'left' }) ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Align Left"
            >
                <AlignLeft size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('center').run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive({ textAlign: 'center' }) ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive({ textAlign: 'center' }) ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Align Center"
            >
                <AlignCenter size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().setTextAlign('right').run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive({ textAlign: 'right' }) ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive({ textAlign: 'right' }) ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Align Right"
            >
                <AlignRight size={18} />
            </button>

            <div style={{ width: "1px", height: "24px", background: "var(--border)", margin: "auto 4px" }} />

            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('heading', { level: 1 }) ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('heading', { level: 1 }) ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Heading 1"
            >
                <Heading1 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('heading', { level: 2 }) ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('heading', { level: 2 }) ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Heading 2"
            >
                <Heading2 size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('heading', { level: 3 }) ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('heading', { level: 3 }) ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Heading 3"
            >
                <Heading3 size={18} />
            </button>

            <div style={{ width: "1px", height: "24px", background: "var(--border)", margin: "auto 4px" }} />

            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('bulletList') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('bulletList') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Bullet List"
            >
                <List size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('orderedList') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('orderedList') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Ordered List"
            >
                <ListOrdered size={18} />
            </button>

            <div style={{ width: "1px", height: "24px", background: "var(--border)", margin: "auto 4px" }} />

            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('blockquote') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('blockquote') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Quote"
            >
                <Quote size={18} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: editor.isActive('codeBlock') ? "rgba(255, 255, 255, 0.1)" : "transparent", color: editor.isActive('codeBlock') ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Code Block"
            >
                <Code size={18} />
            </button>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <button
                    onClick={() => setShowImageInput(!showImageInput)}
                    style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: showImageInput ? "rgba(255, 255, 255, 0.1)" : "transparent", color: showImageInput ? "var(--text-primary)" : "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                    title="Insert Image URL"
                >
                    <ImageIcon size={18} />
                </button>
                {showImageInput && (
                    <div style={{ position: "absolute", top: "100%", left: "0", marginTop: "0.5rem", background: "var(--bg-elevated)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "0.5rem", display: "flex", gap: "0.5rem", boxShadow: "0 10px 25px rgba(0,0,0,0.5)", zIndex: 50 }}>
                        <input
                            type="text"
                            placeholder="Enter image URL..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && addImage()}
                            style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "0.5rem", color: "var(--text-primary)", fontSize: "0.9rem", outline: "none", width: "250px" }}
                            autoFocus
                        />
                        <button
                            onClick={addImage}
                            style={{ background: "var(--accent)", color: "#000", border: "none", borderRadius: "var(--radius-sm)", padding: "0.5rem 1rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
                        >
                            Add
                        </button>
                    </div>
                )}
            </div>

            <div style={{ width: "1px", height: "24px", background: "var(--border)", margin: "auto 4px" }} />

            <button
                onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                style={{ padding: "0.5rem", borderRadius: "var(--radius-sm)", background: "transparent", color: "var(--text-secondary)", border: "none", cursor: "pointer", transition: "var(--transition-fast)" }}
                title="Insert Table"
            >
                <TableIcon size={18} />
            </button>
        </div>
    );
};

function EditorForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [published, setPublished] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(!!id);

    const editor = useEditor({
        extensions: getTiptapExtensions(),
        content: '',
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-img:w-full prose-img:rounded-lg prose-img:mx-auto max-w-none focus:outline-none',
                style: 'min-height: 500px; padding: 2rem; font-family: var(--font-body); font-size: 1.1rem; line-height: 1.7;',
            },
        },
    });

    useEffect(() => {
        if (id && editor) {
            fetchPost(id);
        }
    }, [id, editor]);

    const fetchPost = async (postId) => {
        try {
            const res = await fetch(`/api/posts/${postId}`);
            if (res.ok) {
                const data = await res.json();
                setTitle(data.title);
                setSlug(data.slug);
                setPublished(data.published);
                // TipTap natively handles both HTML strings and JSON objects through this method
                editor.commands.setContent(data.content || '');
            }
        } catch (error) {
            console.error('Failed to fetch post', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (!id) {
            setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
        }
    };

    const savePost = async () => {
        if (!title || !slug) {
            alert('Title and Slug are required.');
            return;
        }

        setIsSaving(true);
        const content = editor.getHTML();
        const payload = { title, slug, content, published };

        try {
            const url = id ? `/api/posts/${id}` : '/api/posts';
            const method = id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh();
            } else {
                alert('Failed to save post.');
            }
        } catch (error) {
            console.error('Error saving post', error);
            alert('An error occurred while saving.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return <div style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", justifyContent: "center", padding: "5rem 0", gap: "1rem" }}><Loader2 size={24} /> <span style={{ fontSize: "1.1rem" }}>Loading Editor Environment...</span></div>;
    }

    return (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <Link href="/admin" style={{ color: "var(--text-secondary)", textDecoration: "none", background: "var(--bg-elevated)", padding: "0.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 style={{ fontFamily: "var(--font-body)", fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>{id ? 'Edit Post' : 'New Post'}</h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "var(--text-secondary)", cursor: "pointer" }}>
                        <input
                            type="checkbox"
                            checked={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            style={{ width: "16px", height: "16px", accentColor: "var(--accent)", cursor: "pointer" }}
                        />
                        Publish immediately
                    </label>
                    <button
                        onClick={savePost}
                        disabled={isSaving}
                        className="btn btn-primary"
                        style={{ height: "40px", opacity: isSaving ? 0.7 : 1, cursor: isSaving ? "not-allowed" : "pointer" }}
                    >
                        {isSaving ? <Loader2 size={18} /> : <Save size={18} />}
                        {isSaving ? 'Saving...' : 'Save Post'}
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div className="card" style={{ padding: "1.5rem" }}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>Post Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="e.g. How to use Next.js App Router"
                            style={{ width: "100%", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "1rem", color: "var(--text-primary)", fontSize: "1.1rem", fontFamily: "var(--font-body)", outline: "none", transition: "border-color var(--transition-fast)" }}
                            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>URL Slug</label>
                        <div style={{ display: "flex", alignItems: "center", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", transition: "border-color var(--transition-fast)" }}>
                            <span style={{ padding: "1rem", color: "var(--text-tertiary)", background: "rgba(0,0,0,0.2)", borderRight: "1px solid var(--border)" }}>/blog/</span>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="how-to-use-nextjs"
                                style={{ width: "100%", background: "transparent", border: "none", padding: "1rem", color: "var(--text-primary)", fontSize: "1rem", fontFamily: "var(--font-body)", outline: "none" }}
                            />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column", minHeight: "600px", overflow: "hidden" }}>
                    <MenuBar editor={editor} />
                    <div style={{ flexGrow: 1, background: "var(--bg-primary)" }}>
                        <EditorContent editor={editor} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="text-gray-400 flex items-center justify-center py-20 gap-3"><Loader2 className="animate-spin" size={24} /> <span className="text-lg">Loading Editor Environment...</span></div>}>
            <EditorForm />
        </Suspense>
    );
}
