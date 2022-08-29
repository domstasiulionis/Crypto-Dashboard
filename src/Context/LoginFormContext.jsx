import { createContext, useState } from "react";

const LoginFormContext = createContext();

export function LoginStatusProvider({ children }) {
  const [status, setStatus] = useState(() => sessionStorage.getItem("status"));

  return (
    <LoginFormContext.Provider value={{ status, setStatus }}>
      {children}
    </LoginFormContext.Provider>
  );
}

export default LoginFormContext;
