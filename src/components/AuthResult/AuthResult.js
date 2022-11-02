import InfoToolTip from "../InfoToolTip/InfoToolTip";
import successIcon from "../../images/tick-icon.svg";
import failureIcon from "../../images/cross-icon.svg";
import { useHistory } from "react-router-dom";

function AuthResult({isSuccessful, onClose, isOpen}) {
    const history = useHistory();

    
if(isSuccessful) {
    return (
        <InfoToolTip 
            onClose={onClose}
            isOpen={isOpen}
            title='Вы успешно зарегистрировались!'
            icon={successIcon}
            iconAlt='Галочка'
        />
    )
} else {
    return (
        <InfoToolTip 
            onClose={onClose}
            isOpen={isOpen}
            title='Что-то пошло не так! Попробуйте ещё раз.'
            icon={failureIcon}
            iconAlt='Крестик'
        />
    )
}
}

export default AuthResult;