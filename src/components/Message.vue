<template>
  <div class="message nes-container with-title is-rounded">
    <p class="title">{{ formatDate(message.created_at) }}</p>
    <p>{{ message.message }}</p>
    <div class="action_container">
      <button
        class="nes-text is-error"
        @click="$emit('reportMessage', message.id)"
      >
        Report
      </button>
    </div>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
}
.action_container {
  display: flex;
  justify-content: flex-end;
}
</style>

<script lang="ts">
import { format, parseISO } from "date-fns";
import { defineComponent } from "vue";
import { SillyBoard } from "../types";

export default defineComponent({
  props: {
    message: {
      required: true,
      default: () => ({} as SillyBoard.Message),
    },
  },
  emits: {
    reportMessage: null,
  },
  setup() {
    const formatDate = (date: string) => {
      return format(parseISO(date), "yyyy-MM-dd hh:mm");
    };
    return {
      formatDate,
    };
  },
});
</script>
