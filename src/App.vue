<template>
  <div id="app">
    <Header></Header>
    <Catalog></Catalog>
    <transition name="slide-fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
// import { bus } from "@/main.js";
export default {
  components: {
    Header: () => import("@/components/TheHeader"),
    Catalog: () => import("@/views/Catalog"),
  },
};
</script>

<style lang="scss">
@import "../public/css/style";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $black;
}

#nav {
  a {
    &.router-link-exact-active {
      color: $black;
      text-decoration: underline;
    }
  }
}

li > a:hover,
button:hover,
.btn > *:hover,
svg:hover {
  cursor: url("./assets/cursor.svg"), pointer;
}

svg:hover {
  > path {
    fill: $black;
  }
}

.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}
</style>
