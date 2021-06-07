<template>
    <div class="question">
        <div class="flag" id="flag">
            <img :src="this.country.flag" alt="flag to Discoverrrrr" width="400" height="200">
        </div> 
        <div class="wordToGuess" id="wordToGuess">
            {{hiddeCountryName(this.country.name)}}
        </div>
        <form @submit.prevent="checkAnswer">
            <input type="text" name="reponse" id="reponse" />

        </form>

    </div>
</template>


<script>
export default {
    props: {
        country : Object,
    },
    mounted(){
        console.log(this.country)
    },
    methods:{
        hiddeCountryName(name){
            let toGuess = ''
            for(let i = 0 ; i < name.length ; i++){
                 toGuess += '_ '
            }
            return toGuess;
        },
        checkAnswer(){
            
        }
        
    }
}
</script>


<style>
.question{
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    height:100%;
    margin:auto;
    margin-top: auto;
    
}
.wordToGuess{
    color:black;
    font-size: 35px;
}

</style>