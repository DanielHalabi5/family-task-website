import { FaRegUserCircle, FaCheck, FaTimes } from 'react-icons/fa';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { BiLogOutCircle } from 'react-icons/bi';

export default function JoinRequests({
  user,
  setDarkMode,
  darkMode,
  clearAuth,
  successMsg,
  errorMsg,
  requests = [],
  onApprove,
  onReject,
  onBack
}) {
  async function handleAction(requestId, action) {
    try {
      if (action === 'APPROVE') await onApprove(requestId);
      else await onReject(requestId);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-[var(--bg)] text-[var(--text)] transition-all duration-300">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[var(--accent)]">Join Requests</h1>
        <p className="text-[var(--text-secondary)]">Manage family join requests</p>
      </header>

      <div className="flex justify-between items-center gap-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl mb-5">
        <button className="flex items-center gap-3 hover:bg-[var(--accent-hover)] hover:text-white font-medium rounded-xl py-2 px-4 transition-all">
          <FaRegUserCircle className="w-8 h-8 text-accent" />
          <p>{user?.name || "Guest"}</p>
        </button>

        <div className="flex gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all"
            >
              ← Back
            </button>
          )}

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

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl">
        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((req) => (
              <div
                key={req.id}
                className="flex items-center justify-between p-4 bg-[var(--bg)] rounded-xl border border-[var(--border)]"
              >
                <div>
                  <p className="font-medium text-lg">{req.user?.name || req.user?.email}</p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Requested: {new Date(req.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(req.id, 'APPROVE')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-medium transition-all"
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'REJECT')}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all"
                  >
                    <FaTimes /> Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-[var(--text-secondary)]">No requests yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
