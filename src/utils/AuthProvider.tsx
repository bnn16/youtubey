import axios, { AxiosError } from 'axios';
import * as React from 'react';
// import { useEffect } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Config } from '../constants/config';

interface AuthContextType {
  token: string | null;
  onRegister: (data: UserData) => Promise<any>;
  onLogin: (data: LoginData) => void;
  onLogout: () => void;
}
interface UserData {
  username: string;
  firstName: string;
  email: string;
  password: string;
  role: string;
}
interface LoginData {
  email: string;
  password: string;
}

const fakeAuth = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | null>(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken ? storedToken : null;
  });

  const handleRegister = async (data: UserData) => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/rest/auth/register`,
        data,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      return response.data; // You can return some data if needed
    } catch (err) {
      if (!axios.isAxiosError(err)) {
        throw new Error('No Server Response');
      } else if ((err as AxiosError).response?.status === 409) {
        throw new Error('Email/Username is already taken');
      } else {
        throw new Error('Registration Failed');
      }
    }
  };

  const handleLogin = (data: LoginData) => {
    fakeAuth().then((token) => {
      //add token to local storage
      localStorage.setItem('token', token);
      setToken(token);
      const origin = location.state?.from?.pathname || '/';
      navigate(origin);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  //TODO: Create a endpoint to check token validity/heartbeat
  // useEffect(() => {
  //   const checkTokenValidity = async () => {
  //     if (token) {
  //       try {
  //         //make API request to check token validity
  //         const response = await fetch('/api/check-token-validity', {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //         if (!response.ok) {
  //           //log user out if token is invalid
  //           handleLogout();
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };
  //   checkTokenValidity();
  // }, [token]);
  const value = React.useMemo(
    () => ({
      token,
      onRegister: handleRegister,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export { AuthProvider, useAuth, ProtectedRoute };
