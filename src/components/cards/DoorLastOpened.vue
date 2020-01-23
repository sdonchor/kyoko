<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      Front door was last opened at:
    </v-card-title>
    <v-card-text>
      {{ lastOpened }}
    </v-card-text>
    <v-card-title>
      Currently:
    </v-card-title>
    <v-card-text>
      <v-chip :color="!doorOpen ? 'error' : 'success'"> {{ !doorOpen ? "OPEN" : "CLOSED" }} </v-chip
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DoorLastOpened",
  data: function() {
    return {
      lastOpened: null,
      doorOpen: null
    };
  },
  methods: {
    getTime: function() {
      axios.get("/api/doorLastOpened").then(response => {
        this.lastOpened = response.data;
      });
    },
    getStatus: function() {
      axios.get("/api/doorStatus").then(response => {
        this.doorOpen = response.data == "1";
      });
    }
  },
  created() {},
  mounted() {
    this.getTime();
    this.getStatus();
    setInterval(this.getTime, 10000);
    setInterval(this.getStatus, 3000);
  }
};
</script>

<style scoped></style>
