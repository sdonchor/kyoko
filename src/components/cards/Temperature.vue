<template>
  <v-card class="pa-2 scroll" outlined tile>
    <v-card-title>
      Right now:
    </v-card-title>
    <v-simple-table class="temptable">
      <tbody>
        <tr>
          <td>
            <v-icon display="inline">mdi-thermometer</v-icon> Temperature:
          </td>
          <td>{{ temp }}&deg;C</td>
        </tr>
        <tr>
          <td><v-icon>mdi-water-percent</v-icon> Humidity:</td>
          <td>{{ humid }}%</td>
        </tr>
        <tr>
          <td><v-icon>mdi-chip</v-icon> RPi temperature:</td>
          <td>{{ rpitemp }}&deg;C</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "Temperature",
  data: function() {
    return {
      apiUrl: null,
      dht_timer: null,
      rpi_timer: null,
      temp: null,
      humid: null,
      rpitemp: null
    };
  },
  methods: {
    getDht() {
      axios.get(`/api/getDHT11Reading`).then(res => {
        this.temp = res.data.temp;
        this.humid = res.data.humid;
      });
    },
    getRpiTemp() {
      axios.get(`/api/getRpiTemp`).then(res => {
        this.rpitemp = res.data.temp;
      });
    }
  },
  created() {
    this.apiUrl = this.$apiUrl;
  },
  mounted() {
    this.dht_timer = setInterval(this.getDht, 10000);
    this.rpi_timer = setInterval(this.getRpiTemp, 10000);
    this.getDht();
    var t = this;
    this.getRpiTemp();
  }
};
</script>

<style scoped>
.temptable td {
  white-space: nowrap;
}
.scroll {
  overflow-x: hidden;
}
</style>
