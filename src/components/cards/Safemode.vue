<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      Safemode
    </v-card-title>
    <v-card-subtitle>
      Send an e-mail when door gets opened.
    </v-card-subtitle>
    <v-switch
      v-model="toggle"
      v-on:click.stop="safemodeToggle"
      :label="status ? 'On' : 'Off'"
    ></v-switch>
  </v-card>
</template>

<script>
export default {
  name: "Safemode",
  data: function() {
    return {
      status: false,
      toggle: false
    };
  },
  methods: {
    safemodeToggle: function(ins) {
      axios.put("/api/safemode").then(response => {
        this.status = response.data;
        this.toggle = response.data;
      });
    },
    getStatus: function() {
      axios.get("/api/safemode").then(response => {
        this.status = response.data;
        this.toggle = response.data;
      });
    }
  },
  created() {},
  mounted() {
    this.getStatus();
  }
};
</script>

<style scoped></style>
