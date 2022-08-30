import { createContext, useState, useEffect } from "react";

const LoginFormContext = createContext();

export function LoginStatusProvider({ children }) {
  const [status, setStatus] = useState(false);

  return (
    <LoginFormContext.Provider value={{ status, setStatus }}>
      {children}
    </LoginFormContext.Provider>
  );
}

export default LoginFormContext;
