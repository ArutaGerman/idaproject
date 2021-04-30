<template>
  <ul @click="showSortList" :class="[$style.wrap]">
    <li :class="$style.sortParam">
      {{ sorted }}
    </li>
    <div :class="$style.arrowDown"></div>
    <li :class="[{ [$style.sortList]: sortMenu }, $style.dnone]">
      <ul :class="$style.inner">
        <li
          v-for="(item, index) in sortOptions"
          :key="index"
          @click="sortProducts(index, sorted)"
          :class="[$style.item, $style.dflex]"
        >
          {{ item.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      sorted: "популярности",
      sortOptions: [
        { name: "По цене", value: "цене" },
        { name: "По популярности", value: "популярности" },
      ],
      sortMenu: false,
    };
  },
  methods: {
    // Показываем/скрываем опции фильтра сотрировки
    showSortList() {
      this.sortMenu = !this.sortMenu;
    },

    sortProducts(index, param) {
      this.sorted = this.sortOptions[index].value;
      param = this.sorted;
      this.$emit("sort-param", param);
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/includes/_flex";
@import "../../public/css/includes/_colors";
@import "../../public/css/includes/_font";

.wrap {
  display: flex;
  align-items: center;
  position: relative;

  .sortParam {
    color: $grey;
  }

  .arrowDown {
    width: 0.3125rem;
    height: 0.1875rem;
    padding-left: 0.5625rem;
    position: relative;
    top: 0.125rem;
    left: 0;
    background: url("../assets/arrow.svg") no-repeat right;
  }

  .sortList {
    display: block;
    width: 10rem;
    height: 4.25rem;
    position: absolute;
    top: 1.6875rem;
    right: 0;
    z-index: 10;
    background: #ffffff;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  .inner {
    height: 100%;
    padding: 0.5rem 0;
  }

  .item {
    font-size: $fz14px;
    color: $grey-light;
    height: 1.625rem;
    padding-left: 0.75rem;
    align-items: center;
  }

  .item:hover {
    background: $grey-extra-light;
    color: $black;
  }
}

.wrap:hover {
  cursor: url("../assets/cursor.svg"), pointer;
}
</style>

