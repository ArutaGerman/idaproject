<template>
  <div id="app">
    <Header></Header>
    <Catalog></Catalog>
    <router-view />
  </div>
</template>

<script>
// import { bus } from "@/main.js";
export default {
  components: {
    Header: () => import("@/components/TheHeader"),
    Catalog: () => import("@/views/Catalog")
  }
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


select:hover,
option:hover,
li > a:hover,
button:hover,
.btn > *:hover,
.cart-icon_wrap:hover,
.cart-icon_wrap > a:hover,
.product-header__cart_inner:hover,
.cart-products__trash:hover {
  cursor: url("./assets/cursor.svg"), pointer;
}
.product-header__cart_inner:hover {
  svg > path {
    fill: $black;
  }
}
</style>
