<!--<template>-->
<!--  <div class="profiling">-->
<!--    <el-table-->
<!--        :data="fetchReplyArr"-->
<!--        style="width: 100%">-->
<!--      <el-table-column type="expand">-->
<!--        <template slot-scope="props">-->
<!--          <el-table-->
<!--              :data="props.row.memLeakMessage === {} ? props.row.memLeakMessage : []"-->
<!--              style="width: 100%">-->
<!--            <el-table-column-->
<!--                label="time"-->
<!--                prop="time">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="pid"-->
<!--                prop="pid">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="size"-->
<!--                prop="size">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="addr"-->
<!--                prop="addr">-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--                label="caller"-->
<!--                prop="caller">-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          label="Address"-->
<!--          prop="addr">-->
<!--      </el-table-column>-->
<!--    </el-table>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import {mapState} from "vuex"-->

<!--export default {-->
<!--  name: 'Profiling',-->
<!--  methods: {-->
<!--    updateClusterMetric() {-->
<!--      this.$store.dispatch('profile/getClusterMetric', [-->
<!--        {-->
<!--          addr: '',-->
<!--          futureArr: [-->
<!--            // 'REPORT_MEM_USAGE',-->
<!--            // 'REPORT_PROC_MEM',-->
<!--            'REPORT_MEM_LEAK'-->
<!--          ],-->
<!--          paramArr: ['',],-->
<!--        },-->
<!--        // {-->
<!--        //   addr: '',-->
<!--        //   futureArr: [''],-->
<!--        //   paramArr: [''],-->
<!--        // },-->
<!--      ])-->
<!--    }-->
<!--  },-->
<!--  mounted() {-->
<!--    this.updateClusterMetric()-->
<!--  },-->
<!--  computed: {-->
<!--    ...mapState('profile', {-->
<!--      clusterMetric: state => state.clusterMetric,-->
<!--    }),-->
<!--    fetchReplyArr() {-->
<!--      console.log(this.clusterMetric)-->
<!--      return this.clusterMetric ? this.clusterMetric.fetchReplyArr : []-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--.overview {-->
<!--  height: 100%;-->
<!--  width: 100%;-->
<!--}-->
<!--</style>-->
