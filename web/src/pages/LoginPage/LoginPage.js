import React, {useState} from 'react';
import S from './LoginPage.styled';
import Input from '../../components/Common/UI-Components/Controls/Input/Input';
import Button from '../../components/Common/UI-Components/Controls/Button/Button';

const LoginPage = () => {
    const [fields, setFields] = useState({login: '', password: ''});

    const onChange = (key, value) => {
      setFields({
          ...fields,
          [key]: value
      })
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
                <Button role="primary">Вход</Button>
            </S.FormBlock>
        </S.Wrapper>
    )
};

export default LoginPage;