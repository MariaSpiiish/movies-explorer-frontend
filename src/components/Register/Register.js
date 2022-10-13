import AuthFooter from "../AuthFooter/AuthFooter";
import AuthHeader from "../AuthHeader/AuthHeader";
import Form from "../Form/Form";

function Register() {
    return (
        <div className="register">
            <AuthHeader title="Добро пожаловать!" />
            <Form />
            <AuthFooter buttonText="Зарегистрироваться" linkQuestion="Уже зарегистрированы?" link="/signin" linkText="Войти"/>
        </div>
         
    )
}

export default Register;
