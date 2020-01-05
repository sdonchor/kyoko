<template>
  <v-card class="pa-2" outlined tile>
    <v-card-title>
      RGB LED Strip
    </v-card-title>
    <v-color-picker
      v-model="color"
      hide-mode-switch
      mode="rgba"
      :show-swatches="false"
      class="mx-auto"
    ></v-color-picker>
    <v-btn class="mt-3" color="error" @click.stop="ledOff" width="100%"><v-icon left>mdi-lightbulb-off-outline</v-icon>Turn off</v-btn>
    <v-spacer vertical height="10px"></v-spacer>
    <v-card class="mt-5" tile>
      <v-card-title>
        Disco mode
      </v-card-title>
    
    <v-card-actions class="justify-center">
    <v-btn color="success" @click.stop="discoOn" ><v-icon left>mdi-flash</v-icon>On</v-btn>
    <v-btn color="error" @click.stop="discoOff" ><v-icon left>mdi-flash-off</v-icon>Off</v-btn>
</v-card-actions>
    </v-card>
    
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
    discoOn(){
       axios.get("/api/discoOn")
    },
    discoOff(){
      axios.get("/api/discoOff")
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
