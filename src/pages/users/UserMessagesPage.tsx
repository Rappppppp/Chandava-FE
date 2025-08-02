import {
    MoreVertical,
    ChevronLeft,
    Send,
    Smile,
    Check,
    User,
    Clock,
} from "lucide-react"



import { useParams, Link } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";
import { useMessaging } from "@hooks/useMessaging";


const UserMessagesPage = () => {
    const { user, loading: authLoading } = useAuth();
    const { convoId } = useParams();


    if (authLoading) return "Loading..."

    const { messageDivRef, conversationList, messages, conversationFetching, title, messageLoading, handleSendMessage, sendingMessage, message, setMessage } = useMessaging(user?.id, convoId);
    return (
        <div className="flex h-[calc(100vh-9.5625rem)] bg-gray-100">
            {/* Contacts Sidebar */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className=" border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800 mb-3">Messages</h1>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Contact List */}
                    {
                        conversationFetching ? "Loading..." : (
                            conversationList.map((contact) => (
                                <Link to={`/users/messages/${contact.id}`}
                                    key={contact.id}
                                    className={`p-4 border-b border-gray-100 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${contact.id === Number(convoId) ? "bg-blue-50" : ""}`}
                                >
                                    <div className="relative">
                                        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                            <User className="h-6 w-6 text-gray-500" />
                                        </div>
                                    </div>
                                    <div className="min-w-0 flex items-center">
                                        <h3 className={`text-sm font-medium text-gray-700`}>
                                            {contact.title}
                                        </h3>
                                    </div>
                                </Link>
                            ))
                        )
                    }

                </div>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex flex-col flex-1 bg-gray-50">
                {
                    !convoId ? (
                        <div className="text-center p-6">
                            <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                <Clock className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                            <p className="text-sm text-gray-500">Choose from your existing conversations.</p>
                        </div>
                    ) : (<>
                        {/* Chat Header */}
                        <div className="px-6 py-4 border-b border-gray-200 bg-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <button className="md:hidden">
                                    <ChevronLeft className="h-5 w-5 text-gray-500" />
                                </button>
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="h-5 w-5 text-gray-500" />
                                </div>
                                <div>
                                    <h2 className="text-md font-medium text-gray-900">{title}</h2>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">

                                <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                                    <MoreVertical className="h-5 w-5 text-gray-500" />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">

                            {
                                messageLoading ? "Loading..." : (
                                    messages.map((message, index) => {
                                        const isMe = message.user_id === user?.id;
                                        if (isMe) {
                                            return (
                                                <div
                                                    ref={index === messages.length - 1 ? messageDivRef : null}
                                                    key={`me-${index}`} className="flex items-end justify-end gap-2 max-w-[80%] ml-auto">
                                                    <div className="bg-primary text-white rounded-lg rounded-br-none p-3 shadow-sm">
                                                        <p className="text-sm">{message.body}</p>
                                                        <div className="flex items-center justify-end gap-1 mt-1">
                                                            <span className="text-xs">
                                                                {new Date(message.created_at).toLocaleString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                    hour: 'numeric',
                                                                    minute: '2-digit',
                                                                    hour12: true,
                                                                })}
                                                            </span>
                                                            <Check className="h-3 w-3 text-blue-100" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div
                                                ref={index === messages.length - 1 ? messageDivRef : null}
                                                key={`sender-${index}`} className="flex items-end gap-2 max-w-[80%]">
                                                <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                                                    <User className="h-4 w-4 text-gray-500" />
                                                </div>
                                                <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
                                                    <p className="text-gray-800 text-sm">{message.body}</p>
                                                    <span className="text-xs ">
                                                        {new Date(message.created_at).toLocaleString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                            hour: 'numeric',
                                                            minute: '2-digit',
                                                            hour12: true,
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                            }






                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === "Enter" && !e.shiftKey) {
                                                e.preventDefault();
                                                if (message.trim() !== "" && !sendingMessage) {
                                                    handleSendMessage(message);
                                                }
                                            }
                                        }}
                                        placeholder="Type a message..."
                                        className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Smile className="h-5 w-5 text-gray-400" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleSendMessage(message)} disabled={sendingMessage}
                                    className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90">
                                    <Send className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </>)
                }


            </div>


        </div>
    );
}

export default UserMessagesPage;