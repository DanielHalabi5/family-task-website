import { useState } from 'react';

type Props =  {
    onSignup: (email: string, password: string) => void;
    switchToLogin: () => void;
}

export default function Signup({ onSignup, switchToLogin }:Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='bg-white flex flex-col items-center gap-5 max-w-[420px] my-20 mx-auto p-3 border-3 border-white rounded-xl shadow-md'>
      <h2 className='text-2xl font-bold text-black text-shadow-lg'>Sign up</h2>
      <div>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className='border-2 rounded-xl pl-2 focus:outline-blue-300' />
      </div>
      <div>
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className='border-2 rounded-xl pl-2 focus:outline-blue-300' />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className='border-2 rounded-xl pl-2 focus:outline-blue-300' />
      </div>
      <button className='bg-blue-600 px-5 py-1 rounded-xl hover:bg-blue-300 text-white' onClick={() => onSignup({ email, password, name })}>Create account</button>
      <p>
        Have an account? <button className='text-pink-300 hover:text-pink-200 ' onClick={switchToLogin}>Login</button>
      </p>
    </div>
  );
}