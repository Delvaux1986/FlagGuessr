<template>
    <div class="homeMenu">
        <button @click="launchGame" class="menuButton">Start</button>
        <button @click="showScores" class="menuButton">Tableau des scores</button>
        <button @click="showCredit" class="menuButton">Crédits</button>
    </div>
</template>


<script>
    export default {
        setup() {
            
        },
        data(){
            return {
                
            }
        },
        methods : {
            launchGame(){
                this.$router.push('/game')
            },
            showScores(){
                this.$router.push('/tableaudesscores')
            },
            showCredit(){
                this.$router.push('/credits')
            }
        }
    }
</script>


<style>
    
</style>