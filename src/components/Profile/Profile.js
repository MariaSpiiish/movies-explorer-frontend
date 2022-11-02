import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function Profile({ onUpdateUser, isEditUserSuccessful, isEditUserFail, onLogout }) {
    const currentUser = useContext(CurrentUserContext);
    const { values, setValues, handleChange, errors, isValid, setIsValid } = useFormWithValidation();

    useEffect(() => {
        setValues(currentUser);
        setIsValid(true);
      }, [currentUser, setValues, setIsValid]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(values.name, values.email);
    }

    function handleExitClick(e) {
        e.preventDefault();
        onLogout();
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
                        onChange={handleChange}
                        value={values.name || ''}
                        autoComplete="off"
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
                        pattern="\S+@\S+\.\S+"
                        onChange={handleChange}
                        value={values.email || ''}
                        autoComplete="off"
                    />
                </div>
                <span className="email-input-error form__error">{errors.email}</span>

                {isEditUserSuccessful && <p>Данные успешно обновлены.</p>}
                {isEditUserFail && <p>Произошла ошибка. Попробуйте еще раз.</p>}
                <div className="profile__buttons">
                    <button 
                        type="submit" 
                        disabled={(values.name === currentUser.name && values.email === currentUser.email) || !isValid}
                        className={(isValid && (values.name !== currentUser.name || values.email !== currentUser.email))
                            ? "profile__edit-button profile__edit-button_type_active"
                            : "profile__edit-button"}
                    >Редактировать</button>
                    <button type="button" onClick={handleExitClick} className="profile__exit-link opacity">Выйти из аккаунта</button>
                </div>
            </form>
        </main>
    )
}

export default Profile;
