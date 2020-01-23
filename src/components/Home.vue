<template>
  <div>
   
        <v-row>
          <v-col lg="6" overflow="hidden">
           
            <Weather></Weather>
          </v-col>
          <v-col lg="6">
             <Temperature></Temperature>
             <OpenDoor class="mt-5"></OpenDoor>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="12">
            <Led></Led>
          </v-col>

        </v-row>

      
   
  </div>
</template>

<script>
import Temperature from "./cards/Temperature.vue";
import OpenDoor from "./cards/OpenDoor.vue";
import Led from "./cards/SimpleLedColor.vue";
import LoginForm from "./cards/LoginForm.vue";
import Weather from "./cards/Weather.vue";
export default {
  components: {
    Temperature,
    OpenDoor,
    LoginForm,
    Weather,
    Led
  },
  name: "Home",
  data: function() {
    return {};
  },
  methods: {},
  computed: {
    authdata() {
      return this.$store.state.login.authdata;
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
