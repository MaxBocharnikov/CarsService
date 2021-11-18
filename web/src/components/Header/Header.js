import React from 'react';
import { Link } from "react-router-dom";
import S from './Header.styled';

const Header = () => {
    return (
        <S._Header>
            <Link to="#">Календарь</Link>
            <Link to="#">Заявки</Link>
            <Link to="#">Заказ наряд</Link>
            <Link to="#">Запчасти</Link>
            <Link to="#">Контрагенты</Link>
            <Link to="#">ТС</Link>
        </S._Header>
    )
};

export default React.memo(Header);