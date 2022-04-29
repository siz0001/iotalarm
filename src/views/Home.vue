<template>
  <v-container>
    <v-card>
      <v-text-field outlined v-model="ideaTitle" label="아이디어 제목">
      </v-text-field>
      <v-text-field outlined v-model="ideaText" label="아이디어 내용">
      </v-text-field>
      <v-card-actions>
        <v-btn @click="addData"> add idea</v-btn>
        <!--  
        <v-btn @click="getData"> get test </v-btn>
        -->
      </v-card-actions>
    </v-card>
    <v-card v-for="(item, i) in list" :key="i" outlined>
      <v-card-title v-if="!updateState">
        {{ item.ideaTitle }} <v-spacer></v-spacer>
        <v-btn
          icon
          @click="(ideaTitle = ''), (ideaText = ''), (updateState = true)"
          ><v-icon color="green">mdi-pen</v-icon></v-btn
        >
        <v-btn icon @click="deleteData(item.id)"
          ><v-icon color="red">mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-title v-else>
        <v-text-field
          v-model="item.ideaTitle"
          outlined
          label="아이디어 제목"
        ></v-text-field>
      </v-card-title>
      <v-card-text v-if="!updateState">
        {{ item.ideaText }}
      </v-card-text>
      <v-card-text v-else>
        <v-text-field
          v-model="item.ideaText"
          outlined
          label="아이디어 내용"
        ></v-text-field>
      </v-card-text>
      <v-card-text v-if="item.createdTimestamp">
        {{ new Date(item.createdTimestamp.seconds * 1000) }}
      </v-card-text>
      <v-card-actions v-if="updateState">
        <v-btn @click="updateData(item)">수정완료</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { db } from "@/firebase/db";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

export default {
  name: "Home",
  data: () => ({
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
  methods: {
    async addData() {
      await addDoc(collection(db, "idea"), {
        ideaTitle: this.ideaTitle,
        ideaText: this.ideaText,
        createdTimestamp: serverTimestamp(),
      });
    },
    async getData() {
      this.list = [];
      const querySnapshot = await getDocs(collection(db, "idea"));
      querySnapshot.forEach((doc) => {
        this.list.push(doc.data());
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    },
    async snapshotData() {
      const q = query(collection(db, "idea"), orderBy("createdTimestamp", "desc"));
      this.unsubscribe = onSnapshot(q, (querySnapshot) => {
        this.list = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id);
          this.list.push({ ...doc.data(), id: doc.id });
        });
      });
    },
    async deleteData(id) {
      await deleteDoc(doc(db, "idea", id));
    },
    async updateData(item) {
      const ref = doc(db, "idea", item.id);

      // Set the "capital" field of the city 'DC'
      await updateDoc(ref, {
        ...item,
      });
      this.updateState = false;
    },
  },
  distroyed() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  },
};
</script>
