<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      LED Strip
    </v-card-title>
    <div class="d-flex flex-wrap justify-center">
      <v-btn class = "ma-2" fab v-bind:key="idx+'simplecolor'" v-for="(color, idx) in colors" :color="color" @click.stop="updateLedStrip(color)"></v-btn>
    </div>
    <v-btn class="mt-3" color="error" @click.stop="ledOff" width="100%"><v-icon left>mdi-lightbulb-off-outline</v-icon>Turn off</v-btn>
    
  </v-card>
</template>

<script>
export default {
  name: "SimpleLedColor",
  data: function() {
    return {
     colors: [
       "#FFFFFF",
       "#610C00",
       "#FF0000",
       "#FFA400",
       "#75FF00",
       "#00FF1A",
       "#00FFB8",
       "#0200FF",
       "#FD00FF",
       "#FF006B"
     ]
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
    updateLedStrip(color) {
        let rgb = this.hexToRgb(color);
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
    }
  
  },
  created() {},
  mounted() {},
  watch: {

  }
};
</script>

<style scoped></style>
