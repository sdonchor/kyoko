<template>
  <v-card class="pa-2 mt" outlined tile>
    <v-card-title>
      Messages
    </v-card-title>
    <div class="d-flex flex-wrap justify-center">
      <v-card
        color="primary"
        :key="idx + 'msg'"
        class="message ma-2"
        v-for="(message, idx) in messages"
        max-width="95%"
      >
      <div class="d-flex flex-no-wrap justify-space-between">
        <v-card-title>
          
            <div>
              {{ message.name }}
            </div>
           
        </v-card-title>
         <div>
              <v-icon color="error" v-on:click.stop="removeMessage(message.id)"
                >mdi-delete-circle</v-icon
              >
            </div>
         </div>
        <v-card-subtitle>
          {{ message.time }}
        </v-card-subtitle>
        <v-card-text>
          {{ message.content }}
        </v-card-text>
      </v-card>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "MessagesList",
  props: ["messagesrefreshsignal"],
  data: function() {
    return {
      messages: []
    };
  },
  methods: {
    getMessages: function() {
      axios
        .get("/api/messages")
        .then(response => {
          this.messages = response.data;
          this.$emit("refreshdone");
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeMessage: function(id) {
      axios.delete(`/api/messages/${id}`).then(response => {
        this.getMessages();
      });
    }
  },
  created() {},
  mounted() {
    this.getMessages();
  },
  computed: {
    canDelete: function(msg_level) {
      if (this.$store.state.login.permission_level >= msg_level) {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    messagesrefreshsignal: function() {
      if (this.messagesrefreshsignal) {
        this.getMessages();
      }
    }
  }
};
</script>

<style scoped>
.message {
  width: 400px;
  height: 400px;
  min-width:400px;
  overflow: scroll;
}
.message::-webkit-scrollbar {
    display: none;
}

.message {
    -ms-overflow-style: none;
}
</style>
