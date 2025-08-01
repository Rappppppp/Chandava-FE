import { useEffect, useState, useMemo, useCallback } from "react";
import { ConversationList, Messages } from "@/types/conversationType";
import { MessageService } from "@services/messageService";


export const useMessaging = (userId: string | number, convoId?: string | number) => {
    const [conversationFetching, setConversationFetching] = useState(false);
    const [messageLoading, setMessageLoading] = useState(false);
    const [sendingMessage, setSendingMessage] = useState(false);
    const [conversationList, setConversationList] = useState<ConversationList[]>([]);
    const [messages, setMessages] = useState<Messages[]>([]);
    const [message, setMessage] = useState("");

    const title = useMemo(() => {
        if (convoId) {
            return conversationList.find(convo => convo.id === Number(convoId))?.title;
        }
    }, [convoId, conversationList])



    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setConversationFetching(true);
                const res = await MessageService.getAllConvos(userId);
                setConversationList(res)
            } catch (error) {
                console.log(error)
            } finally {
                setConversationFetching(false);
            }
        }

        if (userId) {
            fetchConversations();
        }
    }, [userId])

    const fetchMessages = useCallback(async (passConvoId?: string | number) => {
        try {
            setMessageLoading(true);
            const res = await MessageService.getMessages(passConvoId);
            setMessages(res)
        } catch (error) {
            console.log(error)
        } finally {
            setMessageLoading(false);
        }
    }, [])

    useEffect(() => {
        if (userId && convoId) {
            fetchMessages(convoId)
        }
    }, [userId, convoId, fetchMessages])

    const appendMessage = (newMessage: Messages) => {
        setMessages((prevMessages) => [...prevMessages, newMessage])
    }

    const handleSendMessage = async (body: string) => {
        try {
            setSendingMessage(true);
            const res = await MessageService.postMessage(convoId, {
                user_id: userId,
                body,
            })

            const newMessage = {
                id: res.id,
                conversation_id: res.conversation_id,
                user_id: res.user_id,
                body: res.body,
                created_at: res.created_at,
            }

            appendMessage(newMessage)
            setMessage("")

            
        } catch (error) {
            console.log(error)
        } finally {
            setSendingMessage(false);
        }
    }

    return {
        conversationFetching,
        conversationList,
        messages,
        title,
        messageLoading, handleSendMessage, sendingMessage,
        message, setMessage
    }

}