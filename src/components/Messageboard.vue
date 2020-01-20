<template>
  <div>
    <v-container fluid fill-height>
      <v-row>
        <v-col lg="12">
          <NewMessage @refreshmessages="refreshMessages"></NewMessage>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="12">
          <MessagesList
            :messagesrefreshsignal="messagesRefresh"
            @refreshdone="refreshDone"
          ></MessagesList>
        </v-col>
        </v-row>
        
    </v-container>
  </div>
</template>

<script>
import MessagesList from "./cards/MessagesList.vue";
import NewMessage from "./cards/NewMessage.vue";
export default {
  name: "Messageboard",
  components: {
    MessagesList,
    NewMessage
  },
  data: function() {
    return {
      messagesRefresh: false
    };
  },
  methods: {
    refreshMessages: function() {
      this.messagesRefresh = true;
    },
    refreshDone: function() {
      this.messagesRefresh = false;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped></style>
