import { useEffect, useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import useAuthStore from "./stores/authStore";
import { createFamily, login, signup } from "./api";
import type { apiAuthType } from "./types";
import Home from "./components/Home";
import useFamilyStore from "./stores/familyStore";
import { FaRegUserCircle, FaRegEye } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';

function App() {
  const { token, user, setAuth, clearAuth } = useAuthStore();
  const { addFamily } = useFamilyStore();
  const [mode, setMode] = useState("login");
  const [darkMode, setDarkMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add("dark");
    else html.classList.remove("dark");
  }, [darkMode]);

  async function handleLogin(creds: apiAuthType) {
    try {
      const res = await login(creds);
      setSuccessMsg('');
      setAuth(res.token, res.user);
      setSuccessMsg("Your Account was logged in Successfully!")
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      } else {
        setErrorMsg('Something went wrong.');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      }
    }
  }

  async function handleSignup(creds: apiAuthType) {
    try {
      setErrorMsg('');
      setSuccessMsg('');
      const res = await signup(creds);
      setAuth(res.token, res.user);
      setSuccessMsg("Your Account was created Successfully!")
      setTimeout(() => {
        setSuccessMsg('');
      }, 5000);
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setErrorMsg(err.response.data.error);
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      } else {
        setErrorMsg('Something went wrong.');
        setTimeout(() => {
          setErrorMsg('');
        }, 5000);
      }
    }
  }

  async function handleFamilyCreate(familyData) {
    const n = await createFamily(token, { ...familyData, userId: user.id });
    addFamily(n.family);
    user.familyId = n.family.id;
    setAuth(token, user);
  }

  if (!token) {
    return mode === "signup" ? (
      <Signup onSignup={handleSignup} switchToLogin={() => setMode("login")} errorMsg={errorMsg} />
    ) : (
      <Login onLogin={handleLogin} switchToSignup={() => setMode("signup")} errorMsg={errorMsg} />
    );
  }


  if (user.familyId === 'NULL') {
    return <Home user={user}
      handleFamilyCreate={handleFamilyCreate}
      setDarkMode={setDarkMode}
      darkMode={darkMode}
      clearAuth={clearAuth}
      successMsg={successMsg}
      errorMsg={errorMsg}
    />
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-[var(--bg)] text-[var(--text)] transition-all duration-300">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--accent)]">
          Family Tasks 🏡
        </h1>
        <p className="text-[var(--text-secondary)]">Stay organized together.</p>
      </header>

      <div className="flex justify-between items-center gap-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl mb-5">
        <button className="flex items-center gap-3 hover:bg-[var(--accent-hover)] hover:text-white font-medium rounded-xl py-2 px-4 transition-all">
          <FaRegUserCircle className="w-8 h-8 text-accent" />
          <p>{user.name}</p>
        </button>

        <div className="flex gap-2">
          <button className=' px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all'>
            <FaRegEye />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className=" px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all"
          >
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>

          <button onClick={() => { clearAuth(); }} className=' px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all'>
            <BiLogOutCircle />
          </button>
        </div>
      </div>

      {successMsg && (
        <p className="text-green-500 text-sm mb-2">{successMsg}</p>
      )}

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
    </div>
  );
}

export default App;
