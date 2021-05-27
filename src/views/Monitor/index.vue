<template>
  <div class="monitor">
    <el-card style="width: 100%; height: 100%; overflow: scroll">
      <div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: 'Monitor',
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
.monitor {
  margin: 50px;
  height: calc(100% - 50px * 2);
  width: calc(100% - 50px * 2);
}
</style>
