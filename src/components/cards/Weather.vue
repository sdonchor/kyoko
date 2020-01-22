<template>
  <v-card class="pa-2" outlined tile v-if="weather">
    <v-card-title> Weather in {{ weather.location }} </v-card-title>
    <v-card-subtitle>Updated at {{ weather.updated_at }}</v-card-subtitle>
  
    <v-simple-table class="temptable">
        <thead>
             <tr>
          <th class="md-icon">
            <v-img width="50px" height="50px" :src="weather.icon"></v-img
      >
          </th>
          <th> {{ weather.description.charAt(0).toUpperCase() + weather.description.slice(1) }}</th>
          <th></th>
        </tr>
        </thead>
      <tbody>
       
        <tr>
          <td class="md-icon">
            <v-icon display="inline">mdi-thermometer</v-icon>
          </td>
          <td>Temperature:</td>
          <td>{{ weather.temperature }}&deg;C</td>
        </tr>
        <tr>
          <td class="md-icon"><v-icon>mdi-arrow-up-bold</v-icon></td>
          <td>Max temperature:</td>
          <td>{{ weather.temperature_max }}&deg;C</td>
        </tr>
        <tr>
          <td class="md-icon">
            <v-icon>mdi-arrow-down-bold</v-icon>
          </td>
          <td>Min temperature:</td>
          <td>{{ weather.temperature_min }}&deg;C</td>
        </tr>

        <tr>
          <td class="md-icon"><v-icon>mdi-arrow-collapse-down</v-icon></td>
          <td>Pressure:</td>
          <td>{{ weather.pressure }} hPa</td>
        </tr>

        <tr>
          <td class="md-icon"><v-icon>mdi-weather-windy</v-icon></td>
          <td>Wind:</td>
          <td>{{ weather.wind_speed }} m/s</td>
        </tr>

        <tr>
          <td class="md-icon"><v-icon>mdi-water-percent</v-icon></td>
          <td>Humidity:</td>
          <td>{{ weather.humidity }}%</td>
        </tr>
      </tbody>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "Weather",
  data: function() {
    return {
      weather: null
    };
  },
  methods: {
    getWeather: function() {
      axios.get("/api/weather").then(response => {
        this.weather = response.data;
      });
    }
  },
  created() {},
  mounted() {
    this.getWeather();
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
.md-icon {
  width: 30px;
  text-align: left;
}
.description {
}
</style>
