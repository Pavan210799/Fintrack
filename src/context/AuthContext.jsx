import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext();

const AUTH_KEY = 'fintrack-auth';
const USER_KEY = 'fintrack-user';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  useEffect(() => {
    const auth = localStorage.getItem(AUTH_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (auth && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const signup = (userData) => {
    const existingUser =
      localStorage.getItem(USER_KEY);

    if (existingUser) {
      const parsed = JSON.parse(existingUser);

      if (parsed.email === userData.email) {
        return {
          success: false,
          message: 'Email already registered',
        };
      }
    }

    const newUser = {
      id: `user_${Date.now()}`,
      displayName:
        userData.displayName ||
        `${userData.firstName} ${userData.lastName}`,
      cards: [],
      createdAt: new Date().toISOString(),
      ...userData,
    };

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(newUser)
    );

    return {
      success: true,
      message:
        'Account created successfully. Please sign in.',
    };
  };

  const login = (email, password) => {
    const savedUser =
      localStorage.getItem(USER_KEY);

    if (!savedUser) {
      return {
        success: false,
        message: 'Account not found',
      };
    }

    const parsedUser = JSON.parse(savedUser);

    if (
      parsedUser.email !== email ||
      parsedUser.password !== password
    ) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        isAuthenticated: true,
        userId: parsedUser.id,
        loginTime: new Date().toISOString(),
      })
    );

    setUser(parsedUser);
    setIsAuthenticated(true);

    return {
      success: true,
      message: `Welcome back, ${parsedUser.firstName}!`,
    };
  };

  const updateProfile = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
      displayName:
        updatedData.displayName ||
        user.displayName ||
        `${updatedData.firstName || user.firstName} ${
          updatedData.lastName || user.lastName
        }`,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      USER_KEY,
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    return {
      success: true,
      message: 'Profile updated successfully',
    };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        signup,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);