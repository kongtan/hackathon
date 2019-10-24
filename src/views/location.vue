<template>
  <div id="page">
    <!-- 地图容器 -->
    <div id="container" class="map" tabindex="0"></div>
    <!-- 搜索框-->
    <div id="searchBox">
      <input id="tipinput" type="input" placeholder="请输入关键字搜索" />
      <div id="clearSearchBtn">
        <div class="del">&#10005;</div>
      </div>
    </div>
    <ul id="localList" v-show="localList&&localList.length>0">
      <li class="item" v-for="item in localList" :key="item.id" @click="selectThis(item)">
        <div class="linfo">
          <p class="title">{{item.name}}</p>
          <p class="subtitle">{{item.address}}</p>
        </div>
        <div class="select">
          <van-icon name="success" class="icon" v-show="item.isSelect" />
        </div>
      </li>
    </ul>
    <div id="loader"></div>
  </div>
</template>
<script>
var map, marker;
export default {
  data() {
    return {
      localList: []
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
        zoom: 13,
        resizeEnable: true
      });

      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
            that.geoloOnComplete(result);
          } else {
            that.geoloOnError(result);
          }
        });
      });

      //加载PlaceSearch和Autocomplete插件
      AMap.service(["AMap.PlaceSearch", "AMap.Autocomplete"], function() {
        try {
          ready();
        } catch (e) {
          console.error(e);
        }
      });

      function ready() {
        //搜索框支持自动完成提示
        var auto = new AMap.Autocomplete({
          input: "tipinput"
        });

        //监听搜索框的提示选中事件
        AMap.event.addListener(auto, "select", function(e) {
          console.log(e);
          if (e && e.poi && e.poi.location) {
            let position = new AMap.LngLat(e.poi.location.Q, e.poi.location.P);
            map.setCenter(position);
            that.addMarker(position);

            that.placeSearch(e.poi.name);
          }
        });

        $("#clearSearchBtn").click(function() {
          //清除搜索框内容
          $("#tipinput").val("");
        });
      }
    },
    geoloOnComplete(data) {
      this.placeSearch(data.formattedAddress);
    },
    placeSearch(dest) {
      var that = this;
      var placeSearch = new AMap.PlaceSearch({
        pageSize: 20
      });
      placeSearch.search(dest, function(status, result) {
        if (status == "complete" && result.info == "OK") {
          that.localList = result.poiList.pois;
          let first = that.localList[0];
          first.isSelect = true;
          marker = new AMap.Marker({
            position: new AMap.LngLat(first.location.Q, first.location.P),
            offset: new AMap.Pixel(-13, -30)
          });
          marker.setMap(map);
        } else {
          console.log("error");
        }
        // 查询成功时，result即对应匹配的POI信息
      });
    },
    geoloOnError(data) {
      console.log(data);
    },
    selectThis(data) {
      this.localList.forEach((item, index) => {
        item.isSelect = item.id == data.id;
      });
      this.localList = JSON.parse(JSON.stringify(this.localList));

      let position = new AMap.LngLat(data.location.Q, data.location.P);

      map.setCenter(position);
      this.addMarker(position);
    },
    addMarker(lanLat) {
      if (marker) {
        marker.setMap(null);
        marker = null;
      }
      marker = new AMap.Marker({
        position: lanLat,
        offset: new AMap.Pixel(-13, -30)
      });
      marker.setMap(map);
    }
  }
};
</script>
<style scoped>
#page {
  width: 100%;
  height: 100%;
  position: fixed;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

#container {
  -webkit-box-flex: 1;
}

#showHideBtn {
  display: block;
  position: absolute;
  width: 63px;
  height: 32px;
  text-align: center;
  margin: 0 auto;
  left: 0;
  right: 0;
  top: -25px;
}

#showHideBtn:after,
#showHideBtn:before {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  cursor: pointer;
}

#showHideBtn:before {
  width: 60px;
  height: 30px;
  background: rgba(255, 255, 255, 0.9);
  top: 0;
  border-radius: 30px 30px 0 0;
  border: 1px solid #ccc;
  border-bottom: 0;
}

#showHideBtn:after {
  content: "";
  top: 7px;
  border: 10px solid rgba(255, 0, 0, 0);
  z-index: 99999;
  border-top-color: #ccc;
  /* -webkit-transition: all 0.2s;*/
}

#poiList {
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
  overflow: scroll;
  position: relative;
  background: #fff;
}

#poiList .amap_lib_placeSearch {
  border: none;
}

#searchBox {
  position: fixed;
  width: 90%;
  margin: 0 auto;
  left: 0;
  right: 0;
  z-index: 999;
  top: 15px;
  height: 30px;
}

#tipinput {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  padding: 0 7px;
  box-sizing: border-box;
}

#clearSearchBtn {
  position: absolute;
  right: 0;
  top: 0;
  margin: auto;
  width: 20px;
  height: 20px;
  padding: 5px;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  color: #999;
}

#clearSearchBtn .del {
  background: #eee;
  border-radius: 12px;
  width: 100%;
  height: 100%;
}

#page.searching #clearSearchBtn {
  display: none;
}

#loader {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: 1;
  margin: -75px 0 0 -75px;
  border: 16px solid #eee;
  border-radius: 50%;
  border-top: 16px solid #0b83ea;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  display: none;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.searching #loader {
  display: block;
}

.searching #page {
  filter: grayscale(1);
  opacity: 0.5;
}
#localList {
  height: 50%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
}
#localList .item {
  display: -webkit-box;
  padding: 10px;
}
#localList .item .linfo {
  -webkit-box-flex: 1;
  text-align: left;
}
#localList .item .linfo .title {
  font-size: 16px;
  color: #333;
}
#localList .item .linfo .subtitle {
  font-size: 14px;
  color: #999;
}
#localList .item .select {
  width: 22px;
}
#localList .item .select .icon {
  color: #0b83ea;
  font-size: 20px;
}
</style>