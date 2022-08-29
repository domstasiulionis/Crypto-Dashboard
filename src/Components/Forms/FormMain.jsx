import { useContext, useEffect } from "react";
import LoginFormContext from "../../Context/LoginFormContext";

import LoginModal from "./LogIn/LoginModal";
import LogOutModal from "./LogOut/LogOutModal";

const Form = ({ show }) => {
  const { status, setStatus } = useContext(LoginFormContext);

  useEffect(() => {
    sessionStorage.setItem("status", status);
  }, [status]);

  return (
    <div>
      {status ? <LogOutModal show={show} /> : <LoginModal show={show} x />}
    </div>
  );
};

export default Form;
