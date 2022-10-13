import AuthFooter from "../AuthFooter/AuthFooter";
import AuthHeader from "../AuthHeader/AuthHeader";
import Form from "../Form/Form";

function Login() {
    return (
        <div className="login">
            <AuthHeader title="Рады видеть!"/>
            <Form />
            <AuthFooter buttonText="Войти" linkQuestion="Ещё не зарегистрированы?" link="/signup" linkText="Регистрация"/>
        </div>
    )
}

export default Login;
