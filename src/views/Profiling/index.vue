<template>
  <div class="profiling">
    <el-card style="width: 100%; height: 100%; overflow: scroll">

      <el-row class="button-row">
        <el-button @click="openProcDialog" type="primary">Processes to trace</el-button>
        <el-dialog
            title="Processes to trace"
            :visible.sync="dialogVisible"
            width="30%">
          <el-form ref="procForm" :model="procForm" label-width="150px">
            <el-form-item label="Address">
              <el-input v-model="procForm.addr"/>
            </el-form-item>
            <el-form-item label="Add process">
              <el-input v-model="procForm.addProcArr"/>
            </el-form-item>
            <el-form-item label="Remove process">
              <el-input v-model="procForm.rmvProcArr"/>
            </el-form-item>
            <p v-for="tracedProcItem in tracedProcTexts" :key="tracedProcItem.addr">
              {{tracedProcItem.addr + ' : ' + tracedProcItem.procStr}}
            </p>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeProcDialog">Cancel</el-button>
            <el-button type="primary" @click="closeProcDialog(); modifyProc();">OK</el-button>
          </span>
        </el-dialog>
      </el-row>

      <el-table
          :data="fetchReplyArr"
          border
          style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">

            <el-table
                v-if="props.row.memLeakMessage.mallocEntryArr"
                :data="props.row.memLeakMessage.mallocEntryArr instanceof Array
                    ? props.row.memLeakMessage.mallocEntryArr : [props.row.memLeakMessage.mallocEntryArr]"
                border
                :max-height="400"
                style="width: 100%">
              <el-table-column
                  label="time"
                  prop="time"
                  :formatter="formatterDate">
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
                  prop="addr"
                  :formatter="formatterAddress">
              </el-table-column>
              <el-table-column
                  label="caller"
                  prop="caller"
                  :formatter="formatterAddress">
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
                               :prop="item"
                               :formatter="formatterDateRepeated">
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
import dateToString from "@/utils/time";

export default {
  name: 'Profiling',
  data() {
    return {
      dialogVisible: false,
      procForm: {
        addr: null,
        addProcArr: '',
        rmvProcArr: '',
      },
      memUsageItems: [
        {label: 'Total', key: 'total'},
        {label: 'Available', key: 'available'},
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
    formatterAddress(row, col, val) {
      return '0x' + parseInt(val).toString(16)
    },
    formatterDate(row, col, val) {
      let date = new Date(parseInt(val) * 1000)
      return dateToString(date, 'yyyy-MM-dd HH:mm:ss')
    },
    formatterDateRepeated(row, col, val) {
      if (col.label === 'createTime') {
        return this.formatterDate(row, col, val)
      } else {
        return val
      }
    },
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
    },
    openProcDialog() {
      this.dialogVisible = true
      this.$store.dispatch('profile/getTracedProc')
    },
    closeProcDialog() {
      this.dialogVisible = false
    },
    modifyProc() {
      let paramStr = '0'
      if (this.procForm.addProcArr) {
        paramStr += ' ' + this.procForm.addProcArr
      }
      paramStr += '|0'
      if (this.procForm.rmvProcArr) {
        paramStr += ' ' + this.procForm.rmvProcArr
      }
      console.log(paramStr)
      this.$store.dispatch('profile/modifyTracedProc', {
        addr: this.procForm.addr,
        paramStr,
      })
    }
  },
  mounted() {
    this.updateClusterMetric()
  },
  computed: {
    ...mapState('profile', {
      clusterMetric: 'clusterMetric',
      tracedProc: 'tracedProc',
    }),
    fetchReplyArr() {
      console.log(this.clusterMetric)
      return this.clusterMetric ? this.clusterMetric.fetchReplyArr : []
    },
    tracedProcTexts() {
      console.log(this.tracedProc)
      let texts = []
      if (!this.tracedProc) {
        return texts
      }
      this.tracedProc.fetchReplyArr.forEach(reply => {
        let procStr = reply.infos ? reply.infos[0] : 'No process'
        procStr = procStr === '' ? 'No process' : procStr
        texts.push({addr: reply.addr, procStr: procStr})
      })
      return texts
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
.button-row {
  margin-bottom: 10px;
  margin-right: 40px;
  float: left;
}
</style>
