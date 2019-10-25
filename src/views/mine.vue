<template>
    <div>
        <div class="head border_t border_b">
            <img :src="userInfo.UPhoto" >
            <div class="usr">
                <div>
                    <p>{{userInfo.UNick}}</p>
                    <p>司机</p>
                    <p>切换身份></p>
                </div>
                <p>{{userInfo.UWorkNumber}}</p>
            </div>
        </div>
        <div class="main border_t">
            <p class="title border_b ">我的行程</p>
            <ul class="lists">
                <li class="list border_t border_b" @click="goDetail">
                    <div class="status border_b">
                        <p>来源：我发布的找司机订单</p>
                        <p>等待司机接单</p>
                    </div>
                    <div class="address">
                        <p>10/28 8:00</p>
                        <div>
                            <p>同程大厦</p>
                            <img src="//pic5.40017.cn/03/000/2b/ba/rBANB12x7GOAGzBLAAAEEGTk4K8756.png" >
                            <p>青剑湖花园南门</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userInfo:JSON.parse(window.localStorage._userInfo)
        }
    },
    created(){
        this.bridgeFnc.setBar('我的');
    },
    methods: {
        goDetail(){
            this.bridgeFnc.openNewUrl(
              window.location.origin +
                window.location.pathname +
                "#/orderdetail"
            );
        }
    },
}
</script>
<style scoped>
.head{
    background: #fff;
    display: -webkit-box;
    -webkit-box-align: center;
    padding: 20px;
    margin-bottom: 10px;
}
.head img{
    display: block;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
    background: #4455ee;
}
.head .usr div{
    display: -webkit-box;
    -webkit-box-align: center;
    margin-bottom: 6px;
}
.head .usr div p:nth-of-type(1){
    font-size: 16px;
    font-weight: bold;
    margin-right: 10px;
    color: #333;
}
.head .usr div p:nth-of-type(2){
    font-size: 14px;
    background: #666;
    border-radius: 5px;
    padding: 1px 3px;
    color: #fff;
    margin-right: 10px;
}
.head .usr div p:nth-of-type(3){
    font-size: 12px;
}
.head .usr>p{
    text-align: left;
    color: #333;
}
.main{

}
.title{
    font-size: 16px;
    padding: 20px;
    background: #fff;
    text-align: left;
    font-weight: bold;
}
.list{
    background: #fff;
    margin-bottom: 10px;
}
.status{
    display: -webkit-box;
    -webkit-box-align: center;
    -webkit-box-pack: justify;
    padding: 8px 20px;
    font-size: 14px;
}
.status P:nth-of-type(1){
    color: #333;
}
.status p:nth-last-of-type(1){
    color: rgb(18, 167, 18)
}
.address{
    color: #333;
    text-align: left;
    padding: 20px;
}
.address>p{
    font-size: 18px;
    font-weight: bold;
}
.address>div{
    display: -webkit-box;
    -webkit-box-align: center;
    font-size: 14px;
}
.address>div img{
    display: block;
    width: 40px;
    margin: 0 10px;
    font-weight: bold;
}
</style>