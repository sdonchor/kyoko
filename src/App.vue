<template>
 <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>

        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Strona główna</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-tune</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Panel sterowania</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Odczyty</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Konfiguracja</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img class="mx-3" contain height="50px" :src="require('@/assets/logo.png')"></v-img>
      
    </v-app-bar>

    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex shrink>
            <router-view/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>

    <v-footer app color = "secondary">
 
        <v-card flat>
          <span>&copy; 2019</span>
        </v-card>
        <v-spacer></v-spacer>
        <v-card flat>
          <a href='mailto:sdonchor@gmail.com'>sdonchor@gmail.com</a>
        </v-card>
    
      
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',

  components: {
    
  },
  methods: {
    ...mapActions(),
  },
  data: () => ({
    drawer:null
  }),
  created: function() {
    this.$vuetify.theme.dark=true;
    
  },
  computed: mapGetters(['getAuthdata'])
};
</script>
