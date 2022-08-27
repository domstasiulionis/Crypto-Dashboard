import { useState } from "react";
import LoginModal from "./LogIn/LoginModal";
import LogOutModal from "./LogOut/LogOutModal";

const Form = ({ show }) => {
  const [dummySignedIn, setdummySignedIn] = useState(false);

  return (
    <div>
      {dummySignedIn ? <LogOutModal show={show} /> : <LoginModal show={show} />}
    </div>
  );
};

export default Form;
