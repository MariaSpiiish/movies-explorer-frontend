import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function AuthHeader({ title }) {
    return (
        <header className="auth-header">
            <Link to="/"><img className="auth-header__logo" src={logo} alt="Логотип"/></Link>
            <h1 className="auth-header__title">{title}</h1>
        </header>

    )
}

export default AuthHeader;
