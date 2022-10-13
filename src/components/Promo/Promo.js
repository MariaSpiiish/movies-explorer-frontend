import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Promo() {
    return (
        <>
            <header className="promo-header">
                <img className="promo-header__logo" src={logo} alt="Логотип"/>
                <ul className="promo-header__links-container">
                    <li><Link to="/signup" className="promo-header__button opacity">Регистрация</Link></li>
                    <li><Link to="/signin" className="promo-header__button promo-header__button_type_active opacity">Войти</Link></li>
                </ul>
            </header>
            <div className="promo">
                <h1 className="promo__title">Учебный проект студента факультета Веб-разработки</h1>
            </div>
        </>
    );
}

export default Promo;
