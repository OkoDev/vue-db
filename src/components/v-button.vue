<template>
  <button class="btn btn-sm">
    <i class="material-icons prepend" v-if="prependIcon">{{ prependIcon }}</i>
    {{ title }}
    <i class="material-icons append" v-if="appendIcon">{{ appendIcon }}</i>
  </button>
</template>

<script>

export default {
  name: 'vButton',
  props: {
    title: {
      type: String,
      default: ''
    },
    appendIcon: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  $icon-margin: 5px;

  .material-icons {
    font-size: 16px;

  }

  .prepend {
    margin-right: $icon-margin;
  }

  .append {
    margin-left: $icon-margin;
  }
}

</style>
