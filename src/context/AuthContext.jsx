import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial auth state
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

// Create the context
const AuthContext = createContext();

// Auth reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
      
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
      
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
      
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
      
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
      
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      };
      
    default:
      return state;
  }
};

// Provider component
export const AuthProvider = ({ children }) => {
  // In a real app, you'd check for a token in localStorage
  // and validate it with your backend
  const savedUser = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null;
    
  const [state, dispatch] = useReducer(authReducer, {
    ...initialState,
    user: savedUser,
    isAuthenticated: Boolean(savedUser),
    loading: savedUser,
  });
  
  // For this example, we'll simulate authentication
  // In a real app, you would make API calls to your backend
  
  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo only - replace with actual API call
      if (email === 'user@example.com' && password === 'password') {
        const user = { id: 1, name: 'Demo User', email };
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGIN_FAIL', payload: 'Invalid credentials' });
      }
    } catch (error) {
      dispatch({ type: 'AUTH_ERROR', payload: error.message });
    }
  };
  
  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo only - replace with actual API call
      const user = { id: Date.now(), name, email };
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'REGISTER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.message });
    }
  };
  
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };
  
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};