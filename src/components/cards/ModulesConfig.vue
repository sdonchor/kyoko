<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <v-card class="pa-3" flat tile>
      <v-form v-on:submit.prevent="">
        <h2>Weather module config</h2>
        <v-text-field
          v-model="weatherConfig.api_key"
          label="OpenWeatherMap's API key"
        >
        </v-text-field>
        <v-text-field v-model="weatherConfig.city_id" label="City ID">
        </v-text-field>
        <v-radio-group v-model="weatherConfig.units">
          <v-radio label="Metric" value="metric"></v-radio>
          <v-radio label="Imperial" value="imperial"></v-radio>
        </v-radio-group>
        <h2>LED module config</h2>
        Disco mode animation speed
        <v-slider
          v-model="ledConfig.animationSpeed"
          class="align-center"
          max="20"
          min="1"
        >
        </v-slider>
        <div class="pr-2">Value: {{ ledConfig.animationSpeed }}</div>
      </v-form>
    </v-card>

    <v-btn class="ma-5" color="primary" v-on:click.stop="setConfig"
      ><v-icon left>mdi-content-save</v-icon>Save config</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "ModulesConfig",
  data: function() {
    return {
      loading: true,
      weatherConfig: {
        api_key: null,
        city_id: null,
        units: null
      },
      ledConfig: {
        animationSpeed: null
      }
    };
  },
  methods: {
    getConfig() {
      axios.get(`/api/config/modules`).then(response => {
        this.weatherConfig = response.data.weather;
        this.ledConfig = response.data.led;
        this.loading = false;
      });
    },
    setConfig() {
      axios.post("/api/config/modules", {
        weather: this.weatherConfig,
        led: this.ledConfig
      });
    }
  },
  created() {},
  mounted() {
    this.getConfig();
  }
};
</script>

<style scoped></style>
