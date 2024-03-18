import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Path from "../../paths.js";
import * as authService from "../services/authService.js";
import usePersistedState from "../hooks/usePersistedSate.js";

const AuthContext = createContext();

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = usePersistedState("auth", {});

  const checkAndSetAuth = async () => {
    const accessToken = localStorage.getItem("token");

    if (accessToken) {
      try {
        console.log("Found accessToken in localStorage:", accessToken);

        const user = await authService.validateToken(accessToken);

        if (user && user.accessToken) {
          console.log("Validated token. Setting auth:", user);
          setAuth({ ...user, accessToken });
        } else {
          console.error(
            "Invalid user or accessToken. Clearing localStorage and resetting auth state:",
            user
          );
          localStorage.removeItem("accessToken");
          setAuth({});
        }
      } catch (error) {
        console.error("Error validating token:", error);
        localStorage.removeItem("accessToken");
        setAuth({});
      }
    } else {
      console.error("No accessToken found in localStorage. Resetting auth state.");
      setAuth({});
    }
  };

  useEffect(() => {
    checkAndSetAuth();
  }, []); 

  const loginSubmitHandler = async (values) => {
    try {
      const result = await authService.login(values.email, values.password);
      console.log('Token received during login:', result.accessToken);
      setAuth(result);
      localStorage.setItem('accessToken', result.accessToken);
      navigate(Path.Home);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const registerSubmitHandler = async (values) => {
    try {
      const result = await authService.register(
        values.email,
        values.username,
        values.password
      );
      setAuth(result);
      localStorage.setItem("accessToken", result.token);
      navigate(Path.Home);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logoutHandler = async () => {
    try {
      await authService.logout();
      setAuth({});
      localStorage.removeItem("accessToken");
      navigate(Path.Home);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const values = {
    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    username: auth.username || auth.email,
    email: auth.email,
    userId: auth.userId,
    isAuthenticated: !!auth.accessToken,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
