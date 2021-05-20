<template>
  <div class="logo_wrap">
    <router-link
      :to="{
        name: 'App'
      }"
      :class="$style.logo"
    >
      TestList
    </router-link>
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