<template>
  <div>
    <p>{{count}}</p>
    <p>current stage:{{currentStage}}</p>
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
    <div>
      <h1>aggregation framework</h1>
      <button @click="AddAggCondition">添加匹配条件</button>
      <ul>
        <li v-for="item in MatchItems">
          <Input v-model="item.obj" placeholder="匹配对象" style="width:22%"></Input>
          <Input v-model="item.operator" placeholder="匹配算符" style="width:22%"></Input>
          <Input v-model="item.content" placeholder="匹配内容" style="width:22%"></Input>
        </li>
      </ul>
      <button @click="aggTest">聚合查询</button>
    </div>

  </div>
</template>

<script>

import * as MT  from '../vuex/mutation-types';
//  const ipc = window.require('electron').ipcRenderer;
 const IPCHandler = require('../IPCHandler');


  export default {
    data () {
      return {
        count:1,
        mongourl:'127.0.0.1:27017/easy-dv',
        MatchItems:[{
//          method:'$match',
          obj:'a',
          operator:'$regex',
          content:''
        }]
      }
    },
    computed: {
      getterMain () {
        return this.$store.getters.mainCounter;
      },
      currentStage () {
        return this.$store.getters.currentStage;
      }
    },
    methods:{
      add () {
        this.$store.commit(MT.INCREMENT_MAIN_COUNTER)
      },
      sub () {
        this.$store.commit(MT.DECREMENT_MAIN_COUNTER)
      },
      test () {
        IPCHandler('getDB').then(console.log);

      },
      AddAggCondition () {
        this.MatchItems.push({obj:'',operator:'',content:''});
      },
      async connectDB () {
        // console.log(this.mongourl);
        let err = await IPCHandler('connectDB',{url:this.mongourl});
        if(err === null){
           console.log('successfully connected to the database');
        }else{
          console.warn('failed to connect to the database:',err);
        }
      },
      aggTest () {
        // let channel = createChannel();
        let aggregationQuery = [];
        this.MatchItems.forEach( e => {
          let $match = {};
          if ([e.content, e.obj, e.operator].map(_=>_.trim()).includes('')) {
//            debugger;
            this.$Message.warning('有空');
            return;
          }
          $match[e.obj] = {};
          $match[e.obj][e.operator] = e.content;
          if (e.operator === '$regex') {
            $match[e.obj]['$options'] = 'i';
            $match[e.obj][e.operator] = $match[e.obj][e.operator].split(' ').filter(e=>(e!=="")).join('|');
          }
          aggregationQuery.push({$match});
        } );

        if (aggregationQuery.length === 0) {
          return;
        }

        for (let query of aggregationQuery) {
          console.log(JSON.stringify(query));
        }

        IPCHandler('aggTest',{AggItems:aggregationQuery}).then(console.log);

        // ipc.send('aggtest',{channel,AggItems:aggregationQuery});
        // console.log('send');
        // ipc.once(channel,(event,arg)=>{
        //   console.log(arg);
        // })
      }
    }
  }
</script>
