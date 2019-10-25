<template>
  <div class="ptc">
    <div class="address">
      <van-field
        v-model="start.name"
        clickable
        readonly
        label="出发地"
        right-icon="arrow"
        placeholder="选择出发地"
        @click="selectStart"
        class="border_b"
      />
      <van-field
        v-model="end.name"
        readonly
        label="目的地"
        right-icon="arrow"
        placeholder="选择目的地"
        @click="selectEnd"
        class="border_b"
      />
      <van-field
        v-model="time"
        readonly
        label="出发时间"
        right-icon="arrow"
        placeholder="选择出发时间"
        @click="showTime=true"
        class="border_b"
      />
      <van-field
        v-model="price"
        label="行程费用（每人）"
        placeholder="请输入行程收取的车费（元）"
        @click="showKey=true;keyType=1"
        class="border_b"
        style="font-size:11px;"
      />
    </div>
    <div class="user">
      <van-field v-model="userInfo.UNick" readonly label="乘客姓名" class="border_b" />
      <van-field
        v-model="phone"
        readonly
        label="手机号"
        placeholder="用于车主联系您"
        @click="showKey=true;keyType=2"
        class="border_b"
      />
      <van-field
        v-model="count"
        readonly
        label="人数"
        right-icon="arrow"
        @click="showCount=true"
        class="border_b"
      />
    </div>
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="备注"
      type="textarea"
      maxlength="30"
      placeholder="请键入您的备注~"
      show-word-limit
      class="text"
    />
    <van-button type="info" class="button" @click="submit()">发布约车</van-button>
    <van-action-sheet v-model="showCount" :actions="actions" @select="onSelect" />

    <van-popup v-model="showKey" position="bottom" :style="{ height: '246px' }">
      <van-number-keyboard
        :show="showKey"
        close-button-text="完成"
        @blur="showKey = false"
        @input="onInput"
        @delete="onDelete"
      />
    </van-popup>

    <van-popup v-model="showTime" position="bottom" :style="{ height: '264px' }">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="affirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: JSON.parse(window.localStorage._userInfo),
      start: {},
      end: {},
      message: "",
      showKey: false,
      phone: "",
      count: 1,
      price: "",
      showCount: false,
      actions: [{ name: "1" }, { name: "2" }, { name: "3" }, { name: "4" }],
      keyType: "",
      time: "",
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2023, 10, 1),
      currentDate: new Date(),
      showTime: false
    };
  },
  created() {
    this.bridgeFnc.setBar("找司机");
  },
  methods: {
    submit() {
      if (!this.start || !this.start.name) {
        this.$toast("请将出发地填写完整");
        return;
      }
      if (!this.end || !this.end.name) {
        this.$toast("请将目的地填写完整");
        return;
      }
      if (!this.time) {
        this.$toast("请将出发时间填写完整");
        return;
      }
      if (!this.price) {
        this.$toast("请将行程费用填写完整");
        return;
      }
      if (!this.phone && this.phone.length == 11) {
        this.$toast("请将手机号填写完整");
        return;
      }
      
      this.$post("http://10.102.144.75:8022/api/Schedu/AddSchedu", {
        userid: this.userInfo.UId,
        type: "0",
        startAddress: this.start.name,
        endAddress: this.end.name,
        startLat: this.start.location.lat,
        endLon: this.end.location.lng,
        endLat: this.end.location.lat,
        startLon: this.start.location.lng,
        remark: this.message,
        startTime: this.time.replace(/-/g, "/"),
        status: "0",
        count: this.count,
        price: this.price
      }).then(data => {
        if (data.HackBody) {
          this.bridgeFnc.openAndCloseUrl(
            window.location.origin +
              window.location.pathname +
              "?type=ptc#/releaseResult"
          );
        } else this.$toast("发布失败，再试一试~");
      });
    },
    affirm(time) {
      let crtTime = new Date(time);
      this.time = this.dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);
      this.showTime = false;
    },
    cancel() {
      this.showTime = false;
    },
    dateFtt(fmt, date) {
      var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        S: date.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
      return fmt;
    },
    onSelect(count) {
      this.showCount = false;
      this.count = count.name;
    },
    onInput(value) {
      if (this.keyType == 1) {
        if (this.price.length > 10) return;
        this.price += value;
      } else {
        if (this.phone.length > 10) return;
        this.phone += value;
      }
    },
    onDelete() {
      if (this.keyType == 1)
        this.price = this.price.substring(0, this.price.length - 1);
      else this.phone = this.phone.substring(0, this.phone.length - 1);
    },
    selectStart() {
      _tc_bridge_web.open_newurl({
        param: {
          openParams: "newWindow,needSlide",
          jumpUrl: location.origin + "/#/location"
        },
        callback: data => {
          this.start = JSON.parse(JSON.parse(data.CBData).result);
        }
      });
    },
    selectEnd() {
      _tc_bridge_web.open_newurl({
        param: {
          openParams: "newWindow,needSlide",
          jumpUrl: location.origin + "/#/location"
        },
        callback: data => {
          this.end = JSON.parse(JSON.parse(data.CBData).result);
        }
      });
    }
  }
};
</script>
<style scoped>
.address,
.user,
.text {
  margin-bottom: 15px;
}
.button {
  width: 80%;
}
</style>