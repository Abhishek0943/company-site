'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
            router.refresh(); // Ensure clear state
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                fontSize: "0.9rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0
            }}
            onMouseEnter={(e) => e.target.style.color = "var(--text-primary)"}
            onMouseLeave={(e) => e.target.style.color = "var(--text-secondary)"}
        >
            Logout
        </button>
    );
}
