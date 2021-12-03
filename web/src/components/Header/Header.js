import React from 'react';
import { NavLink } from "react-router-dom";
import S from './Header.styled';

const Header = () => {
    if (window.location.pathname === '/login') return null;
    return (
        <S._Header>
            <NavLink activeClassName="active" to="/">Календарь</NavLink>
            <NavLink activeClassName="active" to="/applications">Заявки</NavLink>
            <NavLink activeClassName="active" to="/orders">Заказ наряд</NavLink>
            <NavLink activeClassName="active" to="/parts">Запчасти</NavLink>
            <NavLink activeClassName="active" to="/clients">Контрагенты</NavLink>
            <NavLink activeClassName="active" to="/trailers">ТС</NavLink>
            <NavLink activeClassName="active" to="/works">Работы</NavLink>
        </S._Header>
    )
};

export default React.memo(Header);