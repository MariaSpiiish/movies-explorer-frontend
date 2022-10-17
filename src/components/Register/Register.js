import Form from "../Form/Form";
import AuthFooter from "../AuthSubmit/AuthSubmit";

function Register() {
    return (
        <main className="register">
            <Form />
            <AuthFooter buttonText="Зарегистрироваться" linkQuestion="Уже зарегистрированы?" link="/signin" linkText="Войти"/>
        </main>
         
    )
}

export default Register;
