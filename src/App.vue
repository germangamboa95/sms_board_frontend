<script setup lang="ts">
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { io } from "socket.io-client";
import { format, parseISO } from "date-fns";
import Message from "./components/Message.vue";
import { useMessages } from "./sockets";

const { messages, handleReportedMessage, handleNewMessage } = useMessages();
const content = ref("");

enum COMPNENT_STATE {
  READY = "ready",
  BUSY = "busy",
}

const status = ref<COMPNENT_STATE>(COMPNENT_STATE.READY);

const createMessage = async () => {
  if (!content.value || status.value == COMPNENT_STATE.BUSY) return;
  status.value = COMPNENT_STATE.BUSY;
  await handleNewMessage(content.value);
  content.value = "";
  status.value = COMPNENT_STATE.READY;
};
</script>

<template>
  <h1>Silly Message Board</h1>
  <div class="container">
    <section class="nes-container is-dark">
      <section class="message-list">
        <form action="" @submit.prevent="createMessage">
          <label for="textarea_field">Say Something to the world</label>
          <textarea v-model="content" class="nes-textarea is-dark"></textarea>
          <div class="action_container">
            <button type="submit" class="nes-btn is-primary">Get Silly</button>
          </div>
        </form>
      </section>
    </section>

    <div class="scroll-area">
      <template v-for="message of messages" :key="message.id">
        <Message @report-message="handleReportedMessage" :message="message" />
      </template>
    </div>
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
.nes-container {
  padding: 1rem !important;
}
.scroll-area {
  display: grid;
  row-gap: 1rem;
  height: 100vh;
  overflow-y: scroll;
}

.message-list {
  display: flex;
  flex-direction: column;
}

.action_container {
  display: flex;
  justify-content: flex-end;
}

@media screen and (max-width: 500px) {
  .container {
    width: 90%;
    margin: auto;
    display: grid;
    row-gap: 1rem;
  }
}
</style>
