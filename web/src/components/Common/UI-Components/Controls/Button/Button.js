import React from 'react';
import S from './Button.styled';
import colors from '../../../../../constants/styles/colors';

const getStyles = role => {
    switch (role) {
        case 'primary':
            return {
              background: colors.purple,
              border: `1px solid ${colors.purple}`,
              color: colors.white,
            };

        default:
            return {
                background: colors.white,
                border: `1px solid ${colors.black}`,
                color: colors.black,
            };
    }
};

const Button = ({
    children,
    onClick,
    type,
    role,
    disabled,
    className,
}) => {

    const styles = getStyles(role);

    return (
       <S.StyledButton
           type={type || 'button'}
           onClick={onClick}
           styles={styles}
           disabled={disabled}
           className={className}
       >
           {children}
       </S.StyledButton>
    )
};

export default Button;