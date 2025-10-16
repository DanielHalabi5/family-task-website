import type { userType } from "../stores/authStore"
import { FaRegUserCircle } from 'react-icons/fa';

type Props = {
  user: userType
  setDarkMode: (val: boolean) => void,
  darkMode: boolean,
}

const Home = ({ user, setDarkMode
  , darkMode }: Props) => {
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

        <button
          onClick={() => setDarkMode(!darkMode)}
          className=" px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all"
        >
          {darkMode ? "Light" : "Dark"} 
        </button>
      </div>
      {/* {successMsg && (
        <p className="text-green-500 text-sm mb-2">{successMsg}</p>
      )} */}

      <div className="flex flex-col gap-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <div className="">

          <input
            type="text"
            placeholder="Create a Family Ground"
            className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
          />
          <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95">
            Create
          </button>
        </div>

        <div className="">
          <input
            type="text"
            placeholder="Join a Family Group"
            className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
          />
          <button className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95">
            Join
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home