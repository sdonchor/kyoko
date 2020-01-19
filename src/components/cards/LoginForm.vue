<template>
  <v-card class="pa-2 text-center" outlined tile :max-width="width"  >
    <v-card-title>
      Log in
    </v-card-title>
    <v-form v-on:submit.prevent="logIn" class="pa-5">
      <v-text-field label="Password" type="password" v-model="password">
      </v-text-field>
      <v-btn color="primary" @click.stop="logIn"><v-icon left>mdi-login</v-icon>Log in</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  props: ['width'],
  data: function() {
    return {
      password: null
    };
  },
  methods: {
    logIn: function() {
      this.$store.dispatch('logIn',this.password);
      
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped></style>
