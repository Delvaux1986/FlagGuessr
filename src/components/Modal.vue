<template>
  <div>
    <transition name="modal-fade">
      <div class="modal-backdrop">
        <div v-if="this.scoreBoard.score > this.scoreBoard.roundSelected / 2">
          <div class="modal-success">
            <div class="headerModal">
              Bravo {{ this.scoreBoard.playerName }} !!!
            </div>
            <div class="bodyModal">
              Vous avez obtenu {{ this.scoreBoard.score }} /
              {{ this.scoreBoard.roundSelected }}
            </div>

            <div class="footerModal">
              <button
                type="button buttonModalSuccess"
                class="btn-endGame"
                @click="closeScoreBoardFinal"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="modal-wrong">
            <div class="headerModal">
              Peu mieux faire {{ this.scoreBoard.playerName }} !!!
            </div>
            <div class="bodyModal">
              Vous avez obtenu {{ this.scoreBoard.score }} /
              {{ this.scoreBoard.roundSelected }}
            </div>

            <div class="footerModal">
              <button
                type="button buttonModalWrong"
                class="btn-endGame"
                @click="closeScoreBoardFinal"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import firebase from "../firebaseInit";
const db = firebase.firestore();

export default {
  name: "Response",
  props: {
    scoreBoard: Object,
  },
  data() {
    return {};
  },
  methods: {
    closeScoreBoardFinal() {
      this.$emit("closeScoreBoardFinal");
    },
    recordThisGame() {
      db.collection(this.scoreBoard.mode)
        .add({ name: this.scoreBoard.playerName , score: this.scoreBoard.score, scoreMax: this.scoreBoard.scoreMax })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  mounted() {
    console.log(this.scoreBoard);
    this.recordThisGame()
  },
};
</script>

<style>
</style>