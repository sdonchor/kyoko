<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      Relay channels toggle
    </v-card-title>
    <div class="relaybuttons mb-5" >
    <v-btn  color='primary' @click.stop="relaySwitch(1)">
      <v-icon left>mdi-electric-switch-closed</v-icon> 1
    </v-btn>
    <v-btn  color='primary' @click.stop="relaySwitch(2)">
      <v-icon left>mdi-electric-switch-closed</v-icon> 2
    </v-btn>
    <v-btn   color='primary' @click.stop="relaySwitch(3)">
      <v-icon left>mdi-electric-switch-closed</v-icon> 3
    </v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Relay",
  data: function() {
    return {
      
    };
  },
  methods: {
    relaySwitch: function(ins){
      axios.get(`/api/switchRelay/${ins}`);
    }
  },
  created() {
  },
  mounted() {
    
  }
};
</script>

<style scoped>
.relaybuttons{
    display:flex;
    align-content:center;
    justify-content:space-around;
}
</style>
