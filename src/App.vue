<template>
  <div id="app">
    <Header></Header>
    <Catalog></Catalog>
    <transition name="bounce">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    Header: () => import("@/components/TheHeader"),
    Catalog: () => import("@/views/TheCatalog"),
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

// Стили анимации для корзины
.bounce-enter-active {
  animation: bounce-in .3s;
}
.bounce-leave-active {
  animation: bounce-in .3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
