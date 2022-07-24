<template>
  <ul class="chat">
    <li class="left clearfix" v-for="(message, index) in allMessages" :key="index">
      <div class="clearfix user-message" :class="{'right': loggedUser.id === message.user.id}">
        <div class="header user">
        </div>
        <div class="message-back" :class="loggedUser.id === message.user.id ? 'logged-back' : 'other-back'">
            <span class="message">
              {{ message.message }}
            </span>
        </div>
        <div class="div-time">
          <span class="time text-black-50">{{ message.created_at }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ChatMessages",
  props: ["messages", "loggedUser", "userTarget"],
  data: () => ({
    oldUsername: ''
  }),

  computed: {
    allMessages() {
      return this.messages.map(m => ({
        ...m,
        read: true
      }))
    }
  },

  mounted() {
    console.log(this.messages)
  },



  updated() {
    const chat = document.querySelector('.chat');
    chat.scrollTop = chat.scrollHeight

    document.querySelector('#btn-chat').focus = true
  },

  methods: {
    isToday(day) {
      console.log(day)
      const date = new Date().toLocaleString().split(' ')[0]

      return day === date;
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
</style>