import logo from '../../images/logo.svg';

function AuthHeader({ title }) {
    return (
        <header className="auth-header">
            <img className="auth-header__logo" src={logo} alt="Логотип"/>
            <h1 className="auth-header__title">{title}</h1>
        </header>

    )
}

export default AuthHeader;
