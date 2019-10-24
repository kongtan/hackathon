<template>
  <div class="main">
    <van-cell-group class="name">
      <van-field
        v-model="driverInfo.DriverName"
        required
        clearable
        label="车主姓名"
        right-icon="question-o"
        placeholder="请输入车主姓名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="driverInfo.DITelPhone"
        required
        clearable
        type="tel"
        label="手机号"
        right-icon="question-o"
        placeholder="请输入手机号"
        @click-right-icon="$toast('说明信息')"
      />
    </van-cell-group>
    <van-cell-group class="che">
      <van-field
        v-model="driverInfo.DICarType"
        required
        clearable
        label="车型"
        right-icon="question-o"
        placeholder="请输入车型"
        @click-right-icon="$toast('说明信息')"
      />
      <van-field
        v-model="driverInfo.DICarNumber"
        required
        clearable
        label="车牌号"
        right-icon="question-o"
        placeholder="请输入车牌号"
        @click-right-icon="$toast('说明信息')"
      />
      <van-field
        v-model="driverInfo.DICardNo"
        required
        clearable
        label="身份证号"
        right-icon="question-o"
        placeholder="请输入身份证号"
        @click-right-icon="$toast('说明信息')"
      />
    </van-cell-group>
    <van-cell-group class="zj">
      <p class="title">上传证件</p>
      <ul class="list">
        <li :style="{width:wid}">
          <van-uploader />
          <p>驾驶证</p>
        </li>
        <li :style="{width:wid}">
          <van-uploader />
          <p>行驶证</p>
        </li>
        <li :style="{width:wid}">
          <van-uploader />
          <p>身份证正面</p>
        </li>
        <li :style="{width:wid}">
          <van-uploader />
          <p>身份证反面</p>
        </li>
      </ul>
    </van-cell-group>

    <div class="submit">
      <van-button plain hairline type="info" class="btn" @click="reviewcert">提交</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    let currUser = JSON.parse(localStorage.getItem("_userInfo"));
    return {
      wid: "",
      driverInfo: {
        DriverName: currUser.UNick,
        DIUIID: currUser.UId,
        DITelPhone: "13856859865",
        DICarType: "B级车",
        DICarNumber: "苏E88888",
        DICardNo: "3265456258954562",
        DIDrivingLicense: "",
        DIDrivingPermit: "",
        DICardFront: "",
        DICardFace: ""
      }
    };
  },
  created() {
    let screenW = $(window).width();
    this.wid = (screenW - 42) / 2 + "px";
  },
  methods: {
    reviewcert: function() {
      this.$post(
        "http://10.102.144.75:8022/api/DriverInfo/Post",
        this.driverInfo
      ).then(data => {
        console.log(data)
      });
      _tc_bridge_web.open_with_close({
        param: {
          jumpUrl: location.origin + "/#/reviewcert"
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  .che {
    margin-top: 10px;
  }
  .zj {
    margin-top: 10px;
    .title {
      padding: 5px;
      font-size: 14px;
      color: #333;
      text-align: left;
    }
    .list {
      padding: 20px;
      li {
        display: inline-block;
        p {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .submit {
    position: fixed;
    height: 60px;
    width: 100%;
    bottom: 0px;
    left: 0;
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
    line-height: 60px;
    .btn {
      width: 87%;
    }
  }
}
</style>