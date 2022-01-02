<template>
  <router-link class="router-link" :to="to">
    <img class="bar-logo" src="../../assets/logo.png" alt="Logo"/>
    <span class="md-title">Culture HUB</span>
  </router-link>
</template>

<script lang="ts">
export default {
  name: 'ToolbarMainLink',
  props: {
    to: {
      type: String,
      default: '/home'
    }
  }
};
</script>

<style scoped>

</style>