import { UserAuth } from "../../../Context/AuthContext";
import { useContext } from "react";
import LoginFormContext from "../../../Context/LoginFormContext";

import "./LogOutModal.scss";

import { MdOutlineClose } from "react-icons/md";

const SignModal = ({ show }) => {
  const { user, logout } = UserAuth();
  const { setStatus } = useContext(LoginFormContext);

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
    <div className="modal-logout">
      <div className="modal-logout-overlay" onClick={show} />
      <div className="modal-logout-con">
        <div className="modal-logout-con-content-logout">
          <form>
            <div className="close-icon-logout" onClick={show}>
              <MdOutlineClose size={30} />
            </div>
            <div className="modal-logout-form-elements-header">
              <h2 className="modal-logout-form-elements-header__title">
                Logged in
              </h2>
              <p className="modal-logout-form-elements-header__email">
                {user?.email === "" ? "Loading..." : user?.email}
              </p>
            </div>
            <div className="modal-logout-form-elements">
              <button
                onClick={handleSignOut}
                className="modal-logout-form-elements__logout-btn"
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
