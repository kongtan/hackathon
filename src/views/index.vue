<template>
  <div class="index">
    <div class="main">
      <div class="circle">
        <van-tabs v-model="active" class="border_b bar">
          <van-tab title="乘客"></van-tab>
          <van-tab title="司机"></van-tab>
        </van-tabs>
        <van-field
          v-model="start.name"
          clickable
          readonly
          label="出发地"
          placeholder="选择出发地"
          @click="selectStart"
          class="border_b"
        />
        <van-field
          v-model="end.name"
          readonly
          label="目的地"
          placeholder="选择目的地"
          @click="selectEnd"
          class="border_b"
        />
        <van-field
          v-model="time"
          readonly
          label="出发时间"
          placeholder="选择出发时间"
          @click="showTime=true"
          class="border_b"
        />
      </div>
      <van-button type="info" class="btn" @click="find(active)">{{active==0?'找司机':'找乘客'}}</van-button>
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
      <van-col span="6" class="bottom-list" @click="mine()">
        <van-icon name="manager-o" />
        <p>我的</p>
      </van-col>
    </van-row>
    <van-popup v-model="showAdd" closeable position="bottom" :style="{ height: '20%' }">
      <div class="edit">
        <van-row type="flex" justify="space-around">
          <van-col span="6" @click="topc(1)">
            <van-icon name="logistics" />
            <p>人找车</p>
          </van-col>
          <van-col span="6" @click="topc(2)">
            <van-icon name="friends-o" />
            <p>车找人</p>
            <div></div>
          </van-col>
        </van-row>
      </div>
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
      start: {},
      end: {},
      active: 0,
      showAdd: false,
      username: "",
      time: "",
      showTime: false,
      minHour: 10,
      maxHour: 20,
      minDate: new Date(),
      maxDate: new Date(2023, 10, 1),
      currentDate: new Date()
    };
  },
  created() {
    this.setBar();
    this.$post('http://10.102.144.75:2019/api/Member',{"workNum":"07279","password":"123"}).then(data=>{console.log(data)})
  },
  methods: {
    setBar() {
      console.log(this.bridgeFnc);
      _tc_bridge_bar.set_navbar({
        param: {
          center: [{ value: "艺同拼车" }],
          right: [{ tagname: "tag_click_msg", icon: "i_msg", hotMark: "true" }]
        },
        callback: data => {
          if (data.tagname == "tag_click_msg") {
            this.bridgeFnc.openNewUrl(
              window.location.origin + window.location.pathname + "#/msglist"
            );
          }
        }
      });
    },
    find(active) {
      if (!this.start.name) {
        this.$toast("请将出发地填写完整");
        return;
      }
      if (!this.end.name) {
        this.$toast("请将目的地填写完整");
        return;
      }
      if (!this.time) {
        this.$toast("请将出发时间填写完整");
        return;
      }
      let url =
        window.location.origin +
        window.location.pathname +
        "?start=xxx&end=xxx&time=xxx#/" +
        (active == 0 ? "pfc" : "cfp");
      this.bridgeFnc.openNewUrl(url);
    },
    topc(type) {
      let hash = type == 1 ? "#/ptc" : "#/ctp";
      this.showAdd = false;
      let url = window.location.origin + window.location.pathname + hash;
      this.bridgeFnc.openNewUrl(url);
    },
    affirm(time) {
      let crtTime = new Date(time);
      this.time = this.dateFtt("yyyy-MM-dd hh:mm:ss", crtTime);
      this.showTime = false;
    },
    mine() {
      this.bridgeFnc.openNewUrl(
        window.location.origin + window.location.pathname + "#/mine"
      );
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
.bar {
  -webkit-box-flex: 0;
}
.main {
  -webkit-box-flex: 1;
  width: 100%;
  display: -webkit-box;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}
.circle {
  width: 80%;
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
.bottom-list:nth-of-type(1) p {
  color: #1989fa;
}
.edit {
  width: 100%;
  height: 100%;
  display: -webkit-box;
  /* autoprefixer: ignore next */
  -webkit-box-orient: vertical;
  -webkit-box-pack: center;
}
.btn {
  width: 80%;
  display: block;
  margin-top: 10px;
}
</style>   