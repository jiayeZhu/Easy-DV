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
          text: 'ECharts Hello World'
        },
        tooltip: {},
        xAxis: {
          data: ['Shirt', 'Sweater', 'Chiffon Shirt', 'Pants', 'High Heels', 'Socks']
        },
        yAxis: {},
        series: [{
          name: 'Sales',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
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
