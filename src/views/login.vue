<template>
  <div class="main">
    <div class="name">艺同拼车</div>
    <div v-if="!userInfo">
      <van-button type="info" class="login-btn" @click="login">iOA授权登陆</van-button>
    </div>
    <div v-if="userInfo">
      <div class="photo">
        <van-image round width="60" height="60" :src="userInfo.photo" />
      </div>
      <div class="xm-gh">
        <span class="xm">{{userInfo.name}}</span>
        <span>{{userInfo.jobNumber}}</span>
      </div>
      <div class="pin">
        <van-button plain type="info" class="pin-btn" @click="pin">去拼车</van-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAuthed: "",
      userInfo: {}
    };
  },
  created() {
    let user = localStorage.getItem("_userInfo");
    this.userInfo = user ? JSON.parse(user) : null;
  },
  methods: {
    login(){
      let tmpUser = {
        id:"01024",
        photo: "https://img.yzcdn.cn/vant/cat.jpeg",
        jobNumber: "01024",
        name: "同程程"
      };
      this.userInfo = tmpUser;
      localStorage.setItem("_userInfo", JSON.stringify(tmpUser));
    },
    pin(){
      location.href="#/identity";
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  padding-top: 50%;
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