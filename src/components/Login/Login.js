import Form from "../Form/Form";
import AuthHeader from "../AuthHeader/AuthHeader";

function Login({ registrationResult, onLogin }) {
    return (
        <main className="login">
            <>
                <AuthHeader title="Рады видеть!"/>
                <Form 
                    onLogin={onLogin}
                    registrationResult={registrationResult}
                    formId="login"
                    buttonText="Войти"
                    linkQuestion="Ещё не зарегистрированы?"
                    link="/signup"
                    linkText="Регистрация"
                />
            </>
        </main>
    )
}

export default Login;
