import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import useAuthStore from "./stores/authStore";
import { login, signup, type apiAuthType } from "./api";

function App() {
  const { token, setAuth } = useAuthStore();
  const [mode, setMode] = useState("login");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  async function handleLogin(creds: apiAuthType) {
    const res = await login(creds);
    setAuth(res.token, res.user);
  }

  async function handleSignup(creds: apiAuthType) {
    const res = await signup(creds);
    setAuth(res.token, res.user);
  }

  if (!token) {
    return mode === "signup" ? (
      <Signup onSignup={handleSignup} switchToLogin={() => setMode("login")} />
    ) : (
      <Login onLogin={handleLogin} switchToSignup={() => setMode("signup")} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-[var(--bg)] text-[var(--text)] transition-all duration-300">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--accent)]">
          Family Tasks 🏡
        </h1>
        <p className="text-[var(--text-secondary)]">Stay organized together.</p>
      </header>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Add a new task..."
          className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
        />
        <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95">
          Add Task
        </button>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-10 px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all"
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

export default App;
