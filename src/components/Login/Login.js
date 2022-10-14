import Form from "../Form/Form";
import AuthFooter from "../AuthSubmit/AuthSubmit";

function Login() {
    return (
        <main className="login">
            <Form />
            <AuthFooter buttonText="Войти" linkQuestion="Ещё не зарегистрированы?" link="/signup" linkText="Регистрация"/>
        </main>
    )
}

export default Login;
