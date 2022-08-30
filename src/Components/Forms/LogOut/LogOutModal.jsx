import { UserAuth } from "../../../Context/AuthContext";
import { useContext } from "react";
import LoginFormContext from "../../../Context/LoginFormContext";

import "./LogOutModal.scss";

import { MdOutlineClose } from "react-icons/md";

const SignModal = ({ show }) => {
  const { user, logout } = UserAuth();
  const { status, setStatus } = useContext(LoginFormContext);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await logout();
      show();
      setStatus(false);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-overlay" onClick={show} />
      <div className="modal-con">
        <div className="modal-con-content-logout">
          <form>
            <div className="close-icon" onClick={show}>
              <MdOutlineClose size={30} />
            </div>
            <div className="modal-form-elements-header">
              <h2 className="modal-form-elements-header__title">Logged in</h2>
              <p className="modal-form-elements-header__email">
                {user?.email === "" ? "Loading..." : user?.email}
              </p>
            </div>
            <div className="modal-form-elements">
              <button
                onClick={handleSignOut}
                className="modal-form-elements__logout-btn"
              >
                Log out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignModal;
