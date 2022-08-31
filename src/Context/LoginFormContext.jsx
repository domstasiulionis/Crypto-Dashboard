import { createContext, useState, useEffect } from "react";

const LoginFormContext = createContext();

export function LoginStatusProvider({ children }) {
  const [status, setStatus] = useState(
    () => localStorage.getItem("status") || "check"
  );

  useEffect(() => {
    localStorage.setItem("status", status);
  }, [status]);

  // useEffect(() => {
  //   const data = localStorage.getItem("status");
  //   if (data !== null) setStatus(JSON.parse(data));
  // }, []);

  return (
    <LoginFormContext.Provider value={{ status, setStatus }}>
      {children}
    </LoginFormContext.Provider>
  );
}

export default LoginFormContext;
