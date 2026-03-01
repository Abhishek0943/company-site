import Link from 'next/link';
import '../globals.css';

export const metadata = {
    title: 'Admin Dashboard - VexioApp',
    description: 'Manage blog posts',
};

export default function AdminLayout({ children }) {
    return (
        <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
            <header style={{ borderBottom: "1px solid var(--border)", background: "rgba(10, 10, 15, 0.8)", backdropFilter: "blur(20px)", position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
                <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "4rem" }}>
                    <Link href="/admin" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--text-primary)", textDecoration: "none" }}>
                        Vexio<span style={{ color: "var(--accent)" }}>Admin</span>
                    </Link>
                    <nav style={{ display: "flex", gap: "1.5rem" }}>
                        <Link href="/" target="_blank" style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 500, textDecoration: "none" }}>
                            View Website ↗
                        </Link>
                    </nav>
                </div>
            </header>
            <main className="container" style={{ paddingTop: "8rem", paddingBottom: "4rem", minHeight: "100vh" }}>
                {children}
            </main>
        </div>
    );
}
