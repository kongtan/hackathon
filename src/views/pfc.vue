<template>
  <div>
      <template v-if="lists.length>0">
    <div class="list border_t" v-for="(item,index) in lists" :key="index">
      <div class="address border_b">
        <div class="address-main">
          <p class="address-time">{{item.SStartTime}}</p>
          <div class="ad">
            <p>{{item.SStartAddress}}</p>
            <img src="//pic5.40017.cn/03/000/2b/ba/rBANB12x7GOAGzBLAAAEEGTk4K8756.png" />
            <p>{{item.SEndAddress}}</p>
          </div>
        </div>
        <van-button type="default" class="address-button" @click="takeOrders">搭车</van-button>
      </div>
      <div class="usr border_b">
        <div class="usr-info">
          <p>车主：{{item.NickName}}</p>
          <p>空余座位：{{item.SCount}}个座位</p>
          <p>
            费用：
            <font>¥{{item.SPrice}}/人</font>
          </p>
        </div>
        <p>备注：{{item.SRemark}}</p>
      </div>
    </div>
      </template>
    <div class="no-result" v-else>
      <p>未找到符合条件的司机~</p>
      <p>你可以去发布约车信息</p>
      <van-button type="default" class="btn">发布约车信息</van-button>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            lists:[]
        }
    },
  created() {
    this.bridgeFnc.setBar("人找车");
    this.$post('http://10.102.144.75:8022/api/Schedu/GetSchedu',{"startLat":this.commonFnc.getQueryString("startLat"),"startLon":this.commonFnc.getQueryString("startLon"),"endLat":this.commonFnc.getQueryString("endLat"),"endLon":this.commonFnc.getQueryString("endLon"),"startTime":this.commonFnc.getQueryString("startTime"),"type":"1"}).then(data=>{
          if(data.HackBody&&data.HackBody.length>0){
              this.lists=data.HackBody;
          }
      })
  },
  methods: {
    takeOrders() {
      this.showDialogT();
    },
    showDialogT() {
      _tc_bridge_util.show_tips_dialog({
        param: {
          desc: "真棒，搭到啦~\n记得提前联系司机哦~",
          btnList: [
            { showText: "取消", tagname: "tag_click_left" },
            { showText: "查看搭到的单", tagname: "tag_click_right" }
          ]
        },
        callback: data=> {
          if (data.tagname == "tag_click_right") {
            this.bridgeFnc.openNewUrl(
              window.location.origin +
                window.location.pathname +
                "#/orderdetail"
            );
          }
        }
      });
    },
    showDialogO() {
      _tc_bridge_util.show_tips_dialog({
        param: {
          desc: "手慢啦~\n该车已经搭满了",
          btnList: [{ showText: "知道了", tagname: "tag_click_left" }]
        },
        callback: function(data) {}
      });
    }
  }
};
</script>
<style scoped>
.list {
  background: #fff;
  margin-bottom: 10px;
}
.address {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  padding: 20px 15px;
}
.address-main {
}
.address-time {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 3px;
}
.ad {
  display: -webkit-box;
  -webkit-box-align: center;
  font-size: 14px;
}
.ad img {
  display: block;
  margin: 0 10px;
  width: 40px;
  height: 40px;
}
.address-button {
  height: 30px;
  line-height: 30px;
  font-weight: bold;
}
.usr {
  padding: 20px 15px;
  font-size: 14px;
}
.usr > p {
  text-align: left;
}
.usr-info {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  margin-bottom: 5px;
}
.usr-info > p > font {
  color: red;
}
.no-result {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: -webkit-box;
  -webkit-box-align: center;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
  font-size: 16px;
  font-weight: bold;
}
.no-result p:nth-of-type(1) {
  margin-bottom: 10px;
}
.no-result p:nth-last-of-type(1) {
  margin-bottom: 20px;
}
.btn {
  width: 150px;
  font-weight: bold;
}
</style>