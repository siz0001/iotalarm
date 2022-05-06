<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-title> 아이디어 앱 </v-app-bar-title> <v-spacer></v-spacer>
      <v-chip outlined class="ma-2" v-if="user"
        ><v-avatar left><v-img :src="user.photoURL"></v-img></v-avatar>
        {{ user.displayName }}</v-chip
      >
  
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: "App",

  data: () => ({
    user: null,
  }),
  created() {
   
  },
  methods: {
   
  },
};
</script>
