export interface chatInterface{
    createdBy: 'bot' | 'user' | 'assistant',
    text: string,
    type: 'normal' | 'error' | 'loading',
    tokens: number
}

export interface topicInterface{
    botCharacter: string,
    userCharacter: string,
    history: chatInterface[],
    time: string
}

export interface topicsInterface{
    [key: string]: topicInterface
}

