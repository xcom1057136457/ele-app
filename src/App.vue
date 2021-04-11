<template>
  <div id="app">
    <loading></loading>
    <div class="wrapper">
      <transition name="slide-fade">
        <router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
      </transition>

      <transition name="slide-fade">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="Router" />
        </keep-alive>
      </transition>
    </div>
    <div class="tabBar" v-if="$route.meta.tabBar">
      <tabBar></tabBar>
    </div>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar";
import loading from "@/components/loading";
export default {
  name: "app",
  components: {
    tabBar,
    loading
  }
};
</script>

<style lang="less">
html,
body,
#app {
  height: 100%;
  background-color: #f9f9f9;
  font-family: "appleFont" !important;
}

#app {
  display: flex;
  flex-direction: column;
  > .wrapper {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }
}

@font-face {
  font-family: "appleFont";
  src: url("./assets/font/PingFang.ttf");
  font-weight: normal;
  font-style: normal;
}

.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  left: 0;
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
