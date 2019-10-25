<template>
  <div class="main">
    <div class="head">
      <van-icon name="success" class="sucicon" />
      <div class="desc">
        <p class="info">恭喜您 认证成功～</p>
        <p class="subinfo">欢迎加入同程拼车大家庭</p>
      </div>
    </div>
    <div class="btn">
      <van-button plain hairline type="info" class="cls back" @click="backindex">返回首页</van-button>
      <van-button plain hairline type="info" class="cls send" @click="send">发布约乘信息</van-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    backindex() {
      _tc_bridge_web.open_with_close({
        param: {
          jumpUrl: location.origin + "/#/index"
        }
      });
    },
    send() {
      _tc_bridge_web.open_with_close({
        param: {
          jumpUrl: location.origin + "/#/ptc"
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.main {
  .head {
    display: -webkit-box;
    -webkit-box-pack: center;
    padding: 20px;
    background-color: #fff;
    .sucicon {
      color: #1989fa;
      font-size: 100px;
    }
    .desc {
      padding: 10px;
      display: -webkit-box;
      -webkit-box-pack: center;
      -webkit-box-orient: vertical;
      text-align: left;
      .info {
        font-size: 20px;
        color: #333;
      }
      .subinfo {
        margin-top: 8px;
        font-size: 16px;
        color: #999;
      }
    }
  }
  .btn {
    margin-top: 30px;
    .send {
      margin-left: 20px;
    }
  }
}
</style>