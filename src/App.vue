<template>
  <div id="app">
    <menu-interface ref="menu" class="menu" v-if="logged"></menu-interface>
    <router-view class="page-view"/>
    <el-button

        v-if="logged"
        id="chat-button"
        @click="openChat()"
        type="success"
        icon="el-icon-chat-line-round"
        circle
        size="large">
      <span v-if="messagesWithoutRead.length" class="text-primary">{{ messagesWithoutRead.length }}</span>
    </el-button>
    <el-dialog v-if="logged" title="Sala de chat"
               :visible.sync="isShowChat"
               width="90%"
               @close="userTo = {id: null}; isShowChat = false">
      <div class="row chat-room">
        <div class="col-md-2">
          <ul class="list-group">
            <li v-for="(user, index) in users" :key="index" @click="createChatWindow(user)"
                class="list-group-item user-item" :class="{'user-active': userTo.id === user.id}" :id="user.id"
                :value="user.name"><span>{{ user.name }}</span>
              <el-badge v-if="messagesWithoutRead.includes(user.id)"
                        :value="messagesWithoutRead.filter(id => id === user.id).length" class="item"
                        type="primary"></el-badge>
            </li>
          </ul>
        </div>
        <div class="col-md-10" v-if="userTo.id">
          <div class="card">
            <div class="card-header"><span class="name-user"><strong>{{ userTo.name }}</strong></span> @</div>
            <div class="card-body">
              <el-skeleton v-if="chatLoading" :rows="6" animated/>
              <chat-messages
                  ref="chatMessages"
                  @updateMessages="updateMessages($event)"
                  :messages="chatMessages"
                  :user-target="userTo"
                  :logged-user="loggedUser"
              ></chat-messages>
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

    isChannelConnected: false,

    users: [],
    userTo: {
      id: null
    },

    chatLoading: true,

    messagesWithoutRead: []
  }),

  components: {
    MenuInterface,
    ChatMessages,
    ChatForm
  },

  computed: {
    chatMessages() {
      if (this.loggedUser) {
        return this.messages.filter(message => {
          let chatIdArray = message.chat_id.split('-')
          return (Number(chatIdArray[0]) === this.loggedUser?.id && Number(chatIdArray[1]) === this.userTo?.id) ||
              (Number(chatIdArray[0]) === this.userTo?.id && Number(chatIdArray[1]) === this.loggedUser?.id)
        })
      }

      return []

    },

  },
  created() {
    if (this.$store.state.token) {
      this.loggedUser = this.$store.state.user
      this.getUsers();
      return this.logged = true;
    }
  },


  updated() {
    if (this.$store.state?.token) {
      this.loggedUser = this.$store.state.user
      this.connectChannel()
      return this.logged = true;
    }
    this.logged = false;
  },

  methods: {
    async connectChannel() {
      if (this.logged && !this.isChannelConnected) {

        try {
          const {data} = await httpGet(apiRoutes.chatUnread);
          data.content?.forEach(chat => {

            if (this.messagesWithoutRead.filter(id => id === chat.user_from).length === chat.unread) {
              return
            }

            for (let i = 0; i < chat?.unread; i++) {
              this.messagesWithoutRead.push(chat?.user_from);
            }

          })
        } catch (err) {
          console.log(err)
        }

        this.isChannelConnected = true


        window.Echo.channel('chat' + this.loggedUser.id)
            .listen('Chat', (event) => {
              const obj = event.message;
              const userFromId = obj.user_from.id;

              let mensagemLida = true;

              // verificar se ele está no chat.
              if (userFromId !== this.userTo.id) {
                mensagemLida = false
                this.messagesWithoutRead.push(userFromId)
                this.$notify.info({
                  title: `${obj.user_from.name}`,
                  message: `${obj.message}`,
                  onClick: () => {
                    this.isShowChat = true
                    return this.createChatWindow(obj.user_from);
                  }
                })
              }

              this.messages.push({
                message: obj.message,
                user_from: obj.user_from,
                user_to: obj.user_to,
                created_at: obj.created_at,
                chat_id: obj.chat_id,
                read: mensagemLida,
                is_send: true
              });
            });
      }
    },

    openChat() {
      this.isShowChat = true
      this.getUsers();
    },


    async getUsers() {
      try {
        const {data} = await httpGet(apiRoutes.chatUsers);
        this.users = data.content;
      } catch (err) {
        console.log('error pegar os usuarios.');
        this.$notify.error({
          title: 'Erro!',
          message: 'Não foi possível buscar os usuários.'
        })
      }
    },

    async addMessage(message) {
      const id_front = (Math.random() + 1).toString(36).substring(3)

      const chatMessage = {
        message: message.message,
        user_to: this.userTo.id,
        id_front
      }

      const messageMapped = {
        message: message.message,
        user_from: this.loggedUser,
        created_at: '',
        user_to: this.userTo,
        chat_id: `${this.loggedUser.id}-${this.userTo.id}`,
        is_send: false,
        id_front
      }

      this.messages.push(messageMapped);

      this.$nextTick(() => {
        this.$refs['chatMessages'].scrollBottom();
      })

      try {
        const {data} = await httpPost(apiRoutes.chat, chatMessage);

        //backend data

        const sendMessage = this.messages.find(message => message.id_front === data.content.id_front)
        sendMessage.is_send = true
        sendMessage.created_at = data.content.created_at
      } catch (err) {
        console.log(err)
        this.messages = this.messages.filter(message => message.id_front !== id_front)
        this.$notify.error({
          title: 'Erro!',
          message: 'Mensagem não enviada... tente novamente mais tarde.'
        })
      }
      this.$nextTick(() => {
        this.$refs['chatMessages'].scrollBottom();
      })
    },


    async createChatWindow(userTo) {
      this.messages = []
      this.messagesWithoutRead = this.messagesWithoutRead.filter(id => id !== userTo.id);
      this.userTo = userTo
      this.getUsers()
      await this.fetchMessages()
      this.$nextTick(() => {
        this.$refs['chatMessages'].scrollBottom();
      })
    },

    async fetchMessages() {
      try {
        this.chatLoading = true
        const {data} = await httpGet(`${apiRoutes.chatMessages}?user_to=${this.userTo.id}`)

        this.messages = data.content?.data?.reverse()?.map(message => ({
          ...message,
          is_send: true
        }));
      } catch (err) {
        console.log(err)
        this.$notify.error({
          title: 'Erro!',
          message: 'Não foi possível buscar as mensagens'
        })
      } finally {
        this.chatLoading = false
      }
    },


    updateMessages(messages) {
      this.messages = messages.concat(this.messages)
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
  width: 60px
  height: 60px

.el-icon-chat-line-round
  width: 100%

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
