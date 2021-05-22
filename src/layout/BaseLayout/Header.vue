<template>
  <div class="header">
    <div class="header-left">
      <p class="head-title">{{ this.$route.name }}</p>
    </div>
    <div class="header-right">
<!--      <p>right</p>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  .header-left {
    margin-left: 30px;
    margin-right: auto;
  }

  .header-right {
    margin-right: 30px;
  }

  .head-title {
    font-size: 1.5em;
    font-weight: bold;
  }

</style>
