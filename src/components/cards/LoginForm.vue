<template>
  <v-card class="pa-2" outlined tile>
    <v-form>
      <v-text-field label="Password" type="password" v-model="password">
      </v-text-field>
      <v-btn color="primary" @click.stop="logIn">Log in</v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
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
