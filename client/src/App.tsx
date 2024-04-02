import React, { useEffect, useState } from 'react';
import './App.css';
import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents, SocketData } from '../../server/src/Server';

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(process.env.REACT_APP_SOCKET_URL!, { transports: ['websocket'] });

function App() {
  const [userCreds, setUserCreds] = useState<SocketData>();

  useEffect(() => {
    const serverConnectLog = () => {
      console.log(`connected to server`);
      socket.emit("message", "REEEEEEEEEEEEEEEEEEEEE");
    }
    socket.on("connect", serverConnectLog);
    socket.on("userCreds", setUserCreds);
    
    return () => {
      console.log("disconnected from server");
      socket.off("connect", serverConnectLog);
      socket.off("userCreds", setUserCreds);
    }
  }, []);

  return (
    <div className="App">
      {
        userCreds?.id
      }
    </div>
  );
}

export default App;
