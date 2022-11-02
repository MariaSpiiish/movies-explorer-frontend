import { Link } from "react-router-dom";

function AuthSubmit({ buttonText, linkText, link, linkQuestion, formId, isValid }) {
    return (
        <section className="auth-submit">
            <button type="submit" form={formId} disabled={!isValid && true} className={!isValid ? "auth-submit__button auth-submit__button_type_disabled" : "auth-submit__button opacity"}>{buttonText}</button>
            <div className="auth-submit__link-container">
                <p className="auth-submit__link-text">{linkQuestion}</p>
                <Link to={link} className="auth-submit__link opacity">{linkText}</Link>
            </div>

        </section>

    )
}

export default AuthSubmit;
