<template>
  <v-card class="pa-2" outlined tile>
    <v-simple-table class="table table-bordered">
      <thead>
        <tr>
          <th colspan="2">Teraz w mieszkaniu:</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Temperatura:</td>
          <td>{{ temp }}&deg;C</td>
        </tr>
        <tr>
          <td>Wilgotność powietrza:</td>
          <td>{{ humid }}%</td>
        </tr>
        <tr>
          <td>Temperatura RaspberryPi:</td>
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
      humid:null,
      rpitemp:null,
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
  created(){
    this.apiUrl=this.$apiUrl;
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

<style scoped></style>
