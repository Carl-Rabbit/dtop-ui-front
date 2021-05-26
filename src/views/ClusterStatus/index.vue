<template>
  <div class="cluster-status">
    <div class="main-container">
      <el-row style="width: 100%; height: 100%;">
        <el-col :span="3" style="height: 100%; text-align: center;">
          <el-row>
            <icon v-show="connect" name="cluster-blue" class="icon-cluster-blue"/>
            <icon v-show="!connect" name="cluster-gray" class="icon-cluster-gray"/>
          </el-row>
          <el-row style="margin-top: 20px;">
            <div v-show="connect" class="connect-circle"/>
            <div v-show="!connect" class="disconnect-circle"/>
            <span class="connect-text">{{ connect ? 'Connect' : 'Disconnect' }}</span>
            <el-button id="refresh-btn" size="mini" @click="refreshStatus">Refresh</el-button>
          </el-row>
          <el-row style="margin-top: 10px">
            <span>Update time: {{ clusterStatusUpdateTime }}</span>
          </el-row>
        </el-col>

        <el-col :span="20" :offset="1" style="height: 100%;">
          <el-card class="main-card">
            <el-table
                    :data="clusterStatus.serverStatusArr"
                    style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                          :data="props.row.workerStatusArr"
                          style="width: 100%">
                    <el-table-column
                            label="Worker Name"
                            prop="workerName">
                    </el-table-column>
                    <el-table-column
                            label="Status"
                            prop="status">
                    </el-table-column>
                    <el-table-column
                            label="Futures">
                      <template slot-scope="props">
                        <div v-for="(future, i) in props.row.futures" :key="'f'+i">
                          <span>{{future.label + " : " + future.desc}}</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                            label="">
                      <template slot-scope="props" >
                        <el-button @click="switchWorkerStatus(props.row)">Switch</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                      label="Address"
                      prop="addr">
              </el-table-column>
              <el-table-column
                      label="Status"
                      prop="status">
              </el-table-column>
              <el-table-column
                      label="Mounted Worker Number"
                      prop="workerNum">
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
      </el-row>
<!--      <el-row>-->
<!--        <el-col :span="10">-->
<!--        </el-col>-->
<!--        <el-col :span="10" :offset="4">-->
<!--          <el-card class="status-card">-->
<!--            <el-form label-position="left" inline class="demo-table-expand">-->
<!--              <el-form-item label="商品名称">-->
<!--                <span>{{ 'xx' }}</span>-->
<!--              </el-form-item>-->
<!--              <el-form-item label="所属店铺">-->
<!--                <span>{{ 'yy' }}</span>-->
<!--              </el-form-item>-->
<!--            </el-form>-->
<!--          </el-card>-->
<!--        </el-col>-->
<!--      </el-row>-->

    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: 'ClusterStatus',
    data() {
      return {
        serverAddr: '',
      }
    },
    methods: {
      refreshStatus() {
        this.$store.dispatch("profile/getClusterStatus")
      },
      switchWorkerStatus (worker) {
        console.log('switch worker status ', worker)
        this.$store.dispatch("profile/switchWorkerStatus", {
          addr: worker.serverAddr,
          workerName: worker.workerName,
          cmdType: worker.status === "RUNNING" ? "PAUSE" : "START"
        })
      }
    },
    mounted() {
      this.refreshStatus()
    },
    computed: {
      ...mapState('profile', {
        connect: state => state.connect,
        clusterStatus: state => state.clusterStatus,
        clusterStatusUpdateTime: state => state.clusterStatusUpdateTime,
      })
    }
  }
</script>

<style scoped>
  .cluster-status {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  .main-container {
    margin: 50px;
    height: calc(100% - 50px * 2);
    width: calc(100% - 50px * 2);
    /*background: red;*/
  }

  .main-card {
    height: 100%;
    width: 100%;
  }

  .icon-cluster-blue, .icon-cluster-gray {
    width: 150px;
    height: 150px;
  }

  .connect-circle, .disconnect-circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .connect-circle {
    border: 1px solid limegreen;
    background-color: limegreen;
  }

  .disconnect-circle {
    border: 1px solid #f35757;
    background-color: #f35757;
  }

  #refresh-btn {
    margin-left: 10px;
    position: relative;
    top: -3px;
  }


  .connect-text {
    /*font-weight: bold;*/
    font-size: 1.5rem;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
