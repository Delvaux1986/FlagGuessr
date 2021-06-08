<template>
  <div>
    <div class="scoreBoardFinal">
      <p>Bravo vous avez Fini le jeu .<br />Voici vos réponses :</p>
      <p>
        Vous avez obtenu :
        <span class="score">{{ displayScore() }} / {{ this.scoreMax }}</span>
      </p>
      <div v-for="(key, value) in this.scoreBoard" :key="key">
        <div v-if="key === true" class="wrongAnswer">
          {{ value }} : {{ key ? "Correct" : "Pas correct !!!" }}
        </div>
        <div v-else class="correctAnswer">
          {{ value }} : {{ key ? "Correct" : "Pas correct !!!" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebaseInit"
const db = firebase.firestore();

export default {
  props: {
    scoreBoard: Object,
    scoreMax: String,
    playerName: String,
  },
  data() {
    return {};
  },
  mounted() {
    this.displayScore();
    console.log(this.scoreBoard);
  },
  methods: {
    displayScore() {
      let trueResponse = 0;
      for (const value of Object.values(this.scoreBoard)) {
        if (value === true) {
          trueResponse++;
        }
      }
      this.createScoreMonde(this.playerName, trueResponse, this.scoreMax)
      return trueResponse;
    },
     createScoreMonde(name, score ,scoreMax) {
        db.collection("scoreMonde")
          .add({ name: name , score :score , scoreMax: scoreMax})
          .then(() => {
            console.log("Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
    }
  },
};
</script>
