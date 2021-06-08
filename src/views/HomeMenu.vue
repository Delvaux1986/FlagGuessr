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
    .menuButton {
        width:300px;
        height: 100px;
        margin-top:5em;
        color:white;
        font-size: 24px;   
        background: -webkit-linear-gradient(178deg, rgb(22, 61, 237), rgb(20, 90, 74));
        background: linear-gradient(178deg, rgb(22, 61, 237), rgb(20, 90, 74));

    }
    .menuButton:hover{
        cursor: pointer;
        color:crimson;
    }
    
    .homeMenu{
        
        margin-top:5em;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        
        

    }
</style>