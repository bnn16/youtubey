import * as React from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

const fakeAuth = () =>
  new Promise<string>((resolve) => {
    setTimeout(() => resolve('2342f2f1d131rf12'), 250);
  });

const AuthContext = React.createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [token, setToken] = React.useState<string | null>(null);

  const handleLogin = () => {
    fakeAuth().then((token) => {
      setToken(token);
      navigate('/', { replace: true });
    });
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = React.useMemo(
    () => ({
      token,
      onLogin: handleLogin,
      onLogout: handleLogout,
    }),
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
