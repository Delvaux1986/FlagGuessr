<template>
    <div>
        <Logo></Logo>
        <img
        src="@/assets/backgroundMenu.jpg"
        alt="background"
        class="background"
        />
        <div class="scoreBoardFinal">
            <h2>Tableau des scores</h2>
            <div @click="getDataFrom('scoreMonde')" key="this.scoreData" class="buttonScore">Score Monde (5,10,15,20)</div>
            <div v-for="(score ) in this.scoreData" :key="score.id">
                <p>{{score.name }} : {{score.score}}/{{score.scoreMax}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
import firebase from "../firebaseInit"
const db = firebase.firestore();


export default {
    components : {
        Logo
    },
    data() {
        return{
            scoreData : []
        }
    },
    methods : {
        getDataFrom(mode){
            let data = [];
            db.collection(mode)
                .get()
                .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                data.push({
                    id: doc.id,
                    name: doc.data().name,
                    score : doc.data().score,
                    scoreMax : doc.data().scoreMax 
                    });
                    
                });
                this.scoreData = data
                console.log(this.scoreData)
                })
                .catch((error) => {
                console.log("Error getting documents: ", error);
                });
        }
    }
}
</script>