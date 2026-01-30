"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        const from = searchParams.get("from") || "/";
        router.push(from);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Wrong password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
          className="w-full px-4 py-3 bg-sand-800 border border-sand-700 rounded-lg text-sand-100 placeholder-sand-500 focus:outline-none focus:border-primary-500 transition-colors"
        />
      </div>

      {error && <p className="text-accent-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading || !password}
        className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Checking..." : "Enter"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-sand-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-sand-900 rounded-xl border border-sand-800 p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-sand-100 font-serif">
              CodeForge
            </h1>
            <p className="text-sand-500 text-sm mt-1">
              Enter password to continue
            </p>
          </div>

          <Suspense
            fallback={
              <div className="text-center text-sand-500 text-sm py-4">
                Loading...
              </div>
            }
          >
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
