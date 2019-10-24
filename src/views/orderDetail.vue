<template>
  <div class="page">
    <van-cell-group>
      <van-cell title="来源：我发布的找司机订单" value="等待司机接单" />
      <van-cell class="time-dest">
        <p class="time">10/28 08:00</p>
        <p class="dest">青剑湖花园南门--->同程大厦</p>
      </van-cell>
      <van-cell>
        <div class="desc">
          <p class="info">乘客：王伟ww36642 需求：1个座位</p>
          <p class="pay">
            愿付：
            <span>¥10</span>
          </p>
        </div>
        <p class="remark">备注：希望找个老司机，开车不抽烟的</p>
      </van-cell>
      <van-cell v-if="categroy=='2'">
        <div class="passager">
          <p class="info">乘客1：王小伟ww36642</p>
          <p class="call">联系他</p>
        </div>
        <div class="passager">
          <p class="info">乘客2：王大伟ww36643</p>
          <p class="call">联系他</p>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="map-box">
      <div id="container" tabindex="0"></div>
    </van-cell-group>

    <div class="submit" v-if="categroy=='1'&&orderStatus=='1'">
      <van-button plain hairline type="info" class="btn" @click="cancel">取消订单</van-button>
    </div>
    <div class="submit" v-if="categroy=='1'&&orderStatus=='2'">
      <van-button plain hairline type="info" class="btnCancel" @click="cancel">取消订单</van-button>
      <van-button plain hairline type="info" class="btnCall" @click="callDriver">联系司机</van-button>
    </div>
    <div class="submit" v-if="categroy=='2'">
      <van-button plain hairline type="info" class="btn" @click="cancel2">取消订单</van-button>
    </div>
    <van-popup v-model="optionsShow" closeable position="bottom" :style="{ height: '20%' }">
      <div class="edit">
        <van-row type="flex" class="item" @click="toCancel(1)">临时有事</van-row>
        <van-row type="flex" class="item" @click="toCancel(2)">出行计划有变</van-row>
        <van-row type="flex" class="item" @click="toCancel(3)">其它原因</van-row>
      </div>
    </van-popup>
  </div>
</template>
<script>
var map;
export default {
  data() {
    return {
      optionsShow: false,
      categroy: "1", //1：乘客，2：司机
      orderStatus: "2" //1：等待司机接单，2：司机已接单
    };
  },
  created() {
    let gdmap = document.getElementById("gdmap");
    if (!gdmap) {
      let new_elem = document.createElement("script");
      new_elem.setAttribute("id", "gdmap");
      new_elem.setAttribute("type", "text/javascript");
      new_elem.setAttribute(
        "src",
        "https://webapi.amap.com/maps?v=1.4.15&key=42e04e19b5262efbbe2538b7a30fa1b1"
      );
      document.body.appendChild(new_elem);
      new_elem.onload = () => {
        this.init();
      };
    } else {
      this.init();
    }
  },
  methods: {
    init() {
      var that = this;
      //创建地图
      map = new AMap.Map("container", {
        //zoom: 13,
        resizeEnable: true
      });

      AMap.plugin("AMap.Driving", function() {
        var driving = new AMap.Driving({
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          map: map
        });

        var startLngLat = [120.714139, 31.358005];
        var endLngLat = [120.730739, 31.251658];

        driving.search(startLngLat, endLngLat, function(status, result) {
          // 未出错时，result即是对应的路线规划方案
        });
      });
    },
    cancel() {
      this.optionsShow = true;
    },
    cancel2(data){
        console.log(data)
    },
    toCancel(data) {
      console.log(data);
      this.optionsShow = false;
    },
    callDriver() {
      _tc_bridge_util.show_dialog({
        param: {
          title: "确认拨打\n13896579234",
          showList: [
            {
              showTitle: "确认拨打",
              jumpUrl: "tel:13896579234"
            }
          ]
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.page {
  .edit {
    padding: 30px 20px;
    .item {
      margin-top: 5px;
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
    .btnCall {
      margin-left: 30px;
    }
  }
  height: 100%;
  .time-dest {
    padding: 10px 16px;
    text-align: left;
    .time {
      font-size: 18px;
      color: #333;
      font-weight: bold;
    }
    .dest {
      padding: 10px 0;
      font-size: 18px;
      color: #666;
    }
  }
  .map-box {
    #container {
      height: 230px;
    }
  }
  .desc {
    display: -webkit-box;
    .info {
      -webkit-box-flex: 1;
      font-size: 14px;
      color: #333;
    }
    .pay {
      span {
        color: #969799;
      }
    }
  }
  .remark {
    font-size: 12px;
    color: #666;
  }
  .passager {
    display: -webkit-box;
    .info {
      font-size: 14px;
      color: #333;
    }
    .call {
      padding-left: 20px;
      color: #1989fa;
    }
  }
}
</style>