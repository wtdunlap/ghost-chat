const ChatBox = ({
    pendingMessage,
    setPendingMessage,
    onSend,
    messageList,
    username,
}) => {
    return (
        <div>
            <div id="body" className="flex flex-col ">
                {messageList.map((message) => {
                    if (message.username === username) {
                        return (
                            <div
                                key={message.time + 0}
                                className="bg-slate-400 rounded mx-5 max-w-max justify-end my-5"
                            >
                                <p key={message.time + 1} className="m-1 text-right">
                                    user: {message.user} at {message.time}
                                </p>
                                <p
                                    key={message.time + 2}
                                    className="mx-5 pb-3 text-wrap break-all"
                                >
                                    {message.message}
                                </p>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={message.time + 3}
                                className="bg-slate-400 rounded mx-5 max-w-max justify-start my-2"
                            >
                                <p key={message.time + 4} className="m-1 text-left">
                                    user: {message.user} at {message.time}
                                </p>
                                <p
                                    key={message.time + 5}
                                    className="mx-5 pb-3 text-wrap break-all"
                                >
                                    {message.message}
                                </p>
                            </div>
                        );
                    }
                })}
            </div>
            <div
                id="chatInput"
                className="mx-5 my-1 object-contain justify-between content-end min-w-max"
            >
                <form>
                    <input
                        className="w-5/6 rounded-l border border-r-0 border-slate-800"
                        type="text"
                        placeholder=" character limit is 128 with 4 messages visible"
                        maxLength="128"
                        value={pendingMessage}
                        onChange={(e) => setPendingMessage(e.target.value)}
                    ></input>
                    <button
                        className="w-1/6 rounded-r bg-slate-600 border border-l-0 border-slate-800"
                        onClick={onSend}
                    >
                        SEND
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBox;
