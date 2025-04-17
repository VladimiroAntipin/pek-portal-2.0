'use client'

import styles from './style.module.css';
import FormWrapper from '../../components/FormWrapper/FormWrapper';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/input';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import FormButtons from '../../components/FormButtons/FormButtons';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword, validatePasswordMatch, validateName, validateSurname } from '../../utils/inputsValidation';
import { useAuth } from '../../context/authContext';

const RegisterPage = () => {
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [patronimic, setPatronimic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [surnameError, setSurnameError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const { register, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    const labelDescription = {
        name: 'Имя',
        surname: 'Фамилия',
        patronimic: 'Отчество',
        email: 'Электронная почта',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
    }

    const buttonDescription = {
        blue: 'Зарегистрироваться',
        red: 'Войти'
    }

    const handleInputsChange = (e, field) => {
        const value = e.target.value;
        let setError, setValue, validate;

        switch (field) {
            case 'surname':
                setError = setSurnameError;
                setValue = setSurname;
                validate = () => validateSurname(value);
                break;
            case 'name':
                setError = setNameError;
                setValue = setName;
                validate = () => validateName(value);
                break;
            case 'patronimic':
                setError = null;
                setValue = setPatronimic;
                validate = null;
                break;
            case 'email':
                setError = setEmailError;
                setValue = setEmail;
                validate = () => validateEmail(value);
                break;
            case 'password':
                setError = setPasswordError;
                setValue = setPassword;
                validate = () => validatePassword(value);
                break;
            case 'confirmPassword':
                setError = setConfirmPasswordError;
                setValue = setConfirmPassword;
                validate = () => validatePasswordMatch(password, value);
                break;
            default:
                break;
        }

        if (setValue) {
            setValue(value);
        }

        if (validate) {
            const error = validate();
            if (setError) {
                setError(error);
            }
        }
    }

    useEffect(() => {
        setIsDisabled(
            surnameError !== '' || nameError !== '' || emailError !== '' || passwordError !== '' || confirmPasswordError !== '' ||
            surname === '' || name === '' || email === '' || password === '' || confirmPassword === ''
        );
    }, [surname, name, patronimic, email, password, confirmPassword, surnameError, nameError, emailError, passwordError, confirmPasswordError]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(surname, name, email, password);
            navigate('/login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setEmailError('Пользователь с этой электронной почтой уже существует');
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
          return navigate("/feed");
        }
      }, [isAuthenticated, navigate])

    return (
        <div className={styles.registerPage}>
            <FormWrapper>
                <Form onSubmit={(e) => handleSubmit(e)} >
                    <Input
                        value={surname}
                        labelDescription={labelDescription.surname}
                        onChange={(e) => handleInputsChange(e, 'surname')} />

                    {surnameError && <span className={styles.inputError}>{surnameError}</span>}

                    <Input
                        value={name}
                        labelDescription={labelDescription.name}
                        onChange={(e) => handleInputsChange(e, 'name')} />

                    {nameError && <span className={styles.inputError}>{nameError}</span>}

                    <Input
                        value={patronimic}
                        labelDescription={labelDescription.patronimic}
                        onChange={(e) => handleInputsChange(e, 'patronimic')} />

                    <Input
                        value={email}
                        labelDescription={labelDescription.email}
                        onChange={(e) => handleInputsChange(e, 'email')} />

                    {emailError && <span className={styles.inputError}>{emailError}</span>}

                    <PasswordInput
                        value={password}
                        labelDescription={labelDescription.password}
                        onChange={(e) => handleInputsChange(e, 'password')} />

                    {passwordError && <span className={styles.inputError}>{passwordError}</span>}

                    <PasswordInput
                        value={confirmPassword}
                        labelDescription={labelDescription.confirmPassword}
                        onChange={(e) => handleInputsChange(e, 'confirmPassword')} />

                    {confirmPasswordError && <span className={styles.inputError}>{confirmPasswordError}</span>}

                    <FormButtons buttonDescription={buttonDescription} isDisabled={isDisabled} />
                </Form>
            </FormWrapper>
        </div>
    );
}

export default RegisterPage;