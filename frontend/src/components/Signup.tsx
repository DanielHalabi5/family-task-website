import { useState } from 'react';

type Props = {
  onSignup: (email: string, password: string) => void;
  switchToLogin: () => void;
  errorMsg: string


}

export default function Signup({ onSignup, switchToLogin, errorMsg }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='flex flex-col justify-center mx-auto my-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl'>
      <h2 className='text-4xl font-bold text-[var(--accent)] mb-10 mx-auto'>Sign up</h2>
      <div className="">
        <label
          htmlFor="name-input"
          className='text-[var(--text-secondary)] pl-3'
        >
          Enter Your Name:
        </label>
        <input
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          id='name-input'
          className='w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition' />
      </div>
      <div>
        <label
          htmlFor="email-input"
          className='text-[var(--text-secondary)] pl-3'
        >Enter Your Email:</label>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          id='email-input'
          className='w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition' />
      </div>
      <div>
        <label
          htmlFor="password-input"
          className='text-[var(--text-secondary)] pl-3'
        >Enter Your Password:</label>
        <input
          placeholder="Password"

          type="password" value={password}
          id='password-input'
          onChange={e => setPassword(e.target.value)}
          className='w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition' />
      </div>

      {errorMsg && (
        <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
      )}

      <button
        className='mt-5 px-4 py-2 mx-auto rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all'
        onClick={() => onSignup({ email, password, name })}>
        Create account
      </button>
      <p className='mx-auto'>
        Have an account? <button className='mt-10 px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all ' onClick={switchToLogin}>Login</button>
      </p>
    </div>
  );
}