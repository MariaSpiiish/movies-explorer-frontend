import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import AuthSubmit from "../AuthSubmit/AuthSubmit";

function Form({ onRegister, formId, onLogin, registrationResult, buttonText, linkQuestion, link, linkText }) {
    const { values, errors, isValid, handleChange, resetForm, setIsValid } = useFormWithValidation();
    const location = useLocation();

    function handleSubmit(e) {
        e.preventDefault();
        setIsValid(false);
        location.pathname === '/signup' 
            ? onRegister(values.name, values.email, values.password)
            : onLogin(values.email, values.password)
    }

    useEffect(() => {
        resetForm();
    }, [resetForm])

    return (
        <section>
            <form id={formId} className="form" onSubmit={handleSubmit}>
                {location.pathname === '/signup' && 
                    <>
                        <label htmlFor="name-input" className="form__label">Имя</label>
                        <input 
                            name="name"
                            id="name-input"
                            type="text"
                            minLength="2"
                            maxLength="40"
                            required
                            placeholder="Имя"
                            className="form__input form__input_type_name"
                            values={values.name || ''}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                    </>   
                }
                <span id="name-error" className="name-input-error form__error">{errors.name}</span>
                <label htmlFor="email-input" className="form__label">E-mail</label>
                <input 
                    name="email"
                    id="email-input"
                    type="email"
                    required
                    placeholder="Email"
                    pattern="\S+@\S+\.\S+"
                    className="form__input form__input_type_email"
                    values={values.email || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <span id="email-error" className="email-input-error form__error">{errors.email}</span>
                <label htmlFor="password-input" className="form__label">Пароль</label>
                <input 
                    name="password"
                    id="password-input" 
                    type="password" 
                    required
                    minLength="8"
                    maxLength="30"
                    placeholder="Пароль" 
                    className="form__input form__input_type_password"
                    values={values.password || ''}
                    onChange={handleChange}
                    autoComplete="off"
                />
                <span id="password-error" className="password-input-error form__error">{errors.password}</span>
            </form>
            {<p className="form__registration-error">{registrationResult}</p>}
            <AuthSubmit isValid={isValid} formId={formId} buttonText={buttonText} linkQuestion={linkQuestion} link={link} linkText={linkText}/>
        </section>

    )
}

export default Form;
