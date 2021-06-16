<template>
  <div class="game">
    <Modal
      v-show="this.isModalVisible"
      :scoreBoard="this.gameScoreBord"
      :key="this.gameScoreBord.isFinish"
      @closeScoreBoardFinal="resetGame()"
    >
    </Modal>
    <Logo v-if="!this.gameScoreBord.isRunning"></Logo>
    <img
      src="@/assets/backgroundMenu.jpg"
      alt="background"
      class="background"
      v-if="this.gameScoreBord.isSettings === false"
    />
    <form
      @submit.prevent="setupGame"
      class="gameSettings"
      v-if="this.gameScoreBord.isSettings === false"
    >
      <label for="playerName">Nom du joueur</label><br />
      <input
        type="text"
        name="playerName"
        id="playerName"
        v-model="form.playerName"
      /><br />
      <select name="mode" id="mode" v-model="form.modeSelected">
        <option value="none" selected></option>
        <option value="locateByName">Situer avec le Nom</option>
        <option value="locateByFlag">Situer avec le Drapeau</option>
        <!-- <option value="discoverNameByFlag"></option> -->
      </select><br />
      <select
        name="numberOfRound"
        id="numberOfRound"
        v-model="form.numberOfRound"
        v-if="this.form.modeSelected != 'none' "
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option></select
      ><br />
      <input type="submit" value="Play" class="buttonPlay" />
    </form>
    <!-- MODE LOCATED BY NAME -->
    <World
      v-if="this.gameScoreBord.modeSelected === 'locateByName'"
      :scoreBoard="this.gameScoreBord"
      :current="this.gameScoreBord.current"
      :key="this.gameScoreBord.current"
      @nextQuestion="updateScoreBoard"
      id="mapGame"
    ></World>
    <!-- MODE LOCATED BY FLAG -->
    <World
      v-if="this.gameScoreBord.modeSelected === 'locateByFlag'"
      :scoreBoard="this.gameScoreBord"
      :current="this.gameScoreBord.current"
      :key="this.gameScoreBord.current"
      @nextQuestion="updateScoreBoard"
      id="mapGame"
    ></World>
  </div>
</template>




<script>
import Modal from "../components/Modal.vue";
import World from "../components/World.vue";
import Logo from "../components/Logo.vue";
import firebase from "../firebaseInit";
const db = firebase.firestore();

export default {
  components: {
    Logo,
    World,
    Modal,
  },
  props: {},
  data() {
    return {
      gameList: [],
      isModalVisible: false,
      result: [],
      gameScoreBord: {
        isSettings: false,
        isRunning: false,
        isFinish: false,
        roundSelected: 0,
        current: 1,
        answers: {},
        score: 0,
        playerName: "",
        modeSelected : "none"
      },
      form: {
        numberOfRound: 0,
        playerName: "",
        modeSelected : "none"
      },
    };
  },
  methods: {
    setupGame() {
      this.gameScoreBord.roundSelected = parseInt(this.form.numberOfRound);
      this.gameScoreBord.modeSelected = this.form.modeSelected
      this.gameScoreBord.current = 1;
      this.gameScoreBord.isFinish = false;
      this.gameScoreBord.isRunning = true;
      this.gameScoreBord.isSettings = true
    },
    updateScoreBoard() {
      if (this.gameScoreBord.current != this.gameScoreBord.roundSelected) {
        this.result = [
          this.gameScoreBord.current,
          this.gameScoreBord.goodAnswer,
        ];
        this.gameScoreBord.current = this.gameScoreBord.current + 1;
      } else {
        this.result = [
          this.gameScoreBord.current,
          this.gameScoreBord.goodAnswer,
        ];
        document.getElementById("mapGame").style.display = "none";
        this.gameScoreBord.isFinish = true;
        this.gameScoreBord.playerName = this.form.playerName;
        this.isModalVisible = true
        this.calcScore();
        
      }
    },
    resetGame() {
      this.isModalVisible = false;
      this.gameScoreBord =  {
        isSettings: false,
        isRunning: false,
        isFinish: false,
        roundSelected: 0,
        current: 1,
        answers: {},
        score: 0,
        playerName: "",
      }
    },
    // IF FINNISH CALCULATE SCORE EN DISPLAY IT IN MODAL
    calcScore() {
      let calcScore = 0;
      for (const value of Object.values(this.gameScoreBord.answers)) {
        if (value === true) {
          calcScore++;
        }
      }
      this.gameScoreBord.score = calcScore;
      // this.createScoreMonde(this.playerName, trueResponse, this.scoreMax);
    },
    createScoreMonde(name, score, scoreMax) {
      db.collection("scoreMonde")
        .add({ name: name, score: score, scoreMax: scoreMax })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  beforeMount() {},
  mounted() {},
};
</script>


<style>
</style>
