import { Link } from "react-router-dom";

function Navigation({onClose, isOpen}) {
    
    return (
        <div className={isOpen ? "navigation navigation_opened" : "navigation"}>
            <nav className="navigation__links-container">
                <button type="button" className="navigation__close-button" onClick={onClose}></button>
                <div className="navigation__links">
                    <Link to="/" className="navigation__button" onClick={onClose}>Главная</Link>
                    <Link to="/movies" className="navigation__button opacity" onClick={onClose}>Фильмы</Link>
                    <Link to="/saved-movies" className="navigation__button opacity" onClick={onClose}>Сохраненные фильмы</Link>
                </div>
                <div className="navigation__profile-link opacity">
                    <Link to="/profile" className="navigation__button" onClick={onClose}>Аккаунт</Link>
                    <Link to="/profile" className="navigation__profile-icon" onClick={onClose}></Link>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;
