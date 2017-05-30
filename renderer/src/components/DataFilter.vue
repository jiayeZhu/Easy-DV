<template>
  <div>
      <h1>Aggregation Framework</h1>
      <Button @click="toggleModal">添加聚合操作</Button>
      <Button @click="barDataRequest">data</Button>
      <div>
        <div v-for="pipe in aggPipLine">
          <h2>$match</h2>
          <p>{{pipe}}</p>
          <!--<p v-for="item in handleMatch(pipe)">
            <span>{{item.itemName}}</span>
            <span>{{item.matchOperator}}</span>
            <span>{{item.targetName}}</span>
          </p>-->
          <!--<span>{{handleMatch(pipe)[0]}}</span>
          <span>{{handleMatch(pipe)[1]}}</span>
          <span>{{handleMatch(pipe)[2]}}</span>-->
        </div>

      </div>
      
     

      <Modal v-model="modal" title="添加一个聚合操作工作" @on-ok="addAgg" @on-cancel="cancel">
        <Select v-model="aggOperator" clearable style="width:200px">
          <Option v-for="operator in operators" :value="operator.value" :key="operator">{{ operator.label }}</Option>
        </Select>
        <Button v-if=" aggOperator !== '' " @click="addMathItem">添加条件</Button>
        <div v-if='aggOperator==="$match"' style="margin:1rem 0;">
          <Row v-for="item in matchPipeLine" :key='item' type='flex' justify='space-between' style="margin:0.5rem 0;">
            <Input v-model="item.itemName" placeholder="匹配对象" style="width:30%"></Input>
            <Input v-model="item.matchOperator" placeholder="匹配算符" style="width:30%"></Input>
            <Input v-model="item.targetName" placeholder="匹配内容" style="width:30%"></Input>
          </Row>
        </div>
      </Modal>
      <!--<button @click="AddAggCondition">添加匹配条件</button>
      <ul>
        <li v-for="item in MatchItems">
          <Input v-model="item.obj" placeholder="匹配对象" style="width:22%"></Input>
          <Input v-model="item.operator" placeholder="匹配算符" style="width:22%"></Input>
          <Input v-model="item.content" placeholder="匹配内容" style="width:22%"></Input>
        </li>
      </ul>
      <button @click="aggTest">聚合查询</button>-->
    </div>
</template>

<script>
const channelHandler = require('../channelHandler');

export default {
  name:'datafilter',
  data () {
    return {
      modal:false,
      aggOperator:'',
      matchPipeLine:[
        {
          itemName:'',
          matchOperator:'',
          targetName:''
        }
      ],
      operators:[
        {
          value:'$match',
          label:'match'
        },
        {
          value:'$project',
          label:'project'
        },
        {
          value:'$limit',
          label:'limit'
        },
        {
          value:'$skip',
          label:'skip'
        },
        {
          value:'$unwind',
          label:'unwind'
        },
        {
          value:'$sort',
          label:'sort'
        },
        {
          value:'$count',
          label:'count'
        }
      ],
      aggPipLine:[
        
      ]
    }
  },
  computed:{

  },
  methods:{
    getFirstProp (obj) {
      return Object.keys(obj)[0];
    },
    handleMatch(obj){
      // let operator = this.getFirstProp(obj);
      let enumOperator = {
        '$eq':'等于',
        '$gt':'大于',
        '$gte':'大于等于',
        '$lt':'小于',
        '$lte':'小于等于'
      };
      let itemNames = Object.keys(obj.$match);
      console.log(itemNames);
      console.log(obj.$match);
      let rtn = [];
      itemNames.forEach ( name => {
        let itemName = name;
        let matchOperator = this.getFirstProp(obj.$match[name]);
        let targetName = obj.$match[name][matchOperator];
        rtn.push({
          itemName,matchOperator:enumOperator[matchOperator],targetName
        });
      });
      let itemName = this.getFirstProp(obj.$match);
      let operator = this.getFirstProp(obj.$match[itemName])
      let target = obj.$match[itemName][operator];
      return rtn;
    },
    toggleModal () {
      this.modal = !this.modal;
    },
    addAgg () {
      let pipe = {};
      switch (this.aggOperator){
        case '$match':
          let $match={};
          this.matchPipeLine.forEach( e => {
            if([e.targetName, e.itemName, e.matchOperator].map( _ => _.trim()).includes('')){
              this.$Message.warning('您有留空选项，将忽略留空行')
              return;
            }else{
              $match[e.itemName]={};
              $match[e.itemName][e.matchOperator] = e.targetName;
              console.log(e.matchOperator)
              if(e.matchOperator === '$regex'){
                $match[e.itemName]['$options'] = 'i';
                $match[e.itemName][e.matchOperator] = $match[e.itemName][e.matchOperator].split(' ').filter(e=>(e!=="")).join('|');
              }
            }
          } );
          this.aggPipLine.push({$match});

      }
      this.aggPipLine.push();
    },
    cancel () {
      this.aggOperator = '';
    },
    addMathItem () {
      this.matchPipeLine.push(
        {
          itemName:'',
          matchOperator:'',
          targetName:''
        }
      );
    },
    async barDataRequest () {
      let aggPipes = [
          {
              $group:{
                  _id:{date:'$date',method:'$method'},
                  count:{$sum:1}
              }
          },
          {
              $project:{
                  _id:0,
                  date:'$_id.date',
                  method:'$_id.method',
                  count:'$count'
              }
          },
          {
              $sort:{
                  date:1,
                  method:1
              }
          },
          {
              $group:{
                  _id:'$method',
                  frequency:{$push:'$count'},
              }
          },
          {
              $project:{
                  _id:0,
                  name:"$_id",
                  data:"$frequency",
                  type:'bar',
                  // stack:'总量',
              }
          }
      ];
      let result = await channelHandler('barData',{aggPipes});
      console.log(JSON.stringify(result));
    }
  },
}
</script>

<style scoped>

</style>


