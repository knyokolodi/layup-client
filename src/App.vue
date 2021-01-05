<style>
@import '../src/styles/bootstrap.min.css';
</style>

<template>
  <Header />
  <router-view />
</template>

<script>
// @ is an alias to /src
import Header from './views/Header.vue';

export default {
  name: 'Home',
  components: {
    Header,
  },
};
</script>
