<template>
    <div>
        <transition name="modal-fade">
            <div class="modal-backdrop">
                <div class="modal">
                    <div class="headerModal">
                        Bravo {{ this.scoreBoard.playerName }} !!!
                    </div>
                    <div class="bodyModal">
                        Vous avez obtenu {{ this.scoreBoard.score }} / {{ this.scoreBoard.roundSelected}}
                    </div>

                    <div class="footerModal">
                        <button type="button" class="btn-endGame" @click="closeScoreBoardFinal">
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>



    export default {
        name: 'Response',
        props: {
            scoreBoard: Object,
        },
        data(){
            return {
                
            }
        },
        methods: {
            closeScoreBoardFinal() {
                this.$emit('closeScoreBoardFinal');
            },
            
            
        },
        mounted(){
            console.log(this.scoreBoard)
        }
    }
</script>

<style>



</style>