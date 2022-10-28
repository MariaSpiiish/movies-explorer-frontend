import { Link, NavLink, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menu from '../../images/menu-icon.svg';

function Header({ onMenu, isLoggedIn }) {
    const location = useLocation();

    const linkClassName = (location.pathname === '/' ? "header__button header__button_dark opacity" : "header__button opacity");
    const style = (isActive) => ({fontWeight: isActive ? "500" : "400"});

    return (
        <header className={location.pathname === '/' ? "header header_dark" : "header"}>
            <Link to="/"><img className="header__logo" src={logo} alt="Логотип"/></Link>
            
            {!isLoggedIn 
                ? <nav className="promo-header__links-container">
                    <Link to="/signup" className="promo-header__button opacity">Регистрация</Link>
                    <Link to="/signin" className="promo-header__button promo-header__button_type_main opacity">Войти</Link>
                </nav>
                : <>
                    <nav className="header__links-container">
                    <div className="header__movie-links">
                        <NavLink to="/movies" className={linkClassName} style={style}>Фильмы</NavLink>
                        <NavLink to="/saved-movies" className={linkClassName} style={style}>Сохраненные фильмы</NavLink>
                    </div>
                    <div className="header__profile-link opacity">
                        <NavLink to="/profile" className={linkClassName} style={style}>Аккаунт</NavLink>
                        <NavLink to="/profile" className="header__profile-icon" style={style}></NavLink>
                    </div>
                    </nav>
                    <nav className="header__menu-toggle">
                        <img className="header__toggle-image" src={menu} alt="Иконка открытия меню" onClick={onMenu}/>
                    </nav>
                </>
            }
        </header>
    );
    
}

export default Header;
