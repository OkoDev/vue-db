<template>
  <input type="button"
         @click="click"/>
</template>

<script>
export default {
  name: "Button",
  methods: {
    click() {
      this.$emit("click")
    }
  }
}
</script>

<style scoped>

</style>