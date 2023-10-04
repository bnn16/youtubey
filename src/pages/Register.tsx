import React, { useRef, useState } from 'react';
import { useAuth } from '../utils/AuthProvider';
import { useNavigate } from 'react-router-dom';
import PasswordChecklist from 'react-password-checklist';

function Register(): JSX.Element {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const firstNameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [matchPassword, setMatchPassword] = useState('');

  const { onRegister } = useAuth();

  const [errMsg, setErrMsg] = useState<any>('');
  let navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    let username = usernameInputRef.current?.value ?? '';
    let email = emailInputRef.current?.value ?? '';
    let pwd = password;
    let name = firstNameInputRef.current?.value ?? '';

    if (!username || !email || !pwd || !name) {
      setErrMsg('Please fill out all fields');
      return;
    }

    interface UserData {
      username: string;
      firstName: string;
      email: string;
      password: string;
      role: string;
    }

    const data: UserData = {
      username: username,
      firstName: name,
      email: email,
      password: pwd,
      role: 'user',
    };

    try {
      await onRegister(data).then((successful) => {
        if (successful) {
          navigate('/login');
        }
      });
      // Registration was successful redirect to another page.
    } catch (error) {
      setPassword('');
      setMatchPassword('');
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
          Create an <span className="text-red-500">account</span>
        </h1>
        {errMsg ? (
          <h2 className="text-xl font-bold text-center text-red-600">
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
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              ref={usernameInputRef}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              First Name
            </label>
            <input
              ref={firstNameInputRef}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
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
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>
            <input
              onChange={(e) => setMatchPassword(e.target.value)}
              value={matchPassword}
              type="password"
              className="block w-full px-4 py-2 mt-2 mb-10 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <PasswordChecklist
            rules={['capital', 'match', 'specialChar', 'minLength', 'number']}
            minLength={8}
            value={password}
            valueAgain={matchPassword}
          />
          <div className="mt-6">
            <button className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-zinc-600 focus:outline-none ">
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-2 text-xs text-center text-gray-700">
          {' '}
          Already a member?{' '}
          <a
            href="/login"
            className="font-medium text-gray-600 hover:underline"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
