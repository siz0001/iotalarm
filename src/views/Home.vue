<template>
  <v-container fill-height>
    <v-card class="mx-auto" flat width="400">
      <v-card-text
        v-if="distance"
        class="indigo--text text-center text-h2 font-italic font-weight-bold"
      >
        <strong> {{ distance }} </strong>
        <v-progress-linear
          color="deep-purple"
          :buffer-value="peak"
          :value="distance"
          stream
        ></v-progress-linear>
      </v-card-text>

      <v-card outlined height="200" class="d-flex mx-auto align-center">
        <v-scroll-x-transition>
          <v-img
            transtion="v-scroll-y-transition"
            v-if="isPlaying"
            max-width="100"
            src="@/assets/walking.svg"
            class="mx-auto"
          >
          </v-img>
        </v-scroll-x-transition>
      </v-card>

      <v-card-actions>
        <v-btn @click="play" depressed color="purple" dark>
          <v-icon> mdi-speaker </v-icon>
          작동 테스트
        </v-btn>
        <v-spacer></v-spacer>
        <v-chip color="deep-purple" dark class="ma-2">
          기준 : {{ this.peak }} cm
        </v-chip>
        <v-btn
          v-if="peak < 100"
          icon
          @click="peak = peak + 10"
          depressed
          color="pink"
          class="pa-0"
        >
          <v-icon large>mdi-arrow-up-bold-circle-outline</v-icon>
        </v-btn>
        <v-btn v-else icon depressed color="pink" class="pa-0">
          <v-icon large>mdi-arrow-up-bold-circle-outline</v-icon>
        </v-btn>

        <v-btn
          v-if="peak > 0"
          icon
          @click="peak = peak - 10"
          depressed
          color="pink"
          class="pa-0"
        >
          <v-icon large>mdi-arrow-down-bold-circle-outline</v-icon>
        </v-btn>
        <v-btn v-else icon depressed color="pink" class="pa-0">
          <v-icon large>mdi-arrow-down-bold-circle-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { db } from "@/firebase/db";
import { ref, onValue } from "firebase/database";
import { useSound } from "@vueuse/sound";
import trumpetSfx from "@/assets/3.mp3";

export default {
  name: "Home",
  data: () => ({
    intervalId: null,
    distance: null,
    selected: null,
    peak: 30,
    updateState: false,
    ideaTitle: "",
    ideaText: "",
    list: [],
    unsubscribe: false,
  }),
  components: {},
  created() {
    this.snapshotData();
  },
  watch: {
    distance() {
      if (this.distance > this.peak) {
        if (!this.isPlaying) {
          this.play();
          console.log(1);
        }
      }
    },
  },

  methods: {
    async snapshotData() {
      this.unsubscribe = ref(db, "FirebaseIOT/level");
      onValue(this.unsubscribe, (snapshot) => {
        const data = snapshot.val();
        this.distance = data;
      });
    },
  },
  setup() {
    const { play, stop, isPlaying } = useSound(trumpetSfx);

    return {
      play,
      stop,
      isPlaying,
    };
  },
  distroyed() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
};
</script>
