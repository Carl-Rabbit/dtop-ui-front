<template>
  <div class="side-menu">
    <el-menu :default-active="this.$route.name"
             class="el-menu-vertical-demo"
             id="left-bar"
             @open="handleOpen" @close="handleClose"
             @select="handleSelect"
             background-color="#304156"
             text-color="#bfcbd9"
             active-text-color="#4392f9"
             :collapse="isCollapse" style="height: 100%">
<!--      <div class="head-title">-->
<!--        <p style="margin-left: 5px; font-size: 22px; color: #adadad">DTop UI</p>-->
<!--      </div>-->

      <el-menu-item index="ClusterStatus">
        <i class="el-icon-notebook-1"></i>
        <span slot="title">Cluster Status</span>
      </el-menu-item>

      <el-menu-item index="Profiling">
        <i class="el-icon-s-home"></i>
        <span slot="title">Profiling</span>
      </el-menu-item>

      <el-menu-item index="Monitor">
        <i class="el-icon-monitor"></i>
        <span slot="title">Monitor</span>
      </el-menu-item>
    </el-menu>

    <el-radio-group v-model="isCollapse" class="collapse-buttons">
      <el-button circle v-show="!isCollapse" class="el-icon-s-fold" @click="isCollapse=true"></el-button>
      <el-button circle v-show="isCollapse" class="el-icon-s-unfold" @click="isCollapse=false"></el-button>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    name: "SideMenu",
    data () {
      return {
        isCollapse: false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
        if (key.indexOf("@") !== -1) {
          console.log('Not finished')
        } else {
          this.$router.push({name: key})
        }
      }
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 100%;
    margin: 0;
    padding: 0;
    text-align: left;
  }

  .el-radio-group > .el-button {
    font-size: 16px;
  }

  .side-menu {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .collapse-buttons {
    position: relative;
    float: right;
    top: -60px;
    right: 15px;
  }

  .head-title {
    overflow: hidden;
  }

</style>
