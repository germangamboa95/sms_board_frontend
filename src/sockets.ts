import { onMounted, ref } from "vue";
import { SillyBoard } from "./types";
import { io } from "socket.io-client";

const ENDPOINT = `https://sms-community-board.herokuapp.com`;

// const ENDPOINT = `http://localhost:3001`;

export const useMessages = () => {
  const messages = ref<SillyBoard.Message[]>([]);
  const socket = io(`${ENDPOINT}`, {
    reconnection: true,
  });

  socket.on("initial_messages", (data) => {
    messages.value = data;
    console.log("initial_messages", data);
  });

  socket.on("message", (data) => {
    messages.value = [...data, ...messages.value];
    console.log("message", data);
  });

  socket.on("remove_message", (data) => {
    messages.value = messages.value.filter(
      (messages) => messages.id !== data.id
    );
  });

  const handleReportedMessage = async (message_id: number) => {
    if (confirm("Report this message?")) {
      await fetch(`${ENDPOINT}/message/${message_id}/report`, {
        method: "POST",
      });
    }
  };

  const handleNewMessage = async (content: string) => {
    await fetch(`${ENDPOINT}/message/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
  };

  return { messages, socket, handleReportedMessage, handleNewMessage };
};
