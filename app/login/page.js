'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push('/admin');
                router.refresh(); // Force a refresh to ensure middleware sees the cookie
            } else {
                const data = await res.json();
                setError(data.error || 'Invalid password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg-primary)",
            padding: "1rem"
        }}>
            <div className="card" style={{ maxWidth: "400px", width: "100%", padding: "2.5rem" }}>
                <h1 style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    textAlign: "center"
                }}>
                    Admin Login
                </h1>
                <p style={{
                    color: "var(--text-secondary)",
                    textAlign: "center",
                    marginBottom: "2rem"
                }}>
                    Please enter the admin password to continue.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                    <div>
                        <label htmlFor="password" style={{
                            display: "block",
                            marginBottom: "0.5rem",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                            color: "var(--text-secondary)"
                        }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter password"
                            style={{
                                width: "100%",
                                padding: "0.8rem 1rem",
                                borderRadius: "8px",
                                border: "1px solid var(--border)",
                                background: "var(--bg-primary)",
                                color: "var(--text-primary)",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border-color 0.2s"
                            }}
                            onFocus={(e) => e.target.style.borderColor = "var(--accent)"}
                            onBlur={(e) => e.target.style.borderColor = "var(--border)"}
                        />
                    </div>

                    {error && (
                        <div style={{
                            color: "#ff4d4d",
                            fontSize: "0.9rem",
                            background: "rgba(255, 77, 77, 0.1)",
                            padding: "0.75rem",
                            borderRadius: "6px",
                            textAlign: "center"
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                        style={{ width: "100%", justifyContent: "center", marginTop: "0.5rem" }}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
