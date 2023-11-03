import Box from '@mui/material/Box';
import { LinearProgress, Typography, styled } from '@mui/material';
import { Style } from '../../config/styleConfig';

import PersonIcon from '@mui/icons-material/Person';
import { chatInterface } from '../../interface/Chat';
import { getCharacterImage } from '../../assets/character/Character';

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
    display: 'flex',
    // alignItems: 'center',
    padding: '15px',
    width: '90%',
    maxWidth: '800px'

})

const IconWrapper = styled(Box)({
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
})

const TextAreaWrapper = styled(Box)({
    width: '100%',
    padding: '0px 25px',
})


interface ChatProps extends chatInterface{
    charcher: string,
}

export default function Chat(props: ChatProps) {
    const {createdBy, text, charcher, type} = props;
    const image = getCharacterImage(charcher);
    return (
        <ChatContainer bgcolor={createdBy === 'user' ? Style.primaryColor : Style.secondaryColor}>
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
                <TextAreaWrapper>
                    {type === 'normal' 
                        ? 
                        <Typography sx={{whiteSpace: 'pre-line'}}>{text}</Typography> 
                        : 
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%'}}>
                            <LinearProgress sx={{width: '100%'}}/>
                        </Box>
                    }
                </TextAreaWrapper>
            </ChatInnerContainer>
        </ChatContainer>
    );
}