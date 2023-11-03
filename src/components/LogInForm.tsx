
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { useAppState } from '../Context/AppContext';
import { useState } from 'react';
import { topicInterface } from '../interface/Chat';
import styled from '@emotion/styled';
import { Box, Button, InputBase, TextField } from '@mui/material';
import { Style } from '../config/styleConfig';

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const LogInFormContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px 25px'
})

const TextContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0px'
})

const Title = styled(Typography)({
    fontSize: '25px', 
    fontWeight: 'bold'
})

const SubTitle = styled(Typography)({
    fontSize: '15px', 
    color: Style.mainGrey,
    marginTop: '5px'
    // fontWeight: 'bold'
})

const TextFieldCointainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // margin: '15px',
    width: '60%',
    color: Style.mainGrey,
    borderBottom: `1px solid ${Style.secondaryColor}`,
})

const StyledInputBase = styled(InputBase)({
    width: '80%'
})

const initialTopic = {
    botCharacter: 'bot',
    userCharacter: 'user',
    history: [],
    time: new Date().getTime().toString()
};

export default function LogInForm() {
    const appState = useAppState().appState;
    const setAppState = useAppState().setAppState;
    const {isOpenLogInForm} = appState;
    const [newApiKey, setNewApiKey] = useState<string>('');

    const validation = () => {
        if (! newApiKey)
            return {isValid: false , message: "Please insert a API key !"};
        return {isValid: true, message: ''};
    }

    const handleClose = () => {
        setAppState({...appState, isOpenLogInForm: false});
        handleResetForm();
    };

    const handleSubmit = () => {
        const {isValid, message} = validation();
        if (! isValid){
            setAppState({...appState, isOpenAlert: {
                isOpen: true,
                type: 'error',
                content: message
            }})
            return;
        }
        setAppState({...appState, isOpenLogInForm: false, apiKey: newApiKey});
        handleResetForm();
    };

    const handleResetForm = () => {
        setNewApiKey('');
    }

    return (
        <Dialog onClose={handleClose} open={isOpenLogInForm}>
            <LogInFormContainer>
                <TextContainer>
                    <Title>Insert your own API key</Title>
                </TextContainer>
                <TextContainer>
                    <SubTitle>Help the developer to save some money.</SubTitle>
                </TextContainer>
                <TextFieldCointainer>
                    <StyledInputBase
                        value = {newApiKey}
                        onChange={(e)=>setNewApiKey(e.target.value)}
                    />
                    <Button onClick={()=>handleSubmit()}>
                        <ArrowCircleRightIcon sx={{color: Style.mainGreen}}/>
                    </Button>
                </TextFieldCointainer>
                <Button onClick={()=>handleClose()} sx={{marginTop: '15px'}}>
                    <Typography sx={{fontSize: '13px', borderBottom: `1px solid ${Style.secondaryColor}`, color: `${Style.secondaryColor}`}}>Skip</Typography>
                </Button>
            </LogInFormContainer>
        </Dialog>
);
}