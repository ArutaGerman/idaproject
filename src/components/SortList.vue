<template>
  <ul
    v-clickOutside="hideSortList"
    @click.stop="showSortList"
    ref="sortList"
    :class="[$style.wrap]"
  >
    <li :class="$style.sortParam">
      {{ sortedSelectParam }}
    </li>
    <div :class="$style.arrowDown"></div>
    <li v-if="sortMenuVisible" :class="$style.sortList">
      <ul :class="$style.inner">
        <li
          v-for="(item, index) in sortOptions"
          :key="index"
          @click="sortProducts(index, sortedSelectParam)"
          :class="[$style.item, $style.dflex]"
        >
          {{ item.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import clickOutside from "@/additionals/directives/clickOutside";

export default {
  props: {
    sortedSelectParam: String,
    sortOptions: Array,
    sortMenuVisible: Boolean,
  },

  directives:{
    clickOutside
  },

  methods: {
    // Показываем/скрываем опции фильтра сортировки
    showSortList() {
      this.$emit("show-sort");
    },

    // Скрываем опции фильтра сортировки
    hideSortList() {
      this.$emit("hide-sort");
    },

    // Передаем параметр сортировки товаров
    sortProducts(index) {
      this.$emit("sort-param", this.sortOptions[index].value);
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/scss/includes/_flex";
@import "../../public/css/scss/includes/_colors";
@import "../../public/css/scss/includes/_font";

.wrap {
  display: flex;
  margin-left: 0.375rem;
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

    .inner {
      height: 100%;
      padding: 0.5rem 0;
    }

    .item {
      font-size: $fz14px;
      color: $grey-light;
      height: 1.625rem;
      justify-content: center;
      align-items: center;
    }

    .item:hover {
      background: $grey-extra-light;
      color: $black;
    }
  }
}

.wrap:hover {
  cursor: url("../assets/cursor.svg"), pointer;
}
</style>

