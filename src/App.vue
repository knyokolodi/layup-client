<style>
@import '../src/styles/bootstrap.min.css';
</style>

<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
// @ is an alias to /src
import Header from './views/Header.vue';
import Footer from './views/Footer';

export default {
  name: 'Home',
  components: {
    Header,
    Footer,
  },
};
</script>
