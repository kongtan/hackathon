<template>
  <div class="main">
    <div class="name">艺同拼车</div>
    <div v-if="!userInfo||!userInfo.UId>0">
      <van-button type="info" class="login-btn" @click="login">iOA授权登陆</van-button>
    </div>
    <div v-if="userInfo&&userInfo.UId>0">
      <div class="photo">
        <van-image round width="60" height="60" :src="userInfo.UPhoto" />
      </div>
      <div class="xm-gh">
        <span class="xm">{{userInfo.UNick}}</span>
        <span>{{userInfo.UWorkNumber}}</span>
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
    console.log(user);
    this.userInfo = user ? JSON.parse(user) : null;
  },
  methods: {
    login() {
      this.$post("http://10.102.144.75:8022/api/member/post", {
        workNum: "07279",
        password: "123"
      }).then(data => {
        if (data && data.HackRspCode == 0) {
          let tmpUser = data.HackBody.user;
          this.userInfo = tmpUser;
          localStorage.setItem("_userInfo", JSON.stringify(tmpUser));
        }
      });
    },
    pin() {
      location.replace("#/identity");
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