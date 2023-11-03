import OpenAI from "openai";
import { OpenAIConfig } from "../config/openaiConfig";
import { chatInterface } from "../interface/Chat";
import { openAIMessageInterface, openAIResponseInterface } from "../interface/OpenAI";

const roleMapping = {
    'bot' : 'system',
    'user' : 'user',
    'assistant' : 'assistant'
}

const chunkChats = (chats: chatInterface[]) => {
    let range = chats.length;
    let tokens = 0;
    let pointer = chats.length;
    for (let i = range -1; i >=0 ; i--){
        const chatToken = chats[i]['tokens'];
        if (tokens + chatToken > OpenAIConfig.max_tokens)
            break;
        pointer = i;
        tokens += chatToken;
    }
    return chats.slice(pointer);
}

const addCharacter = (chats: chatInterface[], botCharacter: string) => {
    return chats.concat({
        createdBy: 'user',
        text: `Remined that you are now a ${botCharacter}, you have to try explain it to your corresponing listener`,
        type: 'normal',
        tokens: 0
    })
}

// convert internal message to openAiMessage
export const openAiMessageConverter = (chats: chatInterface[], botCharacter: string): openAIMessageInterface[] => {
    const chunkedChats = chunkChats(chats);
    const chatsWithCharacter = addCharacter(chunkedChats, botCharacter);
    const openAiMessages =  chatsWithCharacter.map((chat)=> ({'role': roleMapping[chat.createdBy], 'content': chat.text})) as openAIMessageInterface[];
    return openAiMessages;
};


export const sendMsgToOpenAI = async(openai: OpenAI, messages: openAIMessageInterface[]) : Promise<chatInterface[]> => {
    const chatCompletion: any = await openai.chat.completions.create({
        model: OpenAIConfig.model,
        messages: messages as any,
        temperature: 0.7, // how creative your answer is
        // max_tokens: OpenAIConfig.max_tokens,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });
    const choices = chatCompletion.choices[0] as openAIResponseInterface;
    const totalTokens = chatCompletion.usage.totalTokens;
    const newChat = [{
        createdBy: 'bot',
        text: choices.message.content,
        type: 'normal',
        tokens: totalTokens
    }] as chatInterface[];
    return newChat;
};

// export const initialOpenAI = async(apiKey: string) : Promise<OpenAI>=> {
//     const openAI = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true });
//     await sendMsgToOpenAI(openAI, []).catch(()=> console.log('fail'))
//     return openAI
// }