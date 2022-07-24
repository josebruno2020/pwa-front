<template>
  <div class="row chat-room">
    <div class="col-md-2">
      <h3 class="align-left">Usuários</h3>
      <ul class="list-group">
        <li v-for="(user, index) in users" :key="index" @click="createChatWindow(user)" class="list-group-item" :id="user.id"
            :value="user.name">{{ user.name }}
        </li>
      </ul>
    </div>
    <div class="col-md-10" v-if="userTo">
      <div class="card">
        <div class="card-header">Chat com {{ userTo.name }}</div>
        <div class="card-body">
          <chat-messages :messages="messages" :logged-user="loggedUser"></chat-messages>
        </div>
        <div class="card-footer">
          <chat-form @messagesent="addMessage" :user="$store.state.user"></chat-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {httpGet, httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatForm from "@/components/chat/ChatForm";

export default {
  name: 'ChatRoom',
  props: ["allMessages"],
  data: () => ({
    users: [],
    loggedUser: null,
    userTo: null
  }),
  components: {
    ChatMessages,
    ChatForm
  },

  created() {
    this.loggedUser = this.$store.state.user;
    this.getUsers();
  },


  methods: {
    async getUsers() {
      // TODO get users
      try {
        const {data} = await httpGet(apiRoutes.chatUsers);
        this.users = data.content;
      } catch (err) {
        console.log('error pegar os usuarios.');
      }
    },

    async fetchMessages() {
      //TODO get messages
      //GET request to the messages route in our Laravel server to fetch all the messages
      // axios.get('/messages').then(response => {
      //   //Save the response in the messages array to display on the chat view
      //   this.messages = response.data;
      // });
    },

    async addMessage(obj) {
      const data = {
        message: obj.message,
        userId: this.userTo.id,
        name: this.loggedUser.name,
        created_at: new Date().toISOString(),
        user: obj.user
      }

      this.messages.push(data);
      await httpPost(apiRoutes.chat, data)
    },


    createChatWindow(userTo) {
      this.userTo = userTo
    }
  }

}
</script>

<style scoped>

</style>