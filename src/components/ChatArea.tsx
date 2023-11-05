import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Divider, List, Typography, styled } from '@mui/material';

import { Style } from '../config/styleConfig';
import Chat from './utils/Chat';
import OpenAI from 'openai';
import { OpenAIConfig } from '../config/openaiConfig';
import { chatInterface } from '../interface/Chat';
import StyledTextField from './template/StyledTextField';
import { useAppState } from '../Context/AppContext';
import { openAiMessageConverter, sendMsgToOpenAI } from '../utils/OpenAI';

const textFieldHeight = '100px';

const ChatAreaContainer = styled(Box)({
    backgroundColor: Style.primaryColor,
    width: '100%',
    // height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
})

const ChatAreaInnerContainer = styled(Box)({
    width: '100%',
    height: `calc(100% - ${textFieldHeight})`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'auto',
    // border: '2px solid red'


})

const TextFieldAreaContainer = styled(Box)({
    width: '100%',
    height: textFieldHeight,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '10px'
})

const Hint = styled(Typography)({
    fontSize: '11px',
    paddingTop: '10px',
    textAlign: 'center'
})

interface ChatAreaProps{
    openai: OpenAI,
    appBarHeight: number
}

export default function ChatArea(props: ChatAreaProps) {
    const {openai, appBarHeight} = props;
    const appState = useAppState().appState;
    const setAppState = useAppState().setAppState;
    const {userCharacter, botCharacter, history} = appState.topics[appState.currentTopicKey];

    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [apiResponse, setApiResponse] = useState("");

    const handleSetChatHistory = (newHistory: chatInterface[]) => {
        let newTopics = appState.topics;
        newTopics[appState.currentTopicKey]['history'] = newHistory;
        setAppState({...appState, topics: newTopics});
    };

    const handleScrollToBottom = ()=> {
        if (! chatContainerRef.current)
            return;
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    const handleAddUserChat = (content: string) : chatInterface[] => {
        const newChat = [{
            createdBy: 'user',
            text: content,
            type: 'normal',
            tokens: 0
        }] as chatInterface[];
        const newChatHistory = history.concat(newChat);
        handleSetChatHistory(newChatHistory);
        return newChatHistory;
    };

    const handleAddBotChat = async (content: string, history: chatInterface[])=> {
        const loadingChat = [{
            createdBy: 'bot',
            text: '',
            type: 'loading',
            tokens: 0
        }] as chatInterface[];
        const loadingChatHistory = history.concat(loadingChat);
        handleSetChatHistory(loadingChatHistory);

        try {
            const newChat = await sendMsgToOpenAI(openai, openAiMessageConverter(history, botCharacter));
            const newChatHistory = history.concat(newChat);
            handleSetChatHistory(newChatHistory);
        } catch (e) {
            console.log('error', e)
            setApiResponse("Something is going wrong, Please try again.");
        }
    }

    const handleSubmit = async (content: string)=> {
        const updatedChatHistory = handleAddUserChat(content);
        await handleAddBotChat(content, updatedChatHistory);
    };

    useEffect(() => {
        handleScrollToBottom();
    }, [history]);
      
    return (
        <ChatAreaContainer ref={chatContainerRef} height={`calc(100% - ${appBarHeight}px)`}>
            <ChatAreaInnerContainer>
                {history.map(({createdBy, text, type, tokens}, index) => {
                    return (
                        <Chat 
                            key={index} 
                            charcher={createdBy === 'user' ? userCharacter : botCharacter} 
                            createdBy={createdBy} 
                            text={text}
                            type={type}
                            tokens={tokens}
                        />
                    )
                })}
            </ChatAreaInnerContainer>
            <TextFieldAreaContainer>
                <StyledTextField onSubmit={handleSubmit}/>
                <Hint>CharacterGPT can make mistakes. Consider checking important information.</Hint>
            </TextFieldAreaContainer>
        </ChatAreaContainer>
    );
}