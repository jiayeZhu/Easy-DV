<template>
  <div class='dbconnector'>
    <h1>连接数据库</h1>
    <Row type="flex" id="input-row">
      <Select v-model="dbtype" clearable size="large" style="width:30%" placeholder="选择数据库类型（暂只支持MongoDB）">
        <Option v-for="item in dbSupportList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Input v-model="dburl" size="large" placeholder="填写数据库连接地址" style="width:58%"></Input>
      <Button  shape="circle" size="large" @click="connectDB">连接数据库</Button>
    </Row>
    <Spin size="large" fix v-if="spinShow"></Spin>
    <h3 v-if="!spinShow">{{connectionMsg}}</h3>
  </div>
</template>

<script>
const channelHandler = require('../channelHandler');

export default {
  name:'DBPage',
  data () {
    return {
      dbtype:'',
      dburl:'',
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
        // console.log(this.mongourl);
        let err = await channelHandler('connectDB',{url:this.dburl});
        if(err === null){
          this.connectionMsg='连接成功';
          // this.$router.push('vuextest');
          const toggleSpin = ()=>{
            this.spinShow = !this.spinShow;
          }
          let router = this.$router;
          setTimeout(function() {
            toggleSpin();
            router.push('vuextest');
          }, 3000);
          console.log('successfully connected to the database');
        }else{
          this.spinShow = false;
          this.connectionMsg='连接失败';
          console.warn('failed to connect to the database:',err);
        }
      },
      toggleSpin () {
        this.spinShow = !this.spinShow;
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


