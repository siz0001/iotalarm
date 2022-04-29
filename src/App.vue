<template>
  <v-app>
    <v-app-bar app dark>
      <v-app-bar-title> 아이디어 앱 </v-app-bar-title> <v-spacer></v-spacer>
      <v-chip outlined class="ma-2" v-if="user"
        ><v-avatar left><v-img :src="user.photoURL"></v-img></v-avatar>
        {{ user.displayName }}</v-chip
      >
      <v-btn v-if="user" text @click="logout()">로그아웃</v-btn>
      <v-btn v-else text to="/login">로그인</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: "App",

  data: () => ({
    user: null,
  }),
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log(user.uid);
        this.user = user;
        // ...
      } else {
        this.$router.push("/login");
        // User is signed out
        // ...
      }
    });
  },
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.user = null
       //  this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
