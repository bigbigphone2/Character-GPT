
import { Button, Snackbar, styled } from '@mui/material';
import { useAppState } from '../../Context/AppContext';
import { Style } from '../../config/styleConfig';
import { ReactElement, useEffect, useState } from 'react';

import DoneIcon from '@mui/icons-material/Done';

const FunctionButton = styled(Button)({
    color: Style.mainBlack,
    maxWidth: '15px',
    maxHeight: '15px', 
    minWidth: '15px', 
    minHeight: '15px'
})

interface StyledButtonInterface{
    children: ReactElement,
    onClick: any

}

// this button will show done icon after clicking it
export default function StyledButton({children, onClick}: StyledButtonInterface) {

    const updateAppState = useAppState().setAppState;

    const [isShowDoneIcon, setIsShowDoneIcon] = useState<boolean>(false);

    const handleOnClick = () => {
        setIsShowDoneIcon(true);
        onClick();
        setInterval(()=> setIsShowDoneIcon(false), 1000);
    }

    // useEffect(()=>{
        
    // }, )
    return (
        <FunctionButton variant="text" onClick={()=>handleOnClick()}>
            { !isShowDoneIcon ? 
                children
                : 
                <DoneIcon style={{fontSize: '20px'}}/>
            }

        </FunctionButton>
    )
}
