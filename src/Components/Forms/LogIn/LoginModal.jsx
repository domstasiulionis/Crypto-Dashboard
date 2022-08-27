import { useState } from "react";
import SignUpModal from "../SignUp/SignUpModal";

import "./LoginModal.scss";

import { MdOutlineClose } from "react-icons/md";

const SignModal = ({ show }) => {
  const [changeToSignUp, setchangeToSignUp] = useState(false);

  return (
    <>
      {!changeToSignUp ? (
        <div className="modal">
          <div className="modal-overlay" onClick={show} />
          <div className="modal-con">
            <div className="modal-con-content">
              <form>
                <div className="close-icon" onClick={show}>
                  <MdOutlineClose size={30} />
                </div>
                <h2 className="login-title">
                  <span className="welcome-highlight">WELCOME</span> BACK
                </h2>
                <div className="modal-form-elements">
                  <label className="modal-form-elements__label">
                    Email Address
                  </label>
                  <input type="email" />
                </div>
                <div className="modal-form-elements">
                  <label className="modal-form-elements__label">Password</label>
                  <input type="password" />
                </div>
                <div className="modal-form-elements">
                  <button className="modal-form-elements__login-btn">
                    Log in
                  </button>
                </div>
                <div className="modal-form-elements">
                  <p
                    className="modal-form-elements__sign-up-text"
                    onClick={() => setchangeToSignUp(true)}
                  >
                    Don't have an account?
                    <span className="signup-highlight"> Sign Up!</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <SignUpModal show={show} />
      )}
    </>
  );
};

export default SignModal;
