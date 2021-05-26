<template>
  <div class="profiling">
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: 'Profiling',
    mounted() {
    },
    computed: {
      ...mapState({
        // clusterStatus: state => state.clusterStatus,
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
