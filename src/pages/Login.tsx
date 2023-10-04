import React, { useRef } from 'react';
import { useAuth } from '../utils/AuthProvider';

export default function Login() {
  //   const inputRef = useRef<HTMLFormElement>(null);

  //   const submitHandler = (
  //     e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  //   ) => {
  //     e.preventDefault();
  //     inputRef.current?.reset();
  //     alert('Submitted');
  //   };

  //   const clearHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     e.preventDefault();
  //     inputRef.current?.reset();
  //     console.log('Cleared');
  //   };
  const { onLogin } = useAuth();

  return (
    <div>
      <h2>Login</h2>

      <button type="button" onClick={onLogin}>
        Sign In
      </button>

      {/* <form ref={inputRef}>
        <h1>Username</h1>
        <input type="text" placeholder="username"></input>
        <h1>Password</h1>
        <input type="password" placeholder="password"></input>
        <button onClick={(e) => submitHandler(e)}>Submit</button>
        <button onClick={(e) => clearHandler(e)}>Clear</button>
      </form> */}
    </div>
  );
}
