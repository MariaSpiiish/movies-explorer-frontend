import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import menu from '../../images/menu-icon.svg';

function Header({ onMenu }) {
        return (
            <header className="header">
                <img className="header__logo" src={logo} alt="Логотип"/>
                <nav className="header__links-container">
                    <div className="header__movie-links">
                        <Link to="/movies" className="header__button opacity">Фильмы</Link>
                        <Link to="/saved-movies" className="header__button opacity">Сохраненные фильмы</Link>
                    </div>
                    <div className="header__profile-link opacity">
                        <Link to="/profile" className="header__button">Аккаунт</Link>
                        <Link to="/profile" className="header__profile-icon"></Link>
                    </div>
                </nav>
                <nav className="header__menu-toggle">
                    <img className="header__toggle-image" src={menu} alt="Иконка открытия меню" onClick={onMenu}/>
                </nav>
            </header>
        );
    
}

export default Header;
