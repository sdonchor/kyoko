<template>
  <div>
    <v-container fluid fill-height>
      <v-row>
        <v-col lg="6">
          <NewAlarm @refreshalarms="refreshAlarms"></NewAlarm>
        </v-col>
        <v-col lg="6">
          <AlarmsList
            :alarmsrefreshsignal="alarmsRefresh"
            @refreshdone="refreshDone"
          ></AlarmsList>
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
    return {
      alarmsRefresh: false
    };
  },
  methods: {
    refreshAlarms: function() {
      this.alarmsRefresh = true;
    },
    refreshDone: function() {
      this.alarmsRefresh = false;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped></style>
