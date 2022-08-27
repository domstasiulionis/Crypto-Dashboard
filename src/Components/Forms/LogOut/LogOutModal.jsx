import "./LogOutModal.scss";

import { MdOutlineClose } from "react-icons/md";

const SignModal = ({ show }) => {
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
                Email@email.com
              </p>
            </div>
            <div className="modal-form-elements">
              <button className="modal-form-elements__logout-btn">
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
