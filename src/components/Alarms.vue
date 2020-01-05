<template>
<div>
  <v-container fluid fill-height>
    <v-row>
      <v-col lg="6">
        <AlarmsList></AlarmsList>
      </v-col>
      <v-col lg="6">
        <NewAlarm></NewAlarm>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
import AlarmsList from "./cards/AlarmsList.vue";
import NewAlarm from "./cards/NewAlarm.vue";
export default {
  name: "Alarms",
  components: {
    AlarmsList,
    NewAlarm
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
