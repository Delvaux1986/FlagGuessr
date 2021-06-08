<template>
  <div class="game">
    <Logo></Logo>
    <img
      src="@/assets/backgroundMenu.jpg"
      alt="background"
      class="background"
      v-if="this.gameScoreBord.isSettings === false"
    />
    <form
      @submit.prevent="numberOfRoundSelect"
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
      <select
        name="numberOfRound"
        id="numberOfRound"
        v-model="form.numberOfRound"
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option></select
      ><br />
      <input type="submit" value="Play" class="buttonPlay" />
    </form>
    <World
      v-if="this.gameScoreBord.isSettings === true"
      :scoreBoard="this.gameScoreBord"
      :current="this.gameScoreBord.current"
      :key="this.gameScoreBord.current"
      @nextQuestion="updateScoreBoard"
      id="mapGame"
    ></World>
    <ScoreBoard
      :scoreBoard="this.gameScoreBord.answers"
      :scoreMax="this.gameScoreBord.roundSelected"
      :playerName="this.form.playerName"
      v-if="this.gameScoreBord.isFinish"
    ></ScoreBoard>
  </div>
</template>




<script>
import World from "../components/World.vue";
import ScoreBoard from "../components/ScoreBoard.vue";
import Logo from "../components/Logo.vue";

export default {
  components: {
    Logo,
    World,
    ScoreBoard,
  },
  props: {},
  data() {
    return {
      gameList: [],
      result: [],
      gameScoreBord: {
        isSettings: false,
        isRunning: false,
        isFinish: false,
        roundSelected: 0,
        current: 1,
        answers: {},
      },
      form: {
        numberOfRound: 0,
        playerName: "",
      },
    };
  },
  methods: {
    numberOfRoundSelect() {
      this.gameScoreBord.roundSelected = this.form.numberOfRound;
      this.gameScoreBord.current = 1;
      this.gameScoreBord.isFinish = false;
      this.gameScoreBord.isSettings = true;
      this.gameScoreBord.isRunning = true;
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
        this.gameFinnish();
      }
    },
    gameFinnish() {
      document.getElementById("mapGame").style.display = "none";
      this.gameScoreBord.isFinish = true
      this.gameScoreBord.isRunning = false
      this.gameScoreBord.isSettings = false
    },
  },
  beforeMount() {},
  mounted() {},
};
</script>

