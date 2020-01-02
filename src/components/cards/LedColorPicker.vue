<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      Kolor paska LED
    </v-card-title>
    <v-color-picker
      v-model="color"
      hide-mode-switch
      mode="rgba"
      :show-swatches="false"
      class="mx-auto"
    ></v-color-picker>
    <v-btn color="primary" @click.stop="ledOff" width="100%">Zgaś światło</v-btn>
    
  </v-card>
</template>

<script>
export default {
  name: "LedColorPicker",
  data: function() {
    return {
      color: "#000000",
      interval: null,
    };
  },
  methods: {
    hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null;
    },
    updateLedStrip() {
        let rgb = this.hexToRgb(this.color);
      axios.post("/api/setLedStrip", {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b
      });
    },
    ledOff(){
      this.color="#000000"
      axios.post("/api/setLedStrip",{
        r: 0,
        g: 0,
        b: 0,
      })
    },
  
  },
  created() {},
  mounted() {},
  watch: {
    color: function(val) {
      this.updateLedStrip()
    }
  }
};
</script>

<style scoped></style>
