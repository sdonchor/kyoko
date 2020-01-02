<template>
  <div>
    <v-container fluid fill-height>
      <v-row>
        <v-col lg = "6" overflow="hidden">
          <Temperature></Temperature>
        </v-col>
        <v-col  lg = "6">
          <OpenDoor></OpenDoor>
        </v-col>
      </v-row>
      <v-row>
        <v-col  lg = "6">
 <LedColorPicker></LedColorPicker>
        </v-col>
        <v-col  lg  = "6">
         
        </v-col>
      </v-row>
  
    </v-container>
  </div>
</template>

<script>
import Temperature from './cards/Temperature.vue'
import OpenDoor from './cards/OpenDoor.vue'
import LedColorPicker from './cards/LedColorPicker.vue'
export default {
  components:{
    Temperature,
    OpenDoor,
    LedColorPicker
  },
  name: "Home",
  data: function() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
