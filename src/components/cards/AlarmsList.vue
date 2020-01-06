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
          <v-btn color="error" @click.stop="removeAlarm(idx)"><v-icon>mdi-close-circle</v-icon></v-btn>
        </td>
      </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "AlarmsList",
  props: ["alarmsrefreshsignal"],
  data: function() {
    return {
      alarms: [],
      newAlarmTime: null,
      newAlarmDesc: null
    };
  },
  methods: {
    getAlarms: function() {
      axios
        .get("/api/getAlarms")
        .then(response => {
          this.alarms = response.data;
          this.$emit('refreshdone');
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeAlarm: function(idx){
      axios.post('/api/removeAlarm',{
        idx: idx
      }).then((response)=>{
        this.getAlarms();
      })
    }
  },
  created() {},
  mounted() {
    this.getAlarms();
  },
  watch:{
    alarmsrefreshsignal: function(){
      if(this.alarmsrefreshsignal)
      {
        this.getAlarms();
      }
    }
  }
};
</script>

<style scoped>

</style>
