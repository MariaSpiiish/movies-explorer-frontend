import { Link } from 'react-router-dom';

function Profile() {
    return (
        <main className="profile">
            <h1 className="profile__title">Привет, Мария!</h1>
            <div className="profile__info-container">
                <div className="profile__info-field">
                    <p className="profile__info-content">Имя</p>
                    <p className="profile__info-content">Мария</p>
                </div>
                <div className="profile__info-field">
                    <p className="profile__info-content">E-mail</p>
                    <p className="profile__info-content">test@test.com</p>
                </div>
                <div className="profile__buttons">
                    <button type="button" className="profile__edit-button opacity">Редактировать</button>
                    <Link to="/" className="profile__link-back opacity">Выйти из аккаунта</Link>
                </div>
            </div>
        </main>
    )
}

export default Profile;
