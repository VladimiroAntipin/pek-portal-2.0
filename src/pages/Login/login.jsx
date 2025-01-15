import Form from '../../components/Form/Form';
import FormButtons from '../../components/FormButtons/FormButtons';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import styles from './styles.module.css';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Input from '../../components/Input/input';
import { useState, useEffect } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const labelDescription = {
        email: 'Электронная почта',
        password: 'Пароль'
    }

    const buttonDescription = {
        blue: 'Войти',
        red: 'Зарегистрироваться'
    }

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            return 'Поле электронной почты не может быть пустым';
        } else if (!emailRegex.test(email)) {
            return 'Не валидный формат Email';
        } else {
            return '';
        }
    }

    const validatePassword = (password) => {
        const passwordRegex = /.{4,}/;
        if (!password) {
            return 'Поле пароля не может быть пустым';
        } else if (!passwordRegex.test(password)) {
            return 'Пароль должен быть длиной не менее 4 симболов';
        }
        else {
            return '';
        }
    };

    const handleEmailChange = (event) => {
        const email = event.target.value;
        setEmail(email);
        const error = validateEmail(email);
        setEmailError(error);
    }


    const handlePasswordChange = (event) => {
        const password = event.target.value;
        setPassword(password);
        const error = validatePassword(password);
        setPasswordError(error);
    }

    useEffect(() => {
        setIsDisabled(emailError !== '' || passwordError !== '' || email === '' || password === '');
    }, [emailError, passwordError, email, password]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const emailValidationError = validateEmail(email);
        const passwordValidationError = validatePassword(password);

        setEmailError(emailValidationError);
        setPasswordError(passwordValidationError);

        // TODO: send the request to the server to log in
    }

    return (
        <div className={styles.loginPage}>
            <FormWrapper>
                <Form onSubmit={handleSubmit}>
                    <Input value={email} onChange={handleEmailChange} labelDescription={labelDescription.email}/>
                    {emailError && <span className={styles.inputError}>{emailError}</span>}
                    <PasswordInput value={password} onChange={handlePasswordChange} labelDescription={labelDescription.password} />
                    {passwordError && <span className={styles.inputError}>{passwordError}</span>}
                    <FormButtons buttonDescription={buttonDescription} isDisabled={isDisabled} />
                </Form>
            </FormWrapper>
        </div>
    );
}

export default LoginPage;