<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/messageboard"  v-if="checkPerms(4)">
          <v-list-item-action>
            <v-icon>mdi-forum</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Messageboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/alarms"  v-if="checkPerms(5)">
          <v-list-item-action>
            <v-icon>mdi-alarm</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Alarms</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/control"  v-if="checkPerms(5)">
          <v-list-item-action>
            <v-icon>mdi-tune</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Control panel</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/readings" v-if="checkPerms(1)">
          <v-list-item-action>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Readings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/config" v-if="checkPerms(10)">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Configuration</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append v-if="checkPerms(0)">
        <div class="pa-2">
          <v-btn block color="error" @click.stop="logOut"
            ><v-icon left>mdi-logout</v-icon>Log out</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <img
        class="logocentered"
        contain
        :src="require('@/assets/logo.png')"
      ></v-img>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex v-if="checkPerms(0)">
            <router-view />
          </v-flex>
          <v-flex v-else>
            <div class="loginform">
              <LoginForm width="500px"></LoginForm>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app color="secondary">
      <v-card flat>
        <span>&copy; 2019</span>
      </v-card>
      <v-spacer></v-spacer>
      <v-card flat>
        <a href="mailto:sdonchor@gmail.com">sdonchor@gmail.com</a>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
let loginCheckInterval = null;

import LoginForm from "./components/cards/LoginForm.vue";
export default {
  name: "App",

  components: {
    LoginForm
  },
  methods: {
    loginCheck: function() {
      axios.get("/api/login").then(response => {
        let auth = null;
        if (response.data != 0) {
          auth = response.data;
        }
        this.$store.dispatch("updateAuthdata", auth);
      });
    },
    logOut: function() {
      this.$store.dispatch("logOut");
    },
    checkPerms: function(required){
      if(this.$store.state.login.authdata)
      {
        if(this.$store.state.login.authdata.permission_level>=required)
        {
          return true;
        }
      }
      return false;
    }
  },
  data: () => ({
    drawer: null
  }),
  created: function() {
    this.$vuetify.theme.dark = true;
  },
  computed: {
    
  },
  mounted: function() {
    loginCheckInterval = setInterval(() => {}, 10000);
    //
    this.$store.dispatch("checkCookies");
    //
  }
};
</script>
<style scoped>
.loginform{
  display:flex;
  align-items:center;
  justify-content:center;
}
.logocentered{

  width: 160px;
  height: auto;
}
</style>