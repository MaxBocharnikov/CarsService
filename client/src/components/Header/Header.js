import React, {useContext, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import S from './Header.styled';
import AuthApi from '../Common/AuthApi';
import UsersApi from '../../services/api/users';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const authApi = useContext(AuthApi);

    const logOut = async () => {
        try {
              await UsersApi.logout();
              authApi.setAuth(false);
              navigate('/login');
        } catch(e) {
            alert('Something went wrong');
        }
    };

    if (location.pathname === '/login') return null;
    return (
        <S._Header>
            <NavLink activeClassName="active" to="/">Календарь</NavLink>
            <NavLink activeClassName="active" to="/applications">Заявки</NavLink>
            <NavLink activeClassName="active" to="/orders">Заказ наряд</NavLink>
            <NavLink activeClassName="active" to="/parts">Запчасти</NavLink>
            <NavLink activeClassName="active" to="/clients">Контрагенты</NavLink>
            <NavLink activeClassName="active" to="/trailers">ТС</NavLink>
            <NavLink activeClassName="active" to="/works">Работы</NavLink>
            <a onClick={logOut}>Выход</a>
        </S._Header>
    )
};

export default React.memo(Header);