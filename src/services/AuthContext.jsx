import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Initialize isLoggedIn state with the value from local storage if available
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
  });

  // Initialize user state with the value from local storage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Effect to update isLoggedIn and user states in response to local storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false);

      const storedUser = localStorage.getItem('user');
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    // Listen for changes to isLoggedIn and user in local storage
    window.addEventListener('storage', handleStorageChange);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = (userDetails) => {
    // Perform login logic
    // For example, validate credentials

    // If login is successful:
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userDetails));
    setUser(userDetails);
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', JSON.stringify(false));
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
