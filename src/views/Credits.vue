<template>
    <div class="credits">
        <Logo></Logo>
        <img
        src="@/assets/backgroundMenu.jpg"
        alt="background"
        class="background"
        />
        <div class="flag">
            <div class="flagwave"></div>
            <div class="flagtxt">FlagGéo Crédits<br>
            Petit jeu réalisé en Vuejs par Robby Delvaux<br>
            Se jeu comportera plusieurs modes et des tableaux <br> des scores des meilleures résultats <br>
            PS : l'animation sera refaite !!!<br>
            Quelques lien utiles : <br>
                - <a href="https://robby-delvaux.Be">Mon site web</a><br>
                - <a href="https://github.com/Delvaux1986">Mon github</a><br>
                - <a href="https://www.linkedin.com/in/robby-delvaux/">LinkedIn</a><br>
            
            </div>
        </div>
    </div>
</template>

<script>
import Logo from '../components/Logo.vue'
export default {
    components:{
        Logo
    },
    setup() {
        
    },
}
</script>