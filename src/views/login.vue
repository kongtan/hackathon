<template>
  <div class="main">
    <div class="auth-box" v-if="!userInfo||!userInfo.UId>0" v-show="showAuth">
      <div class="auth-border">
        <div class="head">
          <p class="appn">艺同拼车</p>
          <p class="appsub">申请获取你的iOA信息</p>
        </div>
        <div class="uinfo">
          <div class="photo">
            <van-image round width="60" height="60" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          </div>
          <div class="nameinfo">
            <p class="nam">同程第一帅</p>
            <p class="jnum">07279</p>
          </div>
        </div>
        <div class="foot">
          <van-button plain hairline type="info" @click="no">拒绝</van-button>
          <van-button plain hairline type="info" class="ok"  @click="login">允许</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      isAuthed: "",
      userInfo: {},
      showAuth:true
    };
  },
  created() {
    let user = localStorage.getItem("_userInfo");
    if(user){
      location.replace("#/index");
    }else{
      this.setBar();
      this.showAuth =true;
    }
  },
  methods: {
    setBar() {
      _tc_bridge_bar.set_navbar({
        param: {
          center: [{ value: "艺同拼车" }]
        },
        callback: data => {
        }
      });
    },
    no(){
      this.showAuth = false;
    },
    login() {
      this.$post("http://10.102.144.75:8022/api/member/post", {
        workNum: "07279",
        password: "123"
      }).then(data => {
        if (data && data.HackRspCode == 0) {
          let tmpUser = data.HackBody.user;
          this.userInfo = tmpUser;
          localStorage.setItem("_userInfo", JSON.stringify(tmpUser));
          this.showAuth = false;
           location.replace("#/identity");
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  .auth-box {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: -webkit-box;
    -webkit-box-pack: center;
    -webkit-box-align: center;
    -webkit-box-orient: vertical;
    .auth-border {
      background-color: #ffffff;
      padding: 20px;
      width: 58%;
      .head {
        text-align: left;
        .appn {
          font-size: 16px;
          color: #666;
        }
        .appsub {
          font-size: 16px;
          color: #333;
        }
      }
      .uinfo {
        display: -webkit-box;
        -webkit-box-align: center;
        -webkit-box-pack: center;
        padding: 20px 0;
        .nameinfo{
          text-align: left;
          padding-left: 6px;
          color: #666;
          .jnum{
            margin-top: 4px;
          }
        }
      }
      .foot{
        .ok{
          margin-left: 20px;
        }
      }
    }
  }
  .name {
    font-size: 24px;
    color: #666;
    margin-bottom: 100px;
  }
  .xm-gh {
    padding-top: 20px;
    color: #666;
    font-size: 14px;
    .xm {
      font-size: 16px;
      color: #333;
      margin-right: 5px;
    }
  }
  .pin {
    padding-top: 20px;
    &-btn {
      height: 40px;
      width: 60%;
      line-height: 40px;
    }
  }
}
</style>