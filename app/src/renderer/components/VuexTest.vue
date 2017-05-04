<template>
  <!--<div>{{count}}</div>-->
  <div>
    <p>{{count}}</p>
    <p>getter:{{getterMain}}</p>
    <p>
      <button @click="add">add</button>
      <button @click="sub">sub</button>
      <button @click="test">ipc</button>
    </p>
    <p>
      <label>mongodb://</label><input type="text" v-model="mongourl">
      <button @click="connectDB">连接数据库</button>
    </p>
    <p>
      <h1>aggregation framework</h1>
      <button @click="showAgg">点击添加条件</button>
      <ul>
        <li v-for="item in AggItems">
          <input v-model="item.method">
          <input v-model="item.content">
        </li>
      </ul>
      <button @click="aggTest">聚合查询</button>
    </p>
  </div>
</template>

<script>
  import * as MT from '../vuex/mutation-types';
  const ipc = require('electron').ipcRenderer;
  const createChannel = ()=>{
    return (new Date().getTime() + Math.random() * 10e13).toString(36);
  };
  export default {
    data () {
      return {
        count:1,
        mongourl:'127.0.0.1:27017/easy-dv',
        AggItems:[{
          method:'$match',
          content:'{"b":"c"}'
        }]
      }
    },
    computed: {
      getterMain () {
        return this.$store.getters.mainCounter;
      }
    },
    methods:{
      add () {
        this.$store.commit(MT.INCREMENT_MAIN_COUNTER)
      },
      sub () {
        this.$store.commit(MT.DECREMENT_MAIN_COUNTER)
      },
//      ipctest () {
//        const reply = ipc.sendSync('syncMsg',{data:1,data2:'a',data3:false});
//        console.log(reply);
//      },
      test () {
        let channel = createChannel();
        console.log(channel);
        ipc.send('getDB',{channel:channel});
        ipc.once(channel,(event,arg)=>{
          console.log(arg);
        });
      },
      connectDB () {
        console.log(this.mongourl);
        ipc.send('connect-db',{url:this.mongourl});
        ipc.once('db-response',(event,arg)=>{
          console.log(arg);
        })
      },
      showAgg () {
        console.log(this.AggItems[0].content);
        console.log(JSON.parse(this.AggItems[0].content));
      },
      aggTest () {
        let channel = createChannel();
        ipc.send('aggtest',{channel});
        console.log('send');
        ipc.once(channel,(event,arg)=>{
          console.log(arg);
        })
      }
    }
  }
</script>

<style scope>

</style>