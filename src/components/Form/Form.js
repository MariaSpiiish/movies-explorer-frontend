import { useHistory } from "react-router-dom";

function Form() {
const history = useHistory();

    return (
        <form className="form">
            {history.location.pathname === '/signup' && 
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
                    />
                </>   
            }
            <span id="name-error" className="name-input-error form__error"></span>
            <label htmlFor="email-input" className="form__label">E-mail</label>
            <input 
                name="email"
                id="email-input"
                type="email"
                required
                placeholder="Email" 
                className="form__input form__input_type_email"
            />
            <span id="email-error" className="email-input-error form__error"></span>
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
            />
            <span id="password-error" className="password-input-error form__input-error"></span>
        </form>

    )
}

export default Form;
