import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();

    // Check if both name and roomId are provided
    if (!name || !roomId) {
      alert("Please provide both your name and the room code.");
      return;
    }

    // Create the user object with the provided data
    const roomData = {
      name,
      roomId,
      userId: uuid(), // Using uuid as userId
      host: false, // Default to not being the host
      presenter: false, // Default to not being the presenter
    };

    // Set the user in the context
    setUser(roomData);

    // Join the room by emitting the event to the server
    socket.emit("userJoined", roomData);

    // Navigate to the room page after successful connection
    navigate(`/${roomId}`);
  };

  return (
    <form className="form col-md-12 mt-5" onSubmit={handleRoomJoin}>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter room code"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </div>
      <button type="submit" className="mt-4 btn-primary btn-block form-control">
        Join Room
      </button>
    </form>
  );
};

export default JoinRoomForm;
