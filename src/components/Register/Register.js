import Form from "../Form/Form";
import AuthHeader from "../AuthHeader/AuthHeader";

function Register({registrationResult, onRegister}) {
    return (
        <main className="register">
            <>
                <AuthHeader title="Добро пожаловать!" />
                <Form 
                    formId="register"
                    onRegister={onRegister}
                    buttonText="Зарегистрироваться"
                    linkQuestion="Уже зарегистрированы?"
                    link="/signin"
                    linkText="Войти"
                />
                {!registrationResult && <p>Во время регистрации произошла ошибка</p>}
            </>
        </main>
         
    )
}

export default Register;
