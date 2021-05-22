<template>
  <div class="overview">
    {{ data }}
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: 'Overview',
    mounted() {
      this.$store.dispatch("getClusterStatus")
    },
    computed: {
      ...mapState({
        data: state => state.machines,
      })
    }
  }
</script>

<style scoped>
  .overview {
    height: 100%;
    width: 100%;
  }
</style>
