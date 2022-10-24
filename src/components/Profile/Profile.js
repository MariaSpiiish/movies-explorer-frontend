import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Profile({ onUpdateUser, isEditUserSuccessful, isEditUserFail, userEmail, userName }) {
    const currentUser = useContext(CurrentUserContext);
    const history = useHistory();
    const { values, handleChange, errors, isValid } = useFormWithValidation();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        values.name = currentUser.name;
        values.email = currentUser.email;
      }, [currentUser]); 

    function handleSubmit(e) {
        e.preventDefault();
        
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser(values);
        setIsActive(false);
    }

    function checkNameValue(e) {
        handleChange(e);
        if (values.name !== currentUser.name) {
            setIsActive(true);
        }
    }

    function checkEmailValue(e) {
        handleChange(e);
        if (values.email !== currentUser.email) {
            setIsActive(true);
        }
    }

    function handleExitClick() {
        localStorage.removeItem('token');
        history.push("/");
    }
    

    return (
        <main className="profile">
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <form className="profile__info-container" onSubmit={handleSubmit} noValidate>
                <div className="profile__info-field">
                    <p className="profile__info-content">Имя</p>
                    <input 
                        className="profile__info-content profile__input"
                        type="text"
                        required
                        minLength="2"
                        maxLength="40"
                        placeholder="Имя"
                        name="name"
                        onChange={checkNameValue}
                        value={values.name || userName}
                    />
                </div>
                <span className="name-input-error form__error">{errors.name}</span>
                <div className="profile__info-field">
                    <p className="profile__info-content">E-mail</p>
                    <input 
                        className="profile__info-content profile__input"
                        type="email"
                        required
                        minLength="2"
                        maxLength="40"
                        placeholder="Email"
                        name="email"
                        onChange={checkEmailValue}
                        value={values.email || userEmail}
                    />
                </div>
                <span className="email-input-error form__error">{errors.email}</span>

                {isEditUserSuccessful && <p>Данные успешно обновлены.</p>}
                {isEditUserFail && <p>Произошла ошибка. Попробуйте еще раз.</p>}
                <div className="profile__buttons">
                    <button type="submit" disabled={(!isValid && isActive === false) && true} className={(!isValid && isActive === false) ? "profile__edit-button" : "profile__edit-button profile__edit-button_type_active"}>Редактировать</button>
                    <button type="button" onClick={handleExitClick} className="profile__exit-link opacity">Выйти из аккаунта</button>
                </div>
            </form>
        </main>
    )
}

export default Profile;
