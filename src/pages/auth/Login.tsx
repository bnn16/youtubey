import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthProvider';

function Login() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');

  const { onLogin } = useAuth();

  const [errMsg, setErrMsg] = useState<any>('');
  let navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    let email = emailInputRef.current?.value ?? '';
    let pwd = password;

    if (!email || !pwd) {
      setErrMsg('Please fill out all fields');
      return;
    }

    interface LoginData {
      email: string;
      password: string;
    }

    const data: LoginData = {
      email: email,
      password: pwd,
    };

    try {
      await onLogin(data).then((successful) => {
        if (successful) {
          navigate('/');
        }
      });
    } catch (error) {
      setPassword('');
      setErrMsg((error as Error).message);
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-200 border border-gray lg:max-w-xl">
        <img
          className="w-20 h-20 mx-auto hover:cursor-pointer"
          onClick={() => {
            navigate('/');
          }}
          src="https://media.onlinejobs.ph/employer_logos/615548/70b1fba89cfaa8abe47abbe755e0f11f.png"
          alt="logo"
        ></img>
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Login to your <span className="text-red-500">account</span>
        </h1>
        {errMsg ? (
          <h2 className="text-xl font-bold text-center text-red-500">
            {errMsg}
          </h2>
        ) : null}
        <form
          className="mt-6"
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-zinc-600 focus:outline-none ">
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-2 text-xs text-center text-gray-700">
          {' '}
          Not a member?{' '}
          <a
            href="/register"
            className="font-medium text-gray-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
