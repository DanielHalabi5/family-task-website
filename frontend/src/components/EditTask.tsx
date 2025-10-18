import { useState } from 'react';
import { FaRegUserCircle, FaRegEye } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';

export default function EditTask({
  user,
  onCreate,
  setDarkMode,
  darkMode,
  clearAuth,
  successMsg,
  errorMsg,
  familyMembers,
  onViewRequests,
}) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  const submit = async () => {
    if (!title.trim()) return alert('Title required');
    if (!date) return alert('Please select a due date');


    const isoDate = new Date(date).toISOString();

    await onCreate({
      title,
      content,
      dueDate: isoDate,
      assignedTo: assignedTo ? Number(assignedTo) : null,
    });

    setTitle('');
    setContent('');
    setDate('');
    setAssignedTo('');
  };


  // if(isDashboard){
  //   return <Dashboard />
  // }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-[var(--bg)] text-[var(--text)] transition-all duration-300">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--accent)]">Family Tasks 🏡</h1>
        <p className="text-[var(--text-secondary)]">Stay organized together.</p>
      </header>

      <div className="flex justify-between items-center gap-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl mb-5">
        <button className="flex items-center gap-3 hover:bg-[var(--accent-hover)] hover:text-white font-medium rounded-xl py-2 px-4 transition-all">
          <FaRegUserCircle className="w-8 h-8 text-accent" />
          <p>{user?.name || "Guest"}</p>
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => onViewRequests?.()}
            className="px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all"
            title="View pending join requests"
          >            <FaRegEye />
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all"
          >
            {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
          </button>

          <button
            onClick={clearAuth}
            className="px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all"
          >
            <BiLogOutCircle />
          </button>
        </div>
      </div>

      {successMsg && <p className="text-green-500 text-sm mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-500 text-sm mb-2">{errorMsg}</p>}

      {/* Form */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <input
          type="text"
          value={title}
          placeholder="Add a new task..."
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
        />

        <div className="flex gap-5">
          <textarea
            placeholder="Add a Task Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={1}
            className="w-1/2 px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-1/2 px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
          />
        </div>

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition"
        >
          <option value="">Assign to family member</option>
          {familyMembers.map((member) => (
            <option key={member.id} value={member.id}>
              {member.name}
            </option>
          ))}
        </select>

        <button
          onClick={submit}
          className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-medium rounded-xl py-3 transition-all active:scale-95"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
