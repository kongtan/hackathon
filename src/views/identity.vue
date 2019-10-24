<template>
  <div>
    <div class="modal">
      <div v-show="show" class="modal-content">
        <p class="tips">为了更好的提供服务，建议先选择您的身份，后期您也可以在设置里更改身份。</p>
        <div class="btn">
          <van-button plain hairline type="info" class="carowner btncls" @click="carowner">我是车主</van-button>
          <van-button plain hairline type="info" class="passenger btncls">我是乘客</van-button>
        </div>
        <p class="skip">跳过</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  },
  methods: {
    carowner: function() {
      location.href = "/#/carowner"
    }
  }
};
</script>
<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  &-content {
    width: 70%;
    max-height: 100%;
    overflow-y: auto;
    background-color: #fff;
    padding: 25px;
    .tips {
      font-size: 18px;
      color: #666;
    }
    .btn {
      display: -webkit-box;
      padding: 20px 10px 10px;
      -webkit-box-pack: center;
      .passenger {
        margin-left: 10px;
      }
    }
    .skip {
      margin-top: 20px;
      font-size: 14px;
      color: #1989fa;
    }
  }
}
</style>