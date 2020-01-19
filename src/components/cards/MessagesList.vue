<template>
  <v-card class="pa-2 mt" outlined tile>
    <v-card-title>
      Messageboard
    </v-card-title>
    <v-card
      color="primary"
      :key="idx + 'msg'"
      class="ma-2"
      v-for="(message, idx) in messages"
    >
      <v-card-title>
        {{ message.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ message.time }}
      </v-card-subtitle>
      <v-card-text>
        {{ message.content }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click.stop = "removeMessage(message.id)"><v-icon left>mdi-delete-circle</v-icon>Delete</v-btn>  
      </v-card-actions>
    </v-card>
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
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeMessage: function(idx) {
      axios
        .delete(`/api/messages/${idx}`)
        .then(response => {
          this.messages=response.data;
        });
    }
  },
  created() {},
  mounted() {
    this.getMessages();
  },
  computed:{
    canDelete: function(msg_level){
      if(this.$store.state.login.permission_level>=msg_level)
      {
        return true;
      }
      else{
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

<style scoped></style>
