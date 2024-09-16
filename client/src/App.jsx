import TitleBar from "./components/TitleBar.jsx";
import ChatBox from "./components/ChatBox.jsx";
import { socket } from "./socket";
import { useState, useEffect } from "react";

function App() {
    const [inChat, setInChat] = useState(false);
    const [pendingMessage, setPendingMessage] = useState("");
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [messageList, setMessageList] = useState([]);

    function onSend(event) {
        event.preventDefault();
        if (pendingMessage !== "") {
            const messageData = {
                room: room,
                user: username,
                message: pendingMessage,
                time: Date.now(),
            };
            socket.emit("send_message", messageData);
            if (messageList.length > 3) { let holdingArray = messageList;
                holdingArray.shift();
                setMessageList(holdingArray);
            };
            setMessageList((prevList) => [...prevList, messageData]);
        }
    }
    function joinRoom(event) {
        event.preventDefault();
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setInChat(true);
        }
    }

    useEffect(() => {
        socket.on("get_message", (data) => {
            setMessageList((prevList) => [...prevList, data]);
        });
    }, [socket]);

    return (
        <>
            <div
                id="innerCard"
                className="flex items-center justify-center flex-col mx-5 my-1"
            >
                {!inChat ? (
                    <div className="flex items-center flex-col w-3/5 min-h-96 h-fit object-contain justify-between content-end min-w-max">
                        <TitleBar
                            username={username}
                            setUsername={setUsername}
                            room={room}
                            setRoom={setRoom}
                            joinRoom={joinRoom}
                        />
                    </div>
                ) : (
                    <div
                        id="chatPanel"
                        className="min-w-72 w-3/5 min-h-96 h-fit rounded-lg bg-slate-300 content-end overflow-hidden"
                    >
                        <ChatBox
                            pendingMessage={pendingMessage}
                            setPendingMessage={setPendingMessage}
                            onSend={onSend}
                            messageList={messageList}
                            username={username}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
