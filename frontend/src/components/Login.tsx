import  { useState } from 'react';

type Props =  {
    onLogin: (email: string, password: string) => void;
    switchToSignup: () => void;
}

export default function Login({ onLogin, switchToSignup }: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='bg-white flex flex-col items-center gap-5 max-w-[420px] my-20 mx-auto p-3 border-3 border-white rounded-xl shadow-md'>
            <h2 className='text-2xl font-bold text-black text-shadow-lg'>Login</h2>
            <div>
                <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
                    className='border-2 rounded-xl pl-2 focus:outline-blue-300' />
            </div>
            <div>
                <input className='border-2 rounded-xl pl-2 focus:outline-blue-300'
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>
            <button className='bg-blue-600 px-5 py-1 rounded-xl hover:bg-blue-300 text-white'
                onClick={() => onLogin({ email, password })}>
                Login
            </button>
            <p>
                Don't have an account? <button onClick={switchToSignup} className='text-pink-300 hover:text-pink-200 '>Sign up</button>
            </p>
        </div>
    );
}