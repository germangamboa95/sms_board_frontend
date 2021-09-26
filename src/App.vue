<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { io } from "socket.io-client";
import { format, parseISO } from "date-fns";

interface Message {
  id: number;
  message: string;
  source: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  reported_at?: string;
}

const messages = ref<Message[]>([]);

const formatDate = (date: string) => {
  return format(parseISO(date), "yyyy-mm-dd hh:mm");
};

onMounted(() => {
  try {
    const socket = io("https://sms-community-board.herokuapp.com/", {
      reconnection: true,
    });
    socket.on("connect", () => {
      console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    });
    socket.on("initial_messages", (data) => {
      messages.value = data;
      console.log("initial_messages", data);
    });

    socket.on("message", (data) => {
      messages.value = [...data, ...messages.value];
      console.log("message", data);
    });
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <h1>Silly Message Board</h1>
  <div class="container">
    <section class="nes-container is-dark">
      <section class="message-list">
        <section class="message -right">
          <!-- Balloon -->
          <div class="nes-balloon from-right is-dark">
            <p>Text +1 407 358 0380 to get your message on this board</p>
          </div>
          <i class="nes-bcrikko"></i>
        </section>
      </section>
    </section>

    <template v-for="message of messages" :key="message.id">
      <div class="nes-container with-title is-rounded">
        <p class="title">{{ formatDate(message.created_at) }}</p>
        <p>{{ message.message }}</p>
      </div>
    </template>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  width: 25%;
  margin: auto;
  display: grid;
  row-gap: 1rem;
}

@media screen and (max-width: 400px) {
  .container {
    width: 90%;
    margin: auto;
    display: grid;
    row-gap: 1rem;
  }
}
</style>
