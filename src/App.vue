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
</style>
