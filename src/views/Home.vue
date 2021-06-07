<template>
  <div class="home">
    <Logo></Logo>
    <img src="@/assets/backgroundMenu.jpg" alt="background" class="background">
      <HomeMenu></HomeMenu>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMenu from './HomeMenu.vue'
import Logo from '../components/Logo.vue'

export default {
  name: 'Home',
  components: {
    HomeMenu,
    Logo
  }
}
</script>



