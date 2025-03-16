import {
    Search,
    MoreVertical,
    ChevronLeft,
    Send,
    Smile,
    Check,
    User,
    Clock,
} from "lucide-react"

const Messages = () => {
    return (
        <div className="flex h-[calc(100vh-6.5625rem)] bg-gray-100">
            {/* Contacts Sidebar */}
            <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
                <div className=" border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800 mb-3">Messages</h1>
                    <div className=" relative mb-3 pr-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search contacts..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {/* Contact List */}
                    {[
                        {
                            id: 1,
                            name: "Sarah Johnson",
                            message: "Do you have availability for a group of 5 this weekend?",
                            time: "10:42 AM",
                            unread: true,
                            active: true,
                            avatar: null,
                        },
                        {
                            id: 2,
                            name: "Michael Chen",
                            message: "What are the rates for tent rentals?",
                            time: "Yesterday",
                            unread: false,
                            active: false,
                            avatar: null,
                        },
                        {
                            id: 3,
                            name: "Emily Rodriguez",
                            message: "Do you offer discounts for extended stays?",
                            time: "Yesterday",
                            unread: false,
                            active: false,
                            avatar: null,
                        },
                        {
                            id: 4,
                            name: "David Kim",
                            message: "Can we bring our own campfire setup?",
                            time: "Monday",
                            unread: true,
                            active: false,
                            avatar: null,
                        },
                        {
                            id: 5,
                            name: "Jessica Taylor",
                            message: "Is there a pet-friendly campsite available?",
                            time: "Monday",
                            unread: false,
                            active: false,
                            avatar: null,
                        },
                        {
                            id: 6,
                            name: "Robert Wilson",
                            message: "Do you have any lakefront camping spots?",
                            time: "Sunday",
                            unread: false,
                            active: false,
                            avatar: null,
                        },
                        {
                            id: 7,
                            name: "Amanda Lee",
                            message: "What amenities are included in the deluxe camping package?",
                            time: "Last week",
                            unread: false,
                            active: false,
                            avatar: null,
                        },
                    ].map((contact) => (
                        <div
                            key={contact.id}
                            className={`p-4 border-b border-gray-100 flex items-start gap-3 hover:bg-gray-50 cursor-pointer ${contact.active ? "bg-blue-50" : ""}`}
                        >
                            <div className="relative">
                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    {contact.avatar ? (
                                        <img
                                            src={contact.avatar || "/placeholder.svg"}
                                            alt={contact.name}
                                            className="h-12 w-12 rounded-full"
                                        />
                                    ) : (
                                        <User className="h-6 w-6 text-gray-500" />
                                    )}
                                </div>
                                {contact.unread && (
                                    <div className="absolute -top-1 -right-1 h-4 w-4 bg-primary rounded-full border-2 border-white"></div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={`text-sm font-medium ${contact.unread ? "text-gray-900" : "text-gray-700"}`}>
                                        {contact.name}
                                    </h3>
                                    <span className="text-xs text-gray-500">{contact.time}</span>
                                </div>
                                <p className={`text-sm truncate ${contact.unread ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                                    {contact.message}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex flex-col flex-1 bg-gray-50">
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
                            <h2 className="text-md font-medium text-gray-900">Sarah Johnson</h2>
                            <p className="text-xs text-green-500">Online</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        {/* <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                            <Phone className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                            <Video className="h-5 w-5 text-gray-500" />
                        </button> */}
                        <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-gray-100">
                            <MoreVertical className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Date Separator */}
                    <div className="flex items-center justify-center">
                        <div className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full">Today</div>
                    </div>

                    {/* Received Message */}
                    <div className="flex items-end gap-2 max-w-[80%]">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
                            <p className="text-gray-800 text-sm">Hi, do you have availability for a group of 5 this weekend?</p>
                            <span className="text-xs text-gray-500 mt-1 block">10:30 AM</span>
                        </div>
                    </div>

                    {/* Sent Message */}
                    <div className="flex items-end justify-end gap-2 max-w-[80%] ml-auto">
                        <div className="bg-primary text-white rounded-lg rounded-br-none p-3 shadow-sm">
                            <p className="text-sm">Hello Sarah! Yes, we have a few spots available. Would you prefer a tent site or a cabin?</p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-blue-100">10:32 AM</span>
                                <Check className="h-3 w-3 text-blue-100" />
                            </div>
                        </div>
                    </div>

                    {/* Received Message */}
                    <div className="flex items-end gap-2 max-w-[80%]">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
                            <p className="text-gray-800 text-sm">
                            A tent site would be great. How much is the rate per night?
                            </p>
                            <span className="text-xs text-gray-500 mt-1 block">10:35 AM</span>
                        </div>
                    </div>

                    {/* Sent Message */}
                    <div className="flex items-end justify-end gap-2 max-w-[80%] ml-auto">
                        <div className="bg-primary text-white rounded-lg rounded-br-none p-3 shadow-sm">
                            <p className="text-sm">
                            The tent site costs 500 for 2 pax per night. Beddings not included.
                            </p>
                            <div className="flex items-center justify-end gap-1 mt-1">
                                <span className="text-xs text-blue-100">10:38 AM</span>
                                <Check className="h-3 w-3 text-blue-100" />
                            </div>
                        </div>
                    </div>

                    {/* Received Message */}
                    <div className="flex items-end gap-2 max-w-[80%]">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
                            <p className="text-gray-800 text-sm">Sounds good! Are campfires allowed at the site?</p>
                            <span className="text-xs text-gray-500 mt-1 block">10:40 AM</span>
                        </div>
                    </div>

                    {/* Message with "typing" indicator */}
                    <div className="flex items-end gap-2 max-w-[80%]">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                        </div>
                        <div className="bg-gray-200 rounded-lg rounded-bl-none p-2 px-4">
                            <div className="flex gap-1">
                                <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"></div>
                                <div
                                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                ></div>
                                <div
                                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                                    style={{ animationDelay: "0.4s" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Message Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        {/* <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-100">
                            <Paperclip className="h-5 w-5 text-gray-500" />
                        </button>
                        <button className="h-10 w-10 rounded-full flex items-center justify-center hover:bg-gray-100">
                            <Image className="h-5 w-5 text-gray-500" />
                        </button> */}
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2">
                                <Smile className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                        <button className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary/90">
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Empty State for Mobile */}
            <div className="hidden flex-1 items-center justify-center bg-gray-50">
                <div className="text-center p-6">
                    <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                        <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-sm text-gray-500">Choose from your existing conversations or start a new one.</p>
                </div>
            </div>
        </div>
    )
}

export default Messages

