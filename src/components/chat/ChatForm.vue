
<template>
  <div class="chat-input">
    <input
        id="btn-input"
        type="text"
        name="message"
        class="form-control input-sm"
        placeholder="Digite sua mensagem aqui..."
        v-model="newMessage"
        @keyup.enter="sendMessage"
    />
    <span class="input-group-btn">
      <el-button type="success" plain circle id="btn-chat" @click="sendMessage" icon="el-icon-right">

      </el-button>
    </span>
  </div>
</template>

<script>
export default {
  name: "ChatForm",
  props: ["user"],
  data() {
    return {
      newMessage: "",
    };
  },

  methods: {
    sendMessage() {
      if (!this.newMessage.length) return
      this.$emit("messagesent", {
        user: this.user,
        message: this.newMessage,
      });
      this.newMessage = "";
    },
  },
}
</script>

<style scoped>
.chat-input {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>