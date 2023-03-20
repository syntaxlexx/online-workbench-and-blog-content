import * as dotenv from "dotenv"
import express from "express"
import http from "http"
import helmet from "helmet";
import { Server } from "socket.io"
import ChatBot from "./chatbot";

const app = express();
const server = http.createServer(app)

dotenv.config();

// const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env"
// dotenv.config({ path: envFile })
const port = process.env.PORT || 4000;
const allowedOrigins = process.env.ALLOWED_ORIGINS as string;

const io = new Server(server, {
    cors: {
        origin: allowedOrigins.split(','),
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["x-auth"],
    }
})

app.use(helmet());
app.disable("x-powered-by");

// @ts-ignore
app.io = io;
require("./sockets")(app);

const chatBox = new ChatBot(io);
chatBox.start();

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}, allowed origins: ${allowedOrigins}`)
})
