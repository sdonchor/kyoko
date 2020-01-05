<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      Set a new alarm
    </v-card-title>
    <div >
      <v-text-field v-model="description" label="Description (optional)"></v-text-field>
     
     <v-row justify="center">
      <v-time-picker class="mt-3" v-model="time" scrollable format="24hr"></v-time-picker>
      </v-row>
      <v-btn class = "mt-5" color="primary" width="100%">
       <v-icon left>mdi-check</v-icon> Set alarm
      </v-btn>
    </div>

  </v-card>
</template>

<script>
export default {
  name: "NewAlarm",
  data: function() {
    return {
      description: null,
      time: null
    };
  },
  methods: {

  },
  created() {
  },
  mounted() {
    
  }
};
</script>

<style scoped>

</style>
