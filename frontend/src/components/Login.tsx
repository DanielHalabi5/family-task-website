import { useState } from 'react';

type Props = {
    onLogin: (email: string, password: string) => void;
    switchToSignup: () => void;
    errorMsg: string
}

export default function Login({ onLogin, switchToSignup, errorMsg }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='flex flex-col justify-center mx-auto my-5 bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-xl p-6 w-full max-w-2xl'>
            <h2 className='text-4xl font-bold text-[var(--accent)] mb-10 mx-auto'>Login</h2>

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
                    type="password"
                    autocomplete="current-password"
                    value={password}
                    id='password-input'
                    onChange={e => setPassword(e.target.value)}
                    className='w-full px-4 py-3 mb-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] focus:ring-2 focus:ring-[var(--accent)] outline-none transition' />
            </div>

            {errorMsg && (
                <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
            )}


            <button className='mt-5 px-4 py-2 mx-auto rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all'

                onClick={() => onLogin({ email, password })}>
                Login
            </button>
            <p className='mx-auto'>
                Don't have an account? <button onClick={switchToSignup} className='mt-10 px-4 py-2 rounded-full bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] text-white font-medium transition-all'>Sign up</button>
            </p>
        </div>
    );
}