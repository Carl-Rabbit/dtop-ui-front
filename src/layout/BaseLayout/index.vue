<template>
  <el-container>
    <el-aside width="auto">
      <SideMenu/>
    </el-aside>
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import SideMenu from "@/layout/BaseLayout/SideMenu"
  import Header from "@/layout/BaseLayout/Header"

  export default {
    name: 'BaseLayout',
    components: {
      SideMenu, Header
    }
  }
</script>

<style scoped>
  .el-header, .el-main, .el-container {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .el-container {
    height: 100%;
  }
  .el-main {
    background: #ffffff;
    box-shadow: inset 0 5px 10px -10px #454545;
  }
</style>
