import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { formatNumber, fromNow } from "@acelords/js-utils";
import { Send } from "lucide-react";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "ws://127.0.0.1:82";

const CONNECTION_COUNT_UPDATED_CHANNEL = "chat:connection-count-updated";
const NEW_MESSAGE_CHANNEL = "chat:new-message";

type Message = {
  message: string;
  id: string;
  createdAt: Date;
  port: number;
};

function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketIo = io(SOCKET_URL, {
      reconnection: true,
      upgrade: true,
      transports: ["websocket", "polling"],
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
}

export default function Home() {
  const socket = useSocket();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const lastMessageRef = useRef<HTMLLIElement | null>(null);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    socket?.on("connect", () => {
      console.log("connected to socket");
    });

    socket?.on(NEW_MESSAGE_CHANNEL, (payload) => {
      setMessages((prev) => [...prev, payload]);

      setTimeout(() => {
        scrollToBottom();
      }, 0);
    });

    socket?.on(CONNECTION_COUNT_UPDATED_CHANNEL, (payload) => {
      setCount(Number(payload.count));
    });
  }, [socket]);

  function sendMessage() {
    socket?.emit(NEW_MESSAGE_CHANNEL, {
      message,
    });

    setMessage("");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    sendMessage();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      e.preventDefault();
      sendMessage();
    }
  }

  function scrollToBottom() {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }

  return (
    <main className="pt-12 flex flex-col space-y-8 max-w-xl m-auto p-4 w-full h-screen">
      <h2 className="font-bold tracking-tight text-center">
        Hello from The Other Side. {formatNumber(count, true)} connected.
      </h2>

      <div className="flex-1 overflow-y-auto">
        <ul className="list-disc space-y-2 text-sm divide-y divide-gray-100 pr-4 h-full">
          {messages.map((item) => (
            <li
              key={item.id}
              title={item.id}
              className="flex justify-between items-center"
            >
              <span className="col-span-3">{item.message}</span>
              <span className="text-xs italic flex space-x-2 text-gray-500">
                <span>{item.port}</span>
                <span>~{fromNow(item.createdAt)}</span>
              </span>
            </li>
          ))}

          <li ref={lastMessageRef}></li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="flex items-center space-x-4">
        <Textarea
          placeholder="Write your message"
          className="rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          // @ts-ignore
          onKeyDown={handleKeydown}
          maxLength={255}
          rows={1}
        />
        <Button type="submit" variant="ghost" className="h-full">
          <Send className="rotate-45" />
        </Button>
      </form>
    </main>
  );
}
