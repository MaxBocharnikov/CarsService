import React from 'react';
import { Button } from 'antd';
import S from './Header.styled';

const Header = ({onChangeDate}) => {
    return (
        <S._Header>
            <Button
                type="primary"
                onClick={() => onChangeDate(null)}
            >
                Change Date
            </Button>
        </S._Header>
    )
};

export default React.memo(Header);