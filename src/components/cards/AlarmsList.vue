<template>
  <v-card class="pa-2 mt" outlined tile>
    <v-card-title>
      Alarms
    </v-card-title>
    <v-simple-table class="alarmslist" width="20%">
      <tbody>
      <tr :key="idx" v-for="(alarm, idx) in alarms">
        <td>{{ idx+1 }}.</td>
        <td>
          {{ alarm.description }}
        </td>
        <td>
          {{ alarm.time }}
        </td>
        <td>
          <v-btn color="error"><v-icon>mdi-close-circle</v-icon></v-btn>
          <v-btn class="ml-3" color="primary"><v-icon>mdi-pencil</v-icon></v-btn>
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "AlarmsList",
  data: function() {
    return {
      alarms: [
        { description: "test1", time: "12:03" },
        { description: "test2", time: "4:20" },
        { description: "test3", time: "25:00" },
       
      ],
      newAlarmTime: null,
      newAlarmDesc: null
    };
  },
  methods: {
    getAllAlarms: function() {
      axios
        .get("/api/getAllAlarms")
        .then(response => {
          this.alarms = response.data.alarms;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {},
  mounted() {
    //this.getAllAlarms();
  }
};
</script>

<style scoped>

</style>
