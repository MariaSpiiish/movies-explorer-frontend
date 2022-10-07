import logo from '../../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип"/>
            <ul className="header__links-container">
                <li><button className="header__button opacity">Регистрация</button></li>
                <li><button className="header__button header__button_type_active opacity">Войти</button></li>
            </ul>
        </header>
    );
}

export default Header;
