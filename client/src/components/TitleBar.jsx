function TitleBar({ username, setUsername, room, setRoom, joinRoom }) {
    return (
        <div className="min-w-72 rounded-lg  bg-slate-300 content-end overflow-hidden">
            <div className="flex flex-row text-lg text-center justify-center">
                ghost-chat: chat without a trace
            </div>
            <div className="flex flex-row">
                <input
                    className=" w-2/5 rounded-l border border-slate-800"
                    id="userID"
                    type="text"
                    placeholder=" userID@8char"
                    maxLength="8"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                ></input>
                <input
                    className=" w-2/5 border border-slate-800"
                    id="roomID"
                    type="text"
                    placeholder=" roomID@8char"
                    maxLength="8"
                    value={room}
                    onChange={(event) => setRoom(event.target.value)}
                ></input>
                <button
                    className=" w-1/5 rounded-r bg-slate-600 border-l-0 border border-slate-800"
                    onClick={joinRoom}
                >
                    GO
                </button>
            </div>
        </div>
    );
}

export default TitleBar;
