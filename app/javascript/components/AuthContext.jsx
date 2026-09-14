import React from "react";
import axios from "axios";

// Create context
const AuthContext = React.createContext();

// Custom hook to use auth
export const useAuth = () => React.useContext(AuthContext);

// AuthProvider component to wrap around the app
export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Check if user is logged in on mount
  React.useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      // Fetch user data from /auth/me
      axios.get('/auth/me')
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem('jwtToken');
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login function 
  const login = (email, password) => {
    return axios.post('/auth/sign_in', { user: { email, password } })
      .then(response => {
        const { user, token } = response.data;
        localStorage.setItem('jwtToken', token);
        setUser(user);
        return response;
      });
  };

  // Register function 
  const register = (userData) => {
    return axios.post('/auth/register', { user: userData })
      .then(response => {
        const { user, token } = response.data;
        localStorage.setItem('jwtToken', token);
        setUser(user);
        return response;
      });
  };

  // Logout function 
  const logout = () => {
    return axios.delete('/auth/sign_out')
      .then(() => {
        localStorage.removeItem('jwtToken');
        setUser(null);
      });
  };

  const value = { user, login, register, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};