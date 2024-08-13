import { useState, useEffect, useRef } from 'react';

import AlertIcon from '../assets/icons/alerterror.svg?react'
import * as S from "../styles/index.style";


const Alert = ({onClose}) => {
    const [isVisible, setIsVisible] = useState(true);
    const alertRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (alertRef.current && !alertRef.current.contains(event.target)) {
        setIsVisible(false);
        setTimeout(onClose, 300);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
    }, [onClose]);

    if (!isVisible) return null;

    return (
    <S.alert.AlertOverlay>
        <S.alert.AlertContent ref={alertRef}>
            <S.alert.AlertIconBox>
                <AlertIcon/>
            </S.alert.AlertIconBox>
            <S.alert.AlertTitle>삭제하시겠습니까?</S.alert.AlertTitle>
            <S.alert.AlertMessage>삭제한 게시글은 되돌릴 수 없습니다.</S.alert.AlertMessage>
            <S.alert.AlertButtonSet>
                <S.alert.AlertCancelButton>Cancel</S.alert.AlertCancelButton>
                <S.alert.AlertDeleteButton>Delete</S.alert.AlertDeleteButton>
            </S.alert.AlertButtonSet>
        </S.alert.AlertContent>
    </S.alert.AlertOverlay>
    );
};

export default Alert;

