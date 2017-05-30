<template>
  <div>
    <IEcharts :option="bar" :loading="loading" :style="style" @ready="onReady" @click="onClick"></IEcharts>
    <button @click="doRandom">Random</button>
  </div>
</template>

<script>

import IEcharts from 'vue-echarts-v3';

export default {
  components:{
    IEcharts
  },
  data () {
    return {
      loading: false,
      bar: {
    title: {
        text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['mail','unionAds','videoAds','direct','SE','bing','baidu','google','other']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [{"data":[1045,1886,2258,4058,3915,3566,3085],"name":"unionAds","stack":"总量","type":"line"},{"data":[165,167,189,157,170,146,157],"name":"other","stack":"总量","type":"line"},{"data":[983,1807,2404,3905,4079,3510,3111],"name":"videoAds","stack":"总量","type":"line"},{"data":[318,336,760,1122,1189,741,328],"name":"mail","stack":"总量","type":"line"},{"data":[990,1942,2309,4051,3925,3627,3125],"name":"bing","stack":"总量","type":"line"},{"data":[342,353,793,1138,1205,755,335],"name":"direct","stack":"总量","type":"line"},{"data":[1010,1880,2296,4002,4028,3527,3170],"name":"google","stack":"总量","type":"line"},{"data":[1030,1938,2206,3943,3957,3507,3168],"name":"baidu","stack":"总量","type":"line"},{"data":[994,1899,2417,3929,4010,3508,3134],"name":"SE","stack":"总量","type":"line"}]
},
      style: {
        width:'100%',
        height:'300px'
      }
    }
  },
  methods:{
    doRandom() {
      const that = this;
      let data = [];
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min));
      }
      that.bar.series[0].data = data;
    },
    onReady(instance) {
      console.log(instance);
    },
    onClick(event, instance, echarts) {
      console.log(arguments);
    }
  }
}
</script>

<style scoped>

</style>
