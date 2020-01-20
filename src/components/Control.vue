<template>
  <div>
   
        <v-row>
          <v-col lg="6" overflow="hidden">
            <LedColorPicker></LedColorPicker>
          </v-col>
          <v-col lg="6">
             <Relay></Relay>
             <Safemode class="mt-5"></Safemode>
          </v-col>
        </v-row>
       
   
  </div>
</template>

<script>

import LedColorPicker from "./cards/LedColorPicker.vue";
import Relay from "./cards/Relay.vue";
import Safemode from "./cards/Safemode.vue";

export default {
  components: {
    LedColorPicker,
    Relay,
    Safemode
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
