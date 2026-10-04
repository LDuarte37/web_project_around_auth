import { Link, useLocation } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation();

  function renderHeaderAction() {
    if (loggedIn) {
      return (
        <div className="header__user">
          <span className="header__email">{email}</span>
          <button
            className="header__logout"
            type="button"
            onClick={onSignOut}
          >
            Cerrar sesión
          </button>
        </div>
      );
    }

    if (location.pathname === "/signup") {
      return (
        <Link className="header__link" to="/signin">
          Iniciar sesión
        </Link>
      );
    }

    if (location.pathname === "/signin") {
      return (
        <Link className="header__link" to="/signup">
          Regístrate
        </Link>
      );
    }

    return null;
  }

  return (
    <header className="header">
      <div className="header__top">
        <img
          src={logo}
          alt="Around the U.S. logo"
          className="header__logo"
        />

        {renderHeaderAction()}
      </div>

      <hr className="header__divider" />
    </header>
  );
}

export default Header;