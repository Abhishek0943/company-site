'use client';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export default function CopyCodeButton({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`p-2 rounded-lg transition-all flex items-center justify-center border ${copied
                ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-500"
                : "bg-transparent/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
            aria-label="Copy code"
            title="Copy code"
            style={{ cursor: "pointer", backgroundColor: "transparent", border: "none" }}
        >
            {copied ? <Check style={{ color: "#0ed3cf" }} size={16} /> : <Copy style={{ color: "#0ed3cf" }} size={16} />}
        </button>
    );
}
