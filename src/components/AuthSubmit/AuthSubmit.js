import { Link } from "react-router-dom";

function AuthSubmit({ buttonText, linkText, link, linkQuestion }) {
    return (
        <section className="auth-submit">
            <button type="submit" className="auth-submit__button opacity">{buttonText}</button>
            <div className="auth-submit__link-container">
                <p className="auth-submit__link-text">{linkQuestion}</p>
                <Link to={link} className="auth-submit__link opacity">{linkText}</Link>
            </div>

        </section>

    )
}

export default AuthSubmit;
