<template>
  <div>
    <v-container>
      <v-row>
        <v-col> </v-col>
        <v-col>
         <Temperature></Temperature>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Temperature from './cards/Temperature.vue'
export default {
  components:{
    Temperature
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
