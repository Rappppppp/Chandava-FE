export interface ConversationList {
    id: number,
    title: string,
}

export interface Messages {
    id: number,
    conversation_id: number,
    user_id: number | string,
    body: string,
    created_at: string,
}