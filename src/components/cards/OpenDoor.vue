<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      Staircase door
    </v-card-title>
    <v-btn width="100%" height="100px" x-large color='primary' @click.stop="openDoor">
      <v-icon left>mdi-door-open</v-icon> Open
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "OpenDoor",
  data: function() {
    return {
      
    };
  },
  methods: {
    openDoor: function(){
      axios.get('/api/openDoor')
    }
  },
  created() {
  },
  mounted() {
    
  }
};
</script>

<style scoped>

</style>
