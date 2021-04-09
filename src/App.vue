<template>
  <div id="app">
    <Header />
    <Catalog />
    <router-view />
  </div>
</template>

<script>
// import { bus } from "@/main.js";
export default {
  data() {
    return {};
  },
  components: {
    Header: () => import("@/components/TheHeader"),
    Catalog: () => import("@/views/Catalog")
  },
  methods: {}
};
</script>

<style lang="scss">
@import "../public/css/style";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    &.router-link-exact-active {
      color: #1f1f1f;
    }
  }
}

select:hover,
option:hover,
li > a:hover,
button:hover,
.cart-icon_wrap:hover,
.cart-icon_wrap > a:hover,
.product-header__cart_inner:hover,
.cart-products__trash:hover {
  cursor: url("./assets/cursor.svg"), pointer;
}
.product-header__cart_inner:hover {
  svg > path {
    fill: #1f1f1f;
  }
}
</style>
