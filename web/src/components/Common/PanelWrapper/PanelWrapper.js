import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import S from './PanelWrapper.styled';
import Button from '../UI-Components/Controls/Button/Button';
import CloseIcon from '../UI-Components/Icons/CloseIcon';

const PanelWrapper = ({
    title,
    onClose,
    btnArray,
    isFullScreen,
    isOutlineHandlerDisable,
    children,
    zIndex,
    isPrint
}) => {
    return (
        <>
            <S.Overlay/>
            <OutsideClickHandler
                onOutsideClick={onClose}
                disabled={isOutlineHandlerDisable}
            >
                <S.Wrapper isFullScreen={isFullScreen} zIndex={zIndex}>
                    <S.Title>{title}</S.Title>
                    {isFullScreen && !isPrint && <S.CloseIconWrapper onClick={onClose}>
                        <CloseIcon/>
                    </S.CloseIconWrapper> }
                    <S.Content>{children}</S.Content>
                    <S.Footer isFullScreen={isFullScreen} >
                        {btnArray.map(b => (
                            <Button
                                key={b.id}
                                onClick={b.onClick}
                                type={b.type || 'button'}
                                role={b.role}
                                disabled={b.disabled}
                            >
                                {b.text}
                            </Button>
                        ))}
                    </S.Footer>
                </S.Wrapper>
            </OutsideClickHandler>
        </>
    )
};

export default React.memo(PanelWrapper);

