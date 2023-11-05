import Box from '@mui/material/Box';
import { Button, Grid, LinearProgress, Typography, styled } from '@mui/material';
import { Style } from '../../config/styleConfig';

import PersonIcon from '@mui/icons-material/Person';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DoneIcon from '@mui/icons-material/Done';
import { chatInterface } from '../../interface/Chat';
import { getCharacterImage } from '../../assets/character/Character';
import StyledButton from '../template/StyledButton';

const ChatContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    borderBottom: `0.5px solid ${Style.mainGrey}`,
})


const ChatInnerContainer = styled(Box)({
    maxWidth: '800px',
    display: 'flex',
    padding: '15px',
    width: '90%',
})

const IconWrapper = styled(Box)({
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const ContentWrapper = styled(Grid)({
})

const TextAreaWrapper = styled(Grid)({
    width: '100%',
    padding: '0px 25px',
})

const FuctionButtonContainer = styled(Grid)({
    // padding: '25px',
})

const FunctionButton = styled(Button)({
    color: Style.mainBlack,
    maxWidth: '10px',
    maxHeight: '10px', 
    minWidth: '10px', 
    minHeight: '10px'
})

interface ChatProps extends chatInterface{
    charcher: string,
}

export default function Chat(props: ChatProps) {
    const {createdBy, text, charcher, type} = props;
    const image = getCharacterImage(charcher);

    const handleCopyToClipboard = ()=> {
        navigator.clipboard.writeText(text);
    }
    return (
        <ChatContainer bgcolor={createdBy === 'user' ? Style.primaryColor : Style.secondaryColor} >
                <ChatInnerContainer>
                    <IconWrapper>
                        <img
                            src={image}
                            alt={charcher}
                            width='50px'
                            height='50px'
                            loading="lazy"
                        />
                    </IconWrapper>
                    <ContentWrapper container>
                        <TextAreaWrapper item xs={12} md={11}>
                            {type === 'normal' 
                                ? 
                                <Typography sx={{whiteSpace: 'pre-line'}}>{text}</Typography> 
                                : 
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                                    <LinearProgress sx={{width: '100%'}}/>
                                </Box>
                            }
                        </TextAreaWrapper>
                        <FuctionButtonContainer item xs={12} md={1} padding={{xs: '15px 25px', md: '0px'}}>
                            <StyledButton onClick={()=>handleCopyToClipboard()}>
                                <ContentPasteIcon style={{fontSize: '20px'}}/>
                            </StyledButton>
                        </FuctionButtonContainer>
                    </ContentWrapper>
                </ChatInnerContainer>
        </ChatContainer>
    );
}