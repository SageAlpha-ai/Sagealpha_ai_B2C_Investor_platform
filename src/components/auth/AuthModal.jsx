import React, { useEffect, useMemo, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CONFIG from "../../config";

function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

async function postJson(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export default function AuthModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // 'login' | 'signup'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  const [login, setLogin] = useState({ email: "", password: "" });

  const base = useMemo(() => CONFIG.API_BASE_URL || "", []);

  useEffect(() => {
    if (!isOpen) return;
    setError("");
    setIsLoading(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSuccess = (data) => {
    localStorage.setItem("sagealpha_token", data.token);
    localStorage.setItem("sagealpha_user", JSON.stringify(data.user));
    window.dispatchEvent(new Event("sagealpha-auth-changed"));
    onClose?.();
    navigate("/dashboard");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!login.email || !login.password) {
      setError("Email and password are required");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const data = await postJson(`${base}/api/auth/login`, {
        email: login.email,
        password: login.password,
      });
      handleSuccess(data);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!signup.name || !signup.email || !signup.password) {
      setError("All fields are required");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      const data = await postJson(`${base}/api/auth/signup`, signup);
      handleSuccess(data);
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in zoom-in-95 duration-200 border border-slate-200/60 dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            {tab === "login" ? "Welcome back" : "Create your account"}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {tab === "login"
              ? "Log in to generate AI stock reports."
              : "Sign up to start generating AI stock reports."}
          </p>
        </div>

        <div className="grid grid-cols-2 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl p-1 mb-6">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={classNames(
              "py-2.5 text-sm font-extrabold rounded-lg transition",
              tab === "login"
                ? "bg-white dark:bg-slate-900 shadow text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setTab("signup")}
            className={classNames(
              "py-2.5 text-sm font-extrabold rounded-lg transition",
              tab === "signup"
                ? "bg-white dark:bg-slate-900 shadow text-slate-900 dark:text-white"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            )}
          >
            Signup
          </button>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-lg mb-4">
            {error}
          </div>
        )}

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="login-email">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={login.email}
                onChange={(e) => setLogin((s) => ({ ...s, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="login-password">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={login.password}
                onChange={(e) => setLogin((s) => ({ ...s, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 mt-1 transition shadow-lg shadow-blue-500/30 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="signup-name">
                Full Name
              </label>
              <input
                id="signup-name"
                type="text"
                value={signup.name}
                onChange={(e) => setSignup((s) => ({ ...s, name: e.target.value }))}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={signup.email}
                onChange={(e) => setSignup((s) => ({ ...s, email: e.target.value }))}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={signup.password}
                onChange={(e) => setSignup((s) => ({ ...s, password: e.target.value }))}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 mt-1 transition shadow-lg shadow-blue-500/30 disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

