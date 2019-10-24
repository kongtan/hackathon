<template>
  <div class="index">
    <div class="main">
      <van-tabs v-model="active" class="border_b bar">
        <van-tab title="人找车"></van-tab>
        <van-tab title="车找人"></van-tab>
      </van-tabs>
      <van-row type="flex" justify="space-around" class="filter border_b">
        <van-col span="6">
          <input type="text" placeholder="请输入出发地" />
        </van-col>
        <van-col span="6">
          <input type="text" placeholder="请输入目的地" />
        </van-col>
        <van-col span="6" class="sooner">
          <p>出发 早-晚</p>
          <van-icon name="arrow-down" />
        </van-col>
      </van-row>
      <div class="lists">
        <div class="list">
          <div class="address border_b">
            <div class="model">
              <p>8：00</p>
              <p>石湖东路</p>
            </div>
            <img src />
            <div class="model">
              <p>9：45</p>
              <p>同程大厦</p>
            </div>
          </div>
          <div class="user border_b">
            <p>乘客：{{"王伟"}} 需求：{{"1"}}个座位</p>
            <p>备注：{{"1个座位、希望找老司机、开车不抽烟的"}}</p>
          </div>
        </div>
      </div>
    </div>
    <van-row type="flex" justify="space-around" class="bottom">
      <van-col span="6" class="bottom-list">
        <van-icon name="friends" />
        <p>拼车</p>
      </van-col>
      <van-col span="6" @click="showAdd=true" class="add bottom-list">
        <van-icon name="edit" />
        <p>发布</p>
        <div></div>
      </van-col>
      <van-col span="6" class="bottom-list">
        <van-icon name="manager-o" />
        <p>我的</p>
      </van-col>
    </van-row>
    <van-popup v-model="showAdd" closeable position="bottom" :style="{ height: '20%' }">
      <div class="edit" @touchstart="showAdd=false">
          <van-row type="flex" justify="space-around">
        <van-col span="6">
          <van-icon name="logistics" />
          <p>人找车</p>
        </van-col>
        <van-col span="6">
          <van-icon name="edit" />
          <p>车找人</p>
          <div></div>
        </van-col>
      </van-row>
      </div>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 2,
      showAdd: false
    };
  },
  methods: {}
};
</script>
<style scoped>
.index {
  display: -webkit-box;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.main {
  -webkit-box-flex: 1;
  width: 100%;
}
.filter {
  background: #fff;
}
.sooner {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: just;
}
.lists {
}
.list {
  background: #fff;
}
.address {
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: justify;
  padding: 0 20px;
}
.model {
  text-align: left;
  font-size: 16px;
  padding: 10px 0;
}
.model p:nth-of-type(1) {
  font-weight: bold;
  margin-bottom: 6px;
}
.model:nth-last-of-type(1) {
  text-align: right;
}
.user {
  padding: 10px 20px;
  text-align: left;
  font-size: 14px;
}
.user p:nth-of-type(1) {
  margin-bottom: 6px;
}
.bottom {
  width: 100%;
  background: #fff;
  -webkit-box-flex: 0;
}
.add {
  position: relative;
}
.bottom-list {
  padding: 6px 0;
}
.bottom-list p {
  font-size: 14px;
}
.bottom-list:nth-of-type(1) p{
    color: #1989fa;
}
.edit{
    width: 100%;
    height: 100%;
    display: -webkit-box;
     /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;

}
</style>   