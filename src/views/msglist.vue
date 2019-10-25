<template>
  <div>
    <div class="lists" v-if="true">
      <div class="list">
        <img src="http://pic5.40017.cn/03/000/95/ca/rB5oQF2ydOaAKkt9AAAdmn0ZzNA978.png" class="pic" />
        <div>
          <div class="msg">
            <p>司机接单成功</p>
            <p>2019/10/28 15:33</p>
          </div>
          <p class="desc">
            你发布的约车信息已被司机接单啦！
            <font @click="detail()">点击查看详情</font>
          </p>
        </div>
      </div>
    </div>
    <p v-else class="no-result">暂时还没有消息哦~</p>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    this.bridgeFnc.setBar("消息通知");
  },
  methods:{
      detail(){
          this.bridgeFnc.openNewUrl(
              window.location.origin +
                window.location.pathname +
                "#/orderdetail"
            );
      }
  }
};
</script>
<style scoped>
.lists{

}
.list{
    display: -webkit-box;
    -webkit-box-align: center;
    padding: 20px 15px;
    background: #fff;
    margin-bottom: 10px;
}
.pic{
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 20px;
}
.msg{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
    margin-bottom: 15px;
}
.msg p:nth-of-type(1){
    font-size: 16px;
    color: #333;
}
.msg p:nth-last-of-type(1){
    font-size: 12px;
    color: #666;
}
.desc{
    font-size: 12px;
    color: #666;
}
.desc font{
    color: #1989fa
}
.no-result{
    font-size: 14px;
    color: #666;
    text-align: center;
    margin-top: 30px;
}
</style>