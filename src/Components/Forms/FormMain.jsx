import { useContext, useEffect, useState } from "react";
import LoginFormContext from "../../Context/LoginFormContext";

import LoginModal from "./LogIn/LoginModal";
import LogOutModal from "./LogOut/LogOutModal";

const Form = ({ show }) => {
  const { status, setStatus } = useContext(LoginFormContext);

  return (
    <div>
      {status ? <LogOutModal show={show} /> : <LoginModal show={show} />}
    </div>
  );
};

export default Form;
