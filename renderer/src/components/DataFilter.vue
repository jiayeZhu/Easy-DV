<template>
  <div>
      <Spin size="large" fix v-if="spinShow"></Spin>
      <h1>数据选取与处理</h1>
      <Select v-model="aggOperator" clearable style="width:200px">
        <Option v-for="operator in operators" :value="operator.value" :key="operator">{{ operator.label }}</Option>
      </Select>
      <Button @click="addPipe(aggOperator)">添加</Button>
      <Button @click="airdataRequest" type='primary'>下一步</Button>
      <!-- <Button @click="toggleModal">添加聚合操作</Button> -->
      <!-- <Button @click="airdataRequest">data</Button> -->
      <div>
        <div v-for="pipe in aggPipLine" style="margin: 10px 0">
          <div v-if='pipe.type == "$match"'>
            <h2>{{pipeName(pipe)}}</h2>
            <Input v-model="pipe.data.a" placeholder="匹配对象" style="width:30%"></Input>
            <Select v-model="pipe.data.operator" placeholder="匹配方式" clearable style="width:20%">
              <Option v-for="operator in MatchOpe" :value="operator.value" :key="operator">{{ operator.label }}</Option>
            </Select>
            <Input v-model="pipe.data.b" placeholder="匹配值" style="width:30%"></Input>
            <Checkbox v-model="pipe.data.isNum" style='margin-left:10px'>是否为数字</Checkbox>
          </div>
          <div v-if='pipe.type == "$project"'>
            <h2>{{pipeName(pipe)}}</h2>
            <div v-for='(proj,index) in pipe.data' style="margin:10px 0">
              <Input v-model="proj.a" placeholder="字段名" style="width:30%"></Input>
              <Checkbox v-model="proj.isNeeded" style='margin-left:10px'>是否需要</Checkbox>
              <Button v-if="index == pipe.data.length-1" @click="addProj(pipe)">继续添加</Button>
            </div>
          </div>
          <div v-if='pipe.type == "$group"'>
            <h2>{{pipeName(pipe)}}</h2>
            <Input v-model="pipe.groupBy" placeholder="聚合依据" style="width:30%"></Input>
            <Checkbox v-model="pipe.isTime" style='margin-left:10px'>是否为时间</Checkbox>
            <Button @click="addProj(pipe)">添加合成字段</Button>
            <div v-for='(gp,index) in pipe.data' style="margin:10px 0">
              <Input v-model="gp.a" placeholder="合成字段名" style="width:30%"></Input>
              <Select v-model="gp.operator" placeholder="合成方法" clearable style="width:20%">
                <Option v-for="operator in GroupOpt" :value="operator.value" :key="operator">{{ operator.label }}</Option>
              </Select>
              <Input v-model="gp.b" placeholder="来源字段名" style="width:30%"></Input>
            </div>
          </div>
          <div v-if='pipe.type == "$sort"'>
            <h2>{{pipeName(pipe)}}</h2>
            <div v-for='(proj,index) in pipe.data' style="margin:10px 0">
              <Input v-model="proj.a" placeholder="字段名" style="width:30%"></Input>
              <i-switch v-model="proj.order" size='large' style='margin-left:10px'>
                <span slot="open">升序</span>
                <span slot="close">降序</span>
              </i-switch>
              <Button v-if="index == pipe.data.length-1" @click="addProj(pipe)">继续添加</Button>
            </div>
          </div>
          
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
const IPCHandler = require('../IPCHandler');
import * as MT  from '../vuex/mutation-types';

export default {
  name:'datafilter',
  data () {
    return {
      spinShow:false,
      modal:false,
      aggOperator:'',
      matchPipeLine:[
        {
          itemName:'',
          matchOperator:'',
          targetName:''
        }
      ],
      GroupOpt:[
        {
          value:'$avg',
          label:'求平均'
        },
        {
          value:'$sum',
          label:'求总和'
        }
      ],
      MatchOpe:[
        {
          value:'$eq',
          label:'等于',
        },
        {
          value:'$gt',
          label:'大于',
        },
        {
          value:'$lt',
          label:'小于',
        },
        {
          value:'$gte',
          label:'大于等于',
        },
        {
          value:'$lte',
          label:'小于等于',
        },
        {
          value:'$regex',
          label:'正则表达式'
        }
      ],
      operators:[
        {
          value:'$match',
          label:'字段匹配'
        },
        {
          value:'$project',
          label:'字段取舍'
        },
        {
          value:'$group',
          label:'字段重组'
        },
        {
          value:'$sort',
          label:'字段排序'
        },
        {
          value:'$limit',
          label:'字段限量'
        },
        {
          value:'$skip',
          label:'字段跳过'
        },
        {
          value:'$unwind',
          label:'字段分解'
        },
        {
          value:'$count',
          label:'数量统计'
        },
        
      ],
      aggPipLine:[
        // {
        //   type:'$match',
        //   data:{}
        // }
      ]
    }
  },
  computed:{

  },
  methods:{
    toggleSpin () {
      this.spinShow = !this.spinShow;
    },
    completeAgg(){
      this.toggleSpin();
      this.$store.commit(MT.CHANGE_STAGE_2_SHOW);
      this.$router.push('echart');
    },
    addProj(pipe){
      pipe.data.push({})
    },
    addPipe (type) {
      switch(type){
        case '$match':
          this.aggPipLine.push({type:type,data:{}});
          break;
        case '$project':
          this.aggPipLine.push({type:type,data:[{}]});
          break;
        case '$group':
          this.aggPipLine.push({type:type,data:[{}]});
          break;
        case '$sort':
          this.aggPipLine.push({type:type,data:[{}]})
      }
      
    },
    pipeName (pipe) {
      const dict = {
        '$match':'字段匹配',
        '$project':'字段取舍',
        '$group':'字段重组',
        '$limit':'字段限量',
        '$skip':'字段跳过',
        '$unwind':'字段分解',
        '$sort':'字段排序',
        '$count':'数量统计'
      }
      return dict[pipe.type]
    },
    addMatchPipe () {
      let {target,operator,value,isNum} = this.input;
      let pipe = {$match:{}};
      pipe.$match[target] = {};
      pipe.$match[target][operator] = (isNum) ? parseFloat(value) : value;
      return pipe;
    },
    addProjectPipe () {
      let arrProjs = this.input;
      let pipe = {$project:{}};
      arrProjs.forEach( each => {
        pipe.$project[each.target] = (each.selected) ? 1 : 0;
      });
      return pipe;
    },
    addGroupPipe () {
      let {groupBy,isTime,arrName} = this.input;
      let pipe = {$group:{}};
      let projectAfterGroup = {$project:{}};
      if(!isTime){
        pipe.$group._id='$'+groupBy;
      }else{
        pipe.$group._id={$dateToString:{format: "%Y-%m-%d", date: "$"+groupBy }};
      }
      arrNames.forEach( each => {
        pipe.$group[each.target] = {};
        pipe.$group[each.target][each.method] = '$'+each.source;
        projectAfterGroup.$project[each.target] = 1
      });
      projectAfterGroup.$project._id=0;
      projectAfterGroup.$project[groupBy]='$_id';
      return {pipe,projectAfterGroup}
    },
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
    async airdataRequest () {
      this.toggleSpin();
      let aggPipes = [
      {$match:{'area':'上海'}},
      {$project:{area:1,o3:1,co:1,no2:1,pm10:1,pm2_5:1,time_point:1}},
      {$group:{
          _id:{$dateToString:{format: "%Y-%m-%d", date: "$time_point" }},
          '臭氧':{$avg:'$o3'},
          '一氧化碳':{$avg:'$co'},
          '二氧化氮':{$avg:'$no2'},
          'pm10':{$avg:'$pm10'},
          'pm2_5':{$avg:'$pm2_5'}
          }
      },
      {$project:{'臭氧':1,'一氧化碳':1,'二氧化氮':1,'pm10':1,'pm2_5':1,time_point:"$_id",_id:0,}},
      {$sort:{time_point:1}},
      // {$project:{array:['$臭氧','$一氧化碳','$二氧化氮','$pm10','$pm2_5']}}
      {$group:{_id:null,'臭氧':{$push:'$臭氧'},'一氧化碳':{$push:"$一氧化碳"},'二氧化氮':{$push:"$二氧化氮"},'pm10':{$push:"$pm10"},'pm2_5':{$push:"$pm2_5"},time_point:{$push:"$time_point"}}}
      ];
      let result = await IPCHandler('airData',{aggPipes});
      this.$store.commit(MT.CHANGE_STAGE_2_SHOW);
      this.$router.push('echart');
      // console.log(JSON.stringify(result));
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
      let result = await IPCHandler('barData',{aggPipes});
      console.log(JSON.stringify(result));
    }
  },
}
</script>

<style scoped>

</style>


