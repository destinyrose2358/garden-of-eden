import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

export interface ServerToClientEvents {
    userCreds: (data: SocketData) => void;
}

export interface ClientToServerEvents {
    message: (message: string) => void;
}

export interface InterServerEvents {

}

export interface SocketData {
    id: number;
}

const app = express();
const httpServer = createServer(app);

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, {

});

io.on("connection", (socket) => {
    console.log("a user connected");

    const setSocketData = (newSocketData: SocketData) => {
        socket.data = newSocketData;
    }

    socket.data.id = 1;

    socket.emit("userCreds", socket.data);

    socket.on("message", (message: string) => {
        console.log(message);
    });

    socket.on("disconnect", () => {
        console.log("a user disconnected");
    });
});

// io.use(async (socket, next) => {
//     try {
//         if (socket.handshake.auth.token === "aa") {
//             next()
//         } else {
//             const err = new Error("unauthorized");
//             next(err);
//         }
//     } catch (e) {
//         next(new Error("unauthorized"));
//     }
// })

httpServer.listen(3001, () => {
    console.log("listening on 3001");
});
