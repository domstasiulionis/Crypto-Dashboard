import { useState } from "react";
import LoginModal from "../LogIn/LoginModal";

import "./SignUpModal.scss";

import { MdOutlineClose } from "react-icons/md";

const SignUpModal = ({ show }) => {
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
                <h2 className="signup-title">SIGN UP</h2>
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
                  <button className="modal-form-elements__signup-btn">
                    Sign up
                  </button>
                </div>
                <div className="modal-form-elements">
                  <p
                    className="modal-form-elements__sign-up-text"
                    onClick={() => setchangeToSignUp(true)}
                  >
                    Already have an account?
                    <span className="signup-highlight"> Log in!</span>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <LoginModal show={show} />
      )}
    </>
  );
};

export default SignUpModal;
