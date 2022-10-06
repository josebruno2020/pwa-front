<template>

  <ul class="chat">
    <infinite-loading v-if="messages.length >= 10" direction="top" @infinite="fetchMessages">
      <div slot="no-more"></div>
    </infinite-loading>
    <li class="left clearfix" v-for="(message, index) in allMessages" :key="index">
      <div class="clearfix user-message" :class="{'right': loggedUser.id === message.user_from.id}">
        <div class="header user">
        </div>
        <div class="message-back" :class="loggedUser.id === message.user_from.id ? 'logged-back' : 'other-back'">
            <span :class="`message ${!message.is_send ? 'not-send' : ''} `">
              {{ message.message }}
            </span>
        </div>
        <div class="div-time">
          <span class="time text-black-50" v-if="message.created_at">
            {{ new Date(message.created_at).toLocaleString() }}
          </span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import {httpGet, httpPut} from "@/services/http";
import {apiRoutes} from "@/services/apiRoutes";
import InfiniteLoading from 'vue-infinite-loading';

export default {
  name: "ChatMessages",
  props: ["messages", "loggedUser", "userTarget"],
  components: {
    InfiniteLoading,
  },
  data: () => ({
    oldUsername: '',
    page: 2
  }),

  computed: {
    allMessages() {
      return this.messages.map(m => ({
        ...m,
        read: true
      }))
    }
  },

  watch: {
    messages() {
      this.updateUnread();
    }
  },

  mounted() {
    this.page = 2
  },

  updated() {
   document.querySelector('#btn-chat').focus = true
  },

  methods: {
    async fetchMessages($state) {
      try {
        const {data} = await httpGet(`${apiRoutes.chatMessages}?user_to=${this.userTarget.id}&page=${this.page}`)
        this.page += 1
        if (!data.content.data.length) {
          $state.complete();
          return
        }
        const messages = data.content.data?.reverse()?.map(message => ({
          ...message,
          is_send: true
        }));
        this.$emit('updateMessages', messages);
        $state.loaded();
      } catch (err) {
        this.$notify.error({
          title: 'Erro!',
          message: 'Não foi possível buscar as mensagens'
        })
      }
    },

    async updateUnread() {
      if (this.messages.length) {
        try {
          await httpPut(apiRoutes.chatUnread, {
            user_from: this.userTarget.id
          })
        } catch (err) {
          console.log(err)
        }
      }
    },

    scrollBottom() {
      const chat = document.querySelector('.chat');
      chat.scrollTop = chat.scrollHeight


    },
  }
}
</script>

<style scoped>
.card {
  margin-top: 0 !important;
}
li {
  list-style: none !important;
}

.user-message {
  display: flex;
  flex-direction: column;
  align-items: start;
}
.right {
  text-align: right;


  align-items: end;
}

.chat {
  padding-right: 1.5rem;

  overflow-y: auto;
  overflow-x: hidden;
  max-height: 400px;
}

.user {
  font-size: 15px;
}

.message-back {
  margin: .5rem 0;
  padding: .5rem 0;;
  width: auto;


  border-radius: 10px;
}

.logged-back {
  background: #d7fcd1;
}

.other-back {
  background: #f4f2f8;
}
.message {
  padding: 1rem 1.5rem;
}

.time {
  font-size: 12px;
}

.div-time {
  margin-bottom: .5rem;
}

.not-send {
  opacity: .3;
  background: #edffe9;
}
</style>