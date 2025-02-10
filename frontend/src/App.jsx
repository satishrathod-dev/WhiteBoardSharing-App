import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

import Forms from "./components/Forms";
import RoomPage from "./pages/RoomPage";

// Websocket connection
const server = "https://whiteboardsharing-app.onrender.com";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const App = () => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if (data.success) {
        console.log("userJoined");
        setUsers(data.users);
      } else {
        console.log("userJoined error");
      }
    });

    socket.on("allUsers", (data) => {
      setUsers(data);
    });

    socket.on("userLeftMessageBroadcasted", (data) => {
      console.log(`${data.name} ${data.userId} left the room`);
      toast.info(`${data.name} left the room`);
    });
  }, []);

  const uuid = uuidv4;

  return (
    <div className="container">
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<Forms uuid={uuid} socket={socket} setUser={setUser} />}
        />
        <Route
          path="/:roomId"
          element={
            <>
              <RoomPage
                socket={socket}
                users={users}
                setUsers={setUsers}
                user={user}
              />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
