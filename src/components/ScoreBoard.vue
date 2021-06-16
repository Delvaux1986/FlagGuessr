<template>
  <div>
    <div class="scoreBoardFinal">
      <p>Bravo vous avez Fini le jeu .<br />Voici vos réponses :</p>
      <p>
        Vous avez obtenu :
        <span class="score">{{ displayScore() }} / {{ this.scoreMax }}</span>
      </p>
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
    
  },
};
</script>
