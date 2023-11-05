
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';
import { useAppState } from '../Context/AppContext';
import { useState } from 'react';
import { topicInterface } from '../interface/Chat';
import styled from '@emotion/styled';
import { CharacterList, SpecialCharacterList } from '../assets/character/Character';
import { Box, Button, Divider, InputBase, TextField } from '@mui/material';
import { Style } from '../config/styleConfig';

import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CancelIcon from '@mui/icons-material/Cancel';

const CharacterContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexWrap: 'wrap',
    maxWidth: '500px',
    // margin: '15px'
    
})

const TextContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '15px 0px'
})

const Title = styled(Typography)({
    fontSize: '30px', 
    fontWeight: 'bold'
})

const SubTitle = styled(Typography)({
    fontSize: '20px', 
    color: Style.mainDarkGrey,
    marginTop: '5px'
    // fontWeight: 'bold'
})

const ImageContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '38%',
    // widht: '30%',
    padding: '2.5px',
    margin: '5px',
    borderRadius: '5px',
    '&:hover': {
        backgroundColor: Style.secondaryColor
    }
})

const CharacterName = styled(Typography)({
    textTransform: 'capitalize'
})

const CustomCharacterContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: '15px',
    width: '100%',
})

const TextFieldCointainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // margin: '15px',
    width: '100%',
    color: Style.mainGrey,
})

const StyledInputBase = styled(InputBase)({
    borderBottom: `1px solid ${Style.mainGrey}`,
    width: '40%',
    textAlign: 'center',
    '& input': {
      textAlign: 'center',
    },
})

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: '15px',
})

const initialTopic = {
    botCharacter: 'bot',
    userCharacter: 'user',
    history: [],
    time: new Date().getTime().toString()
};

export default function NewChatForm() {
    const appState = useAppState().appState;
    const setAppState = useAppState().setAppState;
    const {isOpenNewChatForm, topics} = appState;
    const [customCharacterName, setCustomCharacterName] = useState<string>('custom');
    const [newTopicName, setNewTopicName] = useState<string>('');
    const [newTopic, setNewTopic] = useState<topicInterface>(initialTopic);

    const validation = () => {
        if (! newTopic.botCharacter)
            return {isValid: false , message: "Please select the character !"};
        if (newTopic.botCharacter === 'custom' && !customCharacterName)
            return {isValid: false , message: "Please fill the name for custom character !"};
        if (! newTopicName)
            return {isValid: false , message: "Please give a new to the Chat !"};
        return {isValid: true, message: ''};
    }

    const handleClose = () => {
        setAppState({...appState, isOpenNewChatForm: false});
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
        // for custom topic
        let updateTopic = newTopic;
        if (newTopic.botCharacter === 'custom'){
            updateTopic = {...newTopic, botCharacter: customCharacterName};
            setNewTopic(updateTopic);
        }

        let newTopics = topics;
        newTopics[newTopicName] = updateTopic;
        setAppState({...appState, currentTopicKey: newTopicName, isOpenNewChatForm: false, topics: newTopics});
        handleResetForm();

    };

    const handleResetForm = () => {
        setNewTopicName('');
        setCustomCharacterName('custom')
        setNewTopic(initialTopic);
    }


    const formattedName = (name: string) => {
        return name.replaceAll('_', ' ');
    }

    return (
            <Dialog onClose={handleClose} open={isOpenNewChatForm}>
                <TextContainer>
                    <Title>Create a New Chat</Title>
                    <SubTitle>1. Select your GPT character</SubTitle>
                </TextContainer>

                <CharacterContainer>
                {Object.entries(CharacterList).map(([key, image], index) => (
                    <ImageContainer
                        key={index}
                        onClick={(e)=>setNewTopic({...newTopic, botCharacter: key})}
                        sx={{border: newTopic['botCharacter'] === key ? `3px solid ${Style.mainGreen}` : 'transparent'}}
                    >
                        <img
                            src={image}
                            alt={key}
                            width='60px'
                            height='60px'
                            loading="lazy"
                        />
                        <CharacterName>{formattedName(key)}</CharacterName>
                    </ImageContainer>
                ))}
                </CharacterContainer>
                <TextContainer>
                    <Divider sx={{color: Style.mainLightGrey, width: '80%'}}>Or</Divider>
                </TextContainer>
                <CustomCharacterContainer>
                    <ImageContainer
                        onClick={(e)=>setNewTopic({...newTopic, botCharacter: 'custom'})}
                        sx={{border: ! (newTopic['botCharacter'] in CharacterList) ? `3px solid ${Style.mainGreen}` : 'transparent'}}
                    >
                        <img
                            src={SpecialCharacterList['custom']}
                            alt={'custom'}
                            width='60px'
                            height='60px'
                            loading="lazy"
                        />
                        <StyledInputBase
                            value = {customCharacterName}
                            onChange={(e)=>setCustomCharacterName(e.target.value)}
                        />
                    </ImageContainer>

                </CustomCharacterContainer>
                {/* Step 2 */}
                <TextFieldCointainer>
                    <TextContainer>
                        <SubTitle>2. Give the Chat a Name</SubTitle>
                    </TextContainer>
                    <StyledInputBase
                        value = {newTopicName}
                        onChange={(e)=>setNewTopicName(e.target.value)}
                    />
                </TextFieldCointainer>
                <ButtonContainer>
                    <Button onClick={()=>handleClose()}>
                        <CancelIcon sx={{color: Style.mainRed}}/>
                    </Button>
                    <Button onClick={()=>handleSubmit()}>
                        <DoneOutlineIcon sx={{color: Style.mainGreen}}/>
                    </Button>
                </ButtonContainer>
            </Dialog>
    );
}