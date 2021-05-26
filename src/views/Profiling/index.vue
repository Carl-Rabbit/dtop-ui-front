<template>
  <div class="profiling">
    <el-card style="width: 100%; height: 100%; overflow: scroll">
      <el-table
          :data="fetchReplyArr"
          border
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">

            <el-table
                v-if="props.row.memLeakMessage"
                :data="props.row.memLeakMessage instanceof Array
                    ? props.row.memLeakMessage : [props.row.memLeakMessage]"
                border
                style="width: 100%">
              <el-table-column
                  label="time"
                  prop="time">
              </el-table-column>
              <el-table-column
                  label="pid"
                  prop="pid">
              </el-table-column>
              <el-table-column
                  label="size"
                  prop="size">
              </el-table-column>
              <el-table-column
                  label="addr"
                  prop="addr">
              </el-table-column>
              <el-table-column
                  label="caller"
                  prop="caller">
              </el-table-column>
            </el-table>

            <br/>

            <el-table
                v-if="props.row.memUsageMessage"
                :data="computeMemUsageData(props.row.memUsageMessage)"
                border
                style="width: 100%">
              <el-table-column v-for="item in memUsageItems" :key="item.key"
                               :label="item.label"
                               :prop="item.key">
              </el-table-column>
            </el-table>

            <br/>

            <el-table
                v-if="props.row.memoryMonitorMessage"
                :data="props.row.memoryMonitorMessage.processArr"
                border
                style="width: 100%;" :height="'40%'" :max-height="'400px'">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-table
                      :data="props.row.threads"
                      border
                      style="width: 100%">
                    <el-table-column v-for="item in threadItems" :key="item.key"
                                     :label="item.label"
                                     :prop="item.key">
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column v-for="item in processItems" :key="item"
                               :label="item"
                               :prop="item">
              </el-table-column>
            </el-table>

          </template>
        </el-table-column>
        <el-table-column
            label="Address"
            prop="addr">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: 'Profiling',
  data() {
    return {
      memUsageItems: [
        {label: 'Total', key: 'total'},
        {label: 'Used', key: 'used'},
        {label: 'Active', key: 'active'},
        {label: 'Buffers', key: 'buffers'},
        {label: 'Cached', key: 'cached'},
        {label: 'Free', key: 'free'},
        {label: 'Inactive', key: 'inactive'},
      ],
      processItems: ['cmdline', 'createTime', 'name', 'pid', 'ppid', 'uid', 'username'],
      threadItems: [
        {label: 'TID', key: 'tid'},
        {label: 'Resident set size (Byte)', key: 'rss'},
        {label: 'Virtual memory size (Byte)', key: 'vms'},
        {label: 'Data', key: 'data'},
        {label: 'Shared', key: 'shared'},
        {label: 'Text', key: 'text'},
      ]
    }
  },
  methods: {
    updateClusterMetric() {
      this.$store.dispatch('profile/getClusterMetric', [
        {
          addr: '',
          futureArr: [
            'REPORT_MEM_USAGE',
            'REPORT_PROC_MEM',
            'REPORT_MEM_LEAK'
          ],
          paramArr: ['', '', ''],
        },
        // {
        //   addr: '',
        //   futureArr: [''],
        //   paramArr: [''],
        // },
      ])
    },
    computeMemUsageData(data) {
      if (!data) {
        return []
      }
      let ret = {}
      for (let item of this.memUsageItems) {
        let key = item.key
        ret[key] = (data[key] / Math.pow(2, 30)).toFixed(3) + ' G'
      }
      return [ret];
    }
  },
  mounted() {
    this.updateClusterMetric()
  },
  computed: {
    ...mapState('profile', {
      clusterMetric: state => state.clusterMetric,
    }),
    fetchReplyArr() {
      console.log(this.clusterMetric)
      return this.clusterMetric ? this.clusterMetric.fetchReplyArr : []
    }
  }
}
</script>

<style scoped>
.profiling {
  margin: 50px;
  height: calc(100% - 50px * 2);
  width: calc(100% - 50px * 2);
}
</style>
