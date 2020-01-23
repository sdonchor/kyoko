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

        <v-tab href="#modules">
          Modules
        </v-tab>
        <v-tab href="#mailer">
          Mailer
        </v-tab>

        <v-tab-item value="modules">
          <ModulesConfig></ModulesConfig>
        </v-tab-item>
        <v-tab-item value="mailer">
          <v-card  class="pa-3" flat tile>
            <MailerConfig></MailerConfig>
          </v-card>
        </v-tab-item>
        
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
import ModulesConfig from './cards/ModulesConfig.vue'
import MailerConfig from './cards/MailerConfig.vue'
export default {
  name: "Config",
  components: {
    ModulesConfig,
    MailerConfig
  },
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
