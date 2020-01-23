<template>
  <div>
    <v-container fluid fill-height>
      <v-row>
        <v-col lg="6"> <Temperature></Temperature></v-col>
        <v-col lg="6"> <DoorLastOpened></DoorLastOpened></v-col>
      </v-row>
      <v-row>
          <v-col lg="6">
              <Weather></Weather>
          </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import DoorLastOpened from "./cards/DoorLastOpened.vue";
import Temperature from "./cards/Temperature.vue";
import Weather from "./cards/Weather.vue"
export default {
  name: "Readings",
  components: {
    DoorLastOpened,
    Temperature,
    Weather
  },
  data: function() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped></style>
