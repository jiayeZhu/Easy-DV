<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex" style="height:100%" >
      <i-col :span="spanLeft" class="layout-menu-left">
        <Menu active-name="1" theme="dark" width="auto">
          <div class="layout-logo-left"><h2 id="logo">Easy-DV</h2></div>
          <router-link to="/echart">
            <Menu-item name="1" class="flex">
              <Icon type="cube" :size="iconSize"></Icon>
              <span class="layout-text">连接DB</span>
            </Menu-item>
          </router-link>
          <router-link to="/vuextest">
            <Menu-item name="2" class="flex">
              <Icon type="ios-keypad" :size="iconSize"></Icon>
              <span class="layout-text">数据选取</span>
            </Menu-item>
          </router-link>
          <Menu-item name="3" class="flex">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">可视化数据构建</span>
          </Menu-item>
          <Menu-item name="4" class="flex">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">可视化展示</span>
          </Menu-item>
          <Menu-item name="5" class="flex">
            <Icon type="ios-analytics" :size="iconSize"></Icon>
            <span class="layout-text">数据存档</span>
          </Menu-item>
        </Menu>
      </i-col>
      <i-col :span="spanRight">
        <div class="layout-header">
          <i-button type="text" @click="toggleClick">
              <Icon type="navicon" size="32"></Icon>
          </i-button>
        </div>
        <div class="layout-breadcrumb">
          <Breadcrumb>
            <Breadcrumb-item href="/">首页</Breadcrumb-item>
            <Breadcrumb-item href="#">应用中心</Breadcrumb-item>
            <Breadcrumb-item>某应用</Breadcrumb-item>
          </Breadcrumb>
        </div>
        <div class="layout-content">
          <div class="layout-content-main">
            <transition name="fade" mode="out-in">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </transition>
            
              <!--<IEcharts :option="bar" :loading="loading" :style="style" @ready="onReady" @click="onClick"></IEcharts>-->
              <!--<button @click="doRandom">Random</button>-->
          </div>
        </div>
        <!--<div class="layout-copy">
          2011-2016 &copy; TalkingData
        </div>-->
      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      spanLeft: 5,
      spanRight: 19
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 18 : 24;
    }
  },
  methods: {
    toggleClick () {
      if(this.spanLeft === 5){
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    }
  }
}
</script>

<style scoped>
  .flex{
    display: flex;
    /*justify-content: center;*/
    align-items: center;
  }
  #logo{
    color: white
  }
  .fullscreen{
    height:100px;
  }

  .layout{
        /*border: 1px solid #d7dde4;*/
        background: #f5f7f9;
        position: relative;
        /*border-radius: 4px;*/
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
        /*height: 600px;*/
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
  
</style>