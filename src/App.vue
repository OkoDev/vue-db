<template>
  <div id="app">
    <Table/>
  </div>
</template>

<script>

import Table from './components/Table.vue'

export default {
  name: 'App',
  components: {
    Table,
  },
  methods: {}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 50px;
}
</style>


