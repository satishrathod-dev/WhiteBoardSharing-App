import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomForm = ({ uuid, socket, setUser }) => {
  const [roomId, setRoomId] = useState(uuid());
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleCreateRoom = (e) => {
    e.preventDefault();

    if (!name || !roomId) {
      alert("Please provide both your name and the room code.");
      return;
    }

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true,
    };

    setUser(roomData);

    socket.emit("userJoined", roomData);

    navigate(`/${roomId}`);
  };

  return (
    <form className="form col-md-12 mt-5" onSubmit={handleCreateRoom}>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group border">
        <div className="input-group d-flex align-items-center justify-content-center">
          <input
            type="text"
            value={roomId}
            className="form-control my-2 border-0"
            disabled
            placeholder="Generate room code"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary btn-sm me-1"
              onClick={() => setRoomId(uuid())}
              type="button"
            >
              Generate
            </button>
            <button
              className="btn btn-outline-danger btn-sm me-2"
              type="button"
              onClick={() => navigator.clipboard.writeText(roomId)}
            >
              Copy
            </button>
          </div>
        </div>
      </div>

      <button type="submit" className="mt-4 btn-primary btn-block form-control">
        Create Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
