<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      Add a message
    </v-card-title>
    <div>
      <v-text-field
        class="pa-2"
        v-model="content"
        label="Message"
      ></v-text-field>

      <v-btn class="mt-5" color="primary" width="100%" @click.stop="addMessage">
        <v-icon left>mdi-check</v-icon> Post message
      </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "NewMessage",
  data: function() {
    return {
      content: null
    };
  },
  methods: {

    addMessage: function(){
      if(this.content){
        axios.post('/api/messages',{
          content: this.content
        }).then((response)=>{
          if(response==1)
          {
            this.content = null;
            this.$emit('refreshmessages');
          }
        })
      }

    }
  },
  created() {
  },
  mounted() {

  }
};
</script>

<style scoped></style>
