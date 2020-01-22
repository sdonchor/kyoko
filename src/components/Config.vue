<template>
  <div>
    <v-container fluid fill-height>
      <v-tabs
        v-model="tab"
        background-color="primary"
        class="elevation-2"
        dark
      >
        <v-tabs-slider></v-tabs-slider>

        <v-tab href="#mailer">
          Mailer
        </v-tab>
        <v-tab href="#mailer23">
          LED Strip
        </v-tab>
        <v-tab href="#mailer233">
          Sensors
        </v-tab>
        <v-tab href="#mailer233">
          Weather
        </v-tab>

        <v-tab-item value="mailer">
          <v-card class="pa-3" flat tile>
            test1
          </v-card>
        </v-tab-item>
        <v-tab-item value="mailer23">
          <v-card  class="pa-3" flat tile>
            test1
          </v-card>
        </v-tab-item>
        <v-tab-item value="mailer233">
          <v-card  class="pa-3" flat tile>
            test1
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Config",
  components: {},
  data: function() {
    return {
      tab: null
    };
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style scoped></style>
