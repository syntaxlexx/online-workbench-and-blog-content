import { Profanity } from "@2toad/profanity";
import * as dotenv from "dotenv"
import express from "express"
import http from "http"
import { Server } from "socket.io"
import ChatBot from "./chatbot";
import { generateMessage, generateUser } from "./helpers";
import { User } from "./models";


const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"
dotenv.config({ path: envFile })
const port = process.env.PORT || 4000;
const allowedOrigins = process.env.ALLOWED_ORIGINS as string;

const app = express();
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: allowedOrigins.split(',')
    }
})

const users = new Map<string, User>()
const profanity = new Profanity({
    grawlix: "****",
    grawlixChar: "*",
    wholeWord: true,
})

io.on("connection", socket => {
    const id = socket.id;
    console.log("A user connected: ", id)

    const user = users.get(id) ?? generateUser();
    users.set(id, user)

    socket.on("disconnect", () => {
        console.log("user disconnected: ", id)
        users.delete(id)
    })

    socket.on("message", (message: string) => {
        console.log(`Received message {$message} from ${user.username}`)
        const filteredMessage = profanity.censor(message)
        io.emit("new-message", generateMessage({ content: filteredMessage, author: user }))
    })

})

const chatBox = new ChatBot(io);
chatBox.start();

server.listen(port, () => {
    console.log(   `Listening on port ${port}, allowed origin: ${allowedOrigins}`)
})
