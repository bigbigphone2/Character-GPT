import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, Divider, IconButton, List, Typography, styled } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import logo from '../../assets/chatgpt.svg'

import { Style } from '../../config/styleConfig';
import { topicsInterface } from '../../interface/Chat';
import { AppStateInterface, useAppState } from '../../Context/AppContext';
import { getCharacterImage } from '../../assets/character/Character';

const SideBarContainer = styled(Box)({
    width: Style.drawerWidth,
    height: '100vh',
    backgroundColor: Style.mainBlack,
})

const LogoContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: '20px'
})

const ButtonContainer = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    
})

const StyledButton = styled(Button)({
    border: `1px solid ${Style.mainGrey}`,
    color: Style.primaryColor,
    margin: '2px',
})

interface StyledSideBarProps{
}

export default function StyledSideBar(props: StyledSideBarProps) {
    const appState = useAppState().appState;
    const {topics, currentTopicKey} = appState;
    const updateAppState = useAppState().setAppState;

    const handleOnClickNewChat = () => {
        updateAppState({...appState, isOpenNewChatForm: true} as AppStateInterface);
    };

    const handleOnClickTopic = (topic: string) => {
        updateAppState({...appState, currentTopicKey: topic} as AppStateInterface);
    };

    return (
        <SideBarContainer>
            <LogoContainer>
                <img
                    src={logo}
                    alt={'logo'}
                    width='30px'
                    height='30px'
                    loading="lazy"
                />
                <Typography ml={1} fontSize={20}>
                    CharacterGPT
                </Typography>
            </LogoContainer>
            <ButtonContainer>
                <StyledButton sx={{width: '65%'}} onClick={()=>handleOnClickNewChat()}>
                    <AddIcon/>
                    <Typography>New Chat</Typography>
                </StyledButton>
            </ButtonContainer>
            <List>
            {Object.entries(topics).map(([name, content]) => {
                const isSelected = currentTopicKey === name;
                const color = isSelected ? Style.primaryColor : Style.mainLightGrey;
                return (
                    <ListItem key={name} disablePadding>
                        <ListItemButton onClick={()=> handleOnClickTopic(name)} style={{ border: '1px solid', margin: '5%', borderRadius: '5px', borderColor: color}}>
                            <ListItemIcon>
                                <ChatBubbleOutlineIcon style={{color: color, fontWeight: 'bold' }}/>
                            </ListItemIcon>
                            <ListItemText primary={<Typography style={{color: color,  fontWeight: 'bold' }}>{name}</Typography>}/>
                            <img
                                src={getCharacterImage(content["botCharacter"])}
                                alt={content["botCharacter"]}
                                width='30px'
                                height='30px'
                                loading="lazy"
                            />
                        </ListItemButton>
                    </ListItem>
                )
            })}
            </List>
        </SideBarContainer>
    );
}