export interface openAIMessageInterface{
    role: 'system' | 'user' | 'assistant',
    content: string
}

export interface openAIResponseInterface{
    finish_reason: string,
    index: number,
    message: {
        content: string,
        role: string
    }
}