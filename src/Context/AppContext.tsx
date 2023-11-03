import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { chatInterface, topicsInterface } from "../interface/Chat";
import env from "react-dotenv";
import { AlertColor } from "@mui/material";

export interface AppStateInterface{
    currentTopicKey: string,
    topics: topicsInterface,
    apiKey: string,
    isOpenNewChatForm: boolean,
    isOpenLogInForm: boolean,
    isOpenAlert: {
        isOpen: boolean,
        type: AlertColor | undefined
        content: string,
    },
}

interface AppStateContextInterface {
    appState: AppStateInterface;
    setAppState: Dispatch<SetStateAction<AppStateInterface>>;
  }
  

const initialState = {
    apiKey: env.API_KEY,
    currentTopicKey: "Read Me",
    topics: {
        "Read Me": {
            userCharacter: 'user',
            botCharacter: 'bot',
            history: [
                {
                    createdBy: 'bot',
                    text: 'Welcome to Character GPT.',
                    type: 'normal',
                    tokens: 5000
                },
                {
                    createdBy: 'bot',
                    text: 'I am created by Yat Hei Lee.',
                    type: 'normal',
                    tokens: 5000
                },
                {
                    createdBy: 'bot',
                    text: 'In Character GPT, you assign a specific role to GPT, which influences the format of its responses.',
                    type: 'normal',
                    tokens: 5000
                },
                {
                    createdBy: 'bot',
                    text: 'For example, the answers provided by GPT can vary significantly when asked about "What is React?" by a kindergarten teacher compared to a software engineer.\n\nA kindergarten teacher might offer a simple and easy-to-understand explanation, whereas a software engineer may use technical jargon.',
                    type: 'normal',
                    tokens: 5000
                },
                {
                    createdBy: 'bot',
                    text: 'Character GPT simplifies the process by allowing you to set the desired role for GPT, saving you the time of defining its role in every conversation.',
                    type: 'normal',
                    tokens: 5000
                },
                {
                    createdBy: 'bot',
                    text: "Let's start with adding new chat !",
                    type: 'normal',
                    tokens: 5000
                },
            ] as chatInterface[],
            time: 'today'
        },
    },
    isOpenNewChatForm: false,
    isOpenLogInForm: true,
    isOpenAlert: {
        isOpen: false,
        type: undefined,
        content: ''
    }
};
const AppContext = createContext<AppStateContextInterface>({
    appState: initialState,
    setAppState: ()=>{}
});

export const useAppState = ()=>{
    return useContext(AppContext);
}

export function AppContextProvider({children}: any){
    const [appState, setAppState] = useState<AppStateInterface>(initialState);
    return(
        <>
            <AppContext.Provider value={{appState, setAppState}}>
                {children}
            </AppContext.Provider>
        </>
    )
}