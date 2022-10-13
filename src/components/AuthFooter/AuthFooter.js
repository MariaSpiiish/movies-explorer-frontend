import { Link } from "react-router-dom";

function AuthFooter({ buttonText, linkText, link, linkQuestion }) {
    return (
        <section className="auth-footer">
            <button type="submit" className="auth-footer__button opacity">{buttonText}</button>
            <div className="auth-footer__link-container">
                <p className="auth-footer__link-text">{linkQuestion}</p>
                <Link to={link} className="auth-footer__link opacity">{linkText}</Link>
            </div>

        </section>

    )
}

export default AuthFooter;
