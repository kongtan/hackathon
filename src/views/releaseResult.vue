<template>
  <div>
    <div class="release">
      <img src="//pic5.40017.cn/03/000/92/e2/rB5oQF2xj86AHR92AAADlm7o0oc557.png" class="icon">
      <div class="release-main">
        <p>恭喜您 发布成功</p>
        <p>欢迎加入艺同拼车大家庭！</p>
      </div>
    </div>
    <van-row type="flex" justify="space-around">
      <van-col span="6" style="width:40%">
        <van-button type="default" class="button-t" @click="home()">返回首页</van-button>
      </van-col>
      <van-col span="6" style="width:40%">
        <van-button type="info" class="button-t">查看我发布的信息</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.bridgeFnc.setBar("发布结果");
  },
  methods:{
      home(){
          this.bridgeFnc.closeWebView();
      }
  }
};
</script>
<style scoped>
.release{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
    background: #fff;
    padding: 20px 10%;
    margin-bottom: 15px;
}
.icon{
    width: 80px;
    height: 80px;
    display: block;
}
.release-main{
    text-align: left;
    font-size: 16px;
}
.release-main p:nth-of-type(1){
    font-weight: bold;
    margin-bottom: 5px;
}
.button-t{
    width: 100%;
}
</style>