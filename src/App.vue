<template>
  <div id="app">
    <menu-interface ref="menu" class="menu" v-if="logged"></menu-interface>
    <router-view class="page-view"/>
      <el-button
          v-if="logged"
          id="chat-button"
          @click="openChat()"
          type="info"
          icon="el-icon-chat-line-round"
          circle
          plain>
        <span v-if="messagesWithoutRead.length" class="text-primary">{{  messagesWithoutRead.length  }}</span>
      </el-button>
    <el-dialog title="Sala de chat"
               :visible.sync="isShowChat"
               width="90%"
    @close="userTo = {id: null}; isShowChat = false">
      <div class="row chat-room">
        <div class="col-md-2">
          <ul class="list-group">
            <li v-for="(user, index) in users" :key="index" @click="createChatWindow(user)"
                class="list-group-item user-item" :class="{'user-active': userTo.id === user.id}" :id="user.id"
                :value="user.name"><span>{{ user.name }}</span>
              <el-badge v-if="messagesWithoutRead.includes(user.id)" :value="messagesWithoutRead.filter(id => id === user.id).length" class="item" type="primary"></el-badge>
            </li>
          </ul>
        </div>
        <div class="col-md-10" v-if="userTo.id">
          <div class="card">
            <div class="card-header"><span class="name-user"><strong>{{ userTo.name }}</strong></span> @</div>
            <div class="card-body">
              <chat-messages :messages="chatMessages" :user-target="userTo" :logged-user="loggedUser"></chat-messages>
            </div>
            <div class="card-footer">
              <chat-form @messagesent="addMessage" :user="$store.state.user"></chat-form>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script lang="js">
import MenuInterface from '@/components/ui/Menu.vue';
import ChatMessages from "@/components/chat/ChatMessages";
import ChatForm from "@/components/chat/ChatForm";
import {httpGet, httpPost} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";

export default {
  name: 'App',
  data: () => ({
    logged: false,
    isShowChat: false,
    messages: [],

    loggedUser: null,

    users: [],
    userTo: {
      id: null
    },

    messagesWithoutRead: []
  }),

  components: {
    MenuInterface,
    ChatMessages,
    ChatForm
  },

  computed: {
    chatMessages() {
      return this.messages.filter(message => {
        let chatIdArray = message.chatId.split('-')
        return (Number(chatIdArray[0]) === this.loggedUser.id && Number(chatIdArray[1]) === this.userTo.id) ||
            (Number(chatIdArray[0]) === this.userTo.id && Number(chatIdArray[1]) === this.loggedUser.id)
      })
    },

    // totalMessagesWithoutRead() {
    //   return
    // }
  },
  created() {
    if (this.$store.state.token) {
      this.loggedUser = this.$store.state.user
      this.getUsers();
      return this.logged = true;
    }

    // return this.$router.push('/login');
  },

  mounted() {
    window.Echo.channel('chat' + this.loggedUser.id)
        .listen('ChatMessage', (event) => {
          console.log(event)

          const obj = event.messageArray;
          const userFromId = obj.fromUserId;

          let mensagemLida = true


          // verificar se ele está no chat.
          if (userFromId !== this.userTo.id) {
            console.log('nao estou no chat')
            mensagemLida = false
            this.messagesWithoutRead.push(userFromId)
            this.$notify.info({
              title: `${obj.user.name}`,
              message: `${obj.message}`,
              onClick: () => {
                this.isShowChat = true
                return this.createChatWindow(obj.user);
              }
            })
          }

          this.messages.push({
            message: obj.message,
            user: obj.user,
            created_at: new Date(obj.created_at).toLocaleString(),
            day: new Date(obj.created_at).toLocaleString().split(' ')[0],
            chatId: obj.chatId,
            read: mensagemLida
          });
        });
  },

  updated() {
    if (this.$store.state?.token) {
      // this.getUsers();
      return this.logged = true;

    }
    this.logged = false;
    return this.$router.push({name: 'login'})
  },

  methods: {
    disabledMenu() {
      return this.$refs.menu.showMenu = false
    },

    openChat() {
      this.isShowChat = true
    },

    openUserToChat() {
      this.$message({
        message: 'Enganei voce, seu bobo KKKK'
      })
    },


    async getUsers() {
      try {
        const {data} = await httpGet(apiRoutes.chatUsers);
        this.users = data.content;
      } catch (err) {
        console.log('error pegar os usuarios.');
      }
    },

    async fetchMessages() {
      //TODO get messages com o chatId quando clicar no chat.
    },

    async addMessage(obj) {
      const data = {
        message: obj.message,
        userId: this.userTo.id,
        name: this.loggedUser.name,
        id: this.userTo.id,
        created_at: new Date().toLocaleString(),
        day: new Date(obj.created_at).toLocaleString().split(' ')[0],
        user: obj.user,

        fromUserId: this.loggedUser.id,
        targetUserId: this.userTo.id,
        chatId: `${this.userTo.id}-${this.loggedUser.id}`
      }
      console.log(data)
      this.messages.push(data);
      await httpPost(apiRoutes.chat, data)
    },


    createChatWindow(userTo) {
      this.messagesWithoutRead = this.messagesWithoutRead.filter(id => id !== userTo.id);
      // TODO fetch messensagens de acordo com o chat-id pelo backend.
      this.userTo = userTo
    }
  }


}
</script>

<style lang="sass">
.page-view
  width: 100%

.row-main
  width: 100vw
  display: flex
  justify-content: center
  margin: 0 !important

.el-card
  margin-top: .5rem


label
  padding-bottom: 0 !important
  width: auto

.el-select
  width: 100%


.subtitle
  padding: .8rem 0


.footer
  padding-top: 1rem

  .center
    display: flex
    justify-content: center


#chat-button
  position: fixed
  right: 2rem
  bottom: 2rem

.row
  align-items: flex-start !important

.card
  margin-top: 0 !important

.user-active
  background: #55b98d !important

.user-item
  cursor: pointer


.card-header
  background: #f4f2f8 !important
  .name-user
    font-size: 1rem
</style>
