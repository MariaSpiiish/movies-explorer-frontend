import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import AuthSubmit from "../AuthSubmit/AuthSubmit";

function Form({ onRegister, formId, onLogin, registrationResult, buttonText, linkQuestion, link, linkText }) {
    const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        history.location.pathname === '/signup' 
            ? onRegister(values)
            : onLogin(values)
    }

    useEffect(() => {
        resetForm();
    }, [resetForm])

    return (
        <section>
            <form id={formId} className="form" onSubmit={handleSubmit}>
                {history.location.pathname === '/signup' && 
                    <>
                        <label htmlFor="name-input" className="form__label">Имя</label>
                        <input 
                            name="name"
                            id="name-input"
                            type="text"
                            minLength="2"
                            maxLength="40"
                            pattern="[A-zА-я\s\-]/gi"
                            title="Имя может состоять только из латиницы, кириллицы, пробела или дефиса"
                            required
                            placeholder="Имя"
                            className="form__input form__input_type_name"
                            values={values.name || ''}
                            onChange={handleChange}
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
                    className="form__input form__input_type_email"
                    values={values.email || ''}
                    onChange={handleChange}
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
                />
                <span id="password-error" className="password-input-error form__error">{errors.password}</span>
            </form>
            <AuthSubmit isValid={isValid} formId={formId} buttonText={buttonText} linkQuestion={linkQuestion} link={link} linkText={linkText}/>
        </section>

    )
}

export default Form;
