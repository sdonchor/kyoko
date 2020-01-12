<template>
  <div>
    <v-container fluid fill-height>
      <LoginForm></LoginForm>
    </v-container>
  </div>
</template>

<script>
//import {mapGetters} from 'vuex'
import LoginForm from './cards/LoginForm.vue'
export default {
  components:{
    LoginForm
  },
  name: "Login",
  data: function() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style scoped></style>
