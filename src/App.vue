<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
input{
  border:0;
}
.van-hairline--bottom::after{
  border-color:#e0e0e0 !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
.van-tab{
  font-size: 16px !important;
}
.van-tab--active{
}
.van-tabs__line{
  background: #1989fa !important;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
