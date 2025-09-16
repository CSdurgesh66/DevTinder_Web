import io from "socket.io-client";

const BASE_URL = "http://localhost:3000";
export const createSocketConnection = () => {
    return io(BASE_URL);
}  