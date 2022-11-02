import { NavLink } from "react-router-dom";

function Navigation({onClose, isOpen}) {
    
    return (
        <div className={isOpen ? "navigation navigation_opened" : "navigation"}>
            <nav className="navigation__links-container">
                <button type="button" className="navigation__close-button" onClick={onClose}></button>
                <div className="navigation__links">
                    <NavLink to="/" className="navigation__button opacity" onClick={onClose} >Главная</NavLink>
                    <NavLink to="/movies" className="navigation__button opacity" onClick={onClose} >Фильмы</NavLink>
                    <NavLink to="/saved-movies" className="navigation__button opacity" onClick={onClose} >Сохраненные фильмы</NavLink>
                </div>
                <div className="navigation__profile-link opacity">
                    <NavLink to="/profile" className="navigation__button" onClick={onClose} >Аккаунт</NavLink>
                    <NavLink to="/profile" className="navigation__profile-icon" onClick={onClose} ></NavLink>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;
