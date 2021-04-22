<template>
  <div class="logo_wrap">
    <a href="/" :class="$style.logo">TestList</a>
  </div>
</template>

<style lang="scss" module>
@import "../../../public/css/includes/_colors";
.logo {
  font-size: 1.375rem;
  font-weight: bold;
  line-height: 28px;
  color: $grey;
}
</style>