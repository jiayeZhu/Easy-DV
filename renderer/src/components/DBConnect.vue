<template>
  <div class='dbconnector'>
    <h1>连接数据库</h1>
    <Row type="flex" id="input-row">
      <Select v-model="dbtype" clearable size="large" style="width: calc( 0.3 * ( 100% - 102px ) )" placeholder="选择数据库类型（暂只支持MongoDB）">
        <Option v-for="item in dbSupportList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="dburl" size="large" placeholder="填写数据库连接地址" style="width:calc( 0.65 * ( 100% - 102px ) )"></Input>
      <Button  shape="circle" size="large" @click="connectDB" style="width:10">连接数据库</Button>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <h3 v-if="!spinShow">{{connectionMsg}}</h3>

    <Button @click="load">打开可视化数据存档</Button>
  </div>
</template>

<script>
const IPCHandler = require('../IPCHandler');
import * as MT  from '../vuex/mutation-types';

export default {
  name:'DBPage',
  data () {
    return {
      dbtype:'mongodb',
      dburl:'127.0.0.1/easy-dv',
      connectionMsg:'',
      spinShow:false,
      dbSupportList:[
        {
          value:'mongodb',
          label:'MongoDB'
        },
      ]
    }
  },
  methods:{
    async connectDB () {
      this.spinShow = true;
      let err = await IPCHandler('connectDB',{url:this.dburl});
      if(err === null){
        this.connectionMsg='连接成功';
        this.toggleSpin();
        this.$store.commit(MT.CHANGE_STAGE_2_DATAFILTER);
        this.$router.push('datafilter');
        console.log('successfully connected to the database');
      }else{
        this.spinShow = false;
        this.connectionMsg='连接失败';
        console.warn('failed to connect to the database:',err);
      }
    },
    toggleSpin () {
      this.spinShow = !this.spinShow;
    },
    async load(){
      let data = await IPCHandler('load',{});
      console.log(data);
      this.toggleSpin();
      this.$store.commit(MT.CHANGE_STAGE_2_SHOW);
      this.$router.push('echart');
    }
  }
}
</script>

<style scoped>
  .dbconnector{
    padding: 1rem;
  }
  #input-row{
    padding: 1rem 0;
    justify-content: space-between;
  }
</style>


