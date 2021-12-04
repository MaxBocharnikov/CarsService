import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import S from './LoginPage.styled';
import Input from '../../components/Common/UI-Components/Controls/Input/Input';
import Button from '../../components/Common/UI-Components/Controls/Button/Button';
import AuthApi from '../../components/Common/AuthApi';
import UsersApi from '../../services/api/users';

const LoginPage = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState({login: '', password: ''});

    const onChange = (key, value) => {
      setFields({
          ...fields,
          [key]: value
      })
    };

    const authApi = useContext(AuthApi);

    const onLogin = async (e) => {
        e.preventDefault();
        try {
            await UsersApi.login(fields);
            authApi.setAuth(true);
            navigate('/');
        } catch(e) {
            console.log(e.response);
            if (e.response.status === 403) {
                alert('Неправильный логин или пароль');
            } else {
                alert('Something went wrong');
            }
        }
    };

    return (
        <S.Wrapper>
            <S.Header>Авторизация</S.Header>
            <S.FormBlock>
                <Input
                    width="100%"
                    placeholder="Логин"
                    fields={fields.login}
                    onChange={(val) => onChange('login', val)}
                />
                <Input
                    width="100%"
                    placeholder="Пароль"
                    fields={fields.password}
                    type='password'
                    onChange={(val) => onChange('password', val)}
                />
                <Button type="submit" onClick={onLogin} role="primary">Вход</Button>
            </S.FormBlock>
        </S.Wrapper>
    )
};

export default LoginPage;