<template>
  <ul @click="showSortList" :class="$style['sort-list_wrap']">
    {{ sorted }}
    <li :class="[{[$style['sort-list']]: sortMenu}, $style.dnone]">
      <ul :class="$style['inner']">
        <li
          v-for="(item, index) in sortOptions"
          :key="index"
          @click="sortProducts(index, sorted)"
          :class="[$style.item, $style.dflex]"
        >{{ item.name }}</li>
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
        { name: "По популярности", value: "популярности" }
      ],
      sortMenu: false
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
    }
  }
};
</script>

<style lang="scss" module>
@import "../../public/css/style";
.sort-list_wrap {
  margin-left: 0.375rem;
  position: relative;
}

.sort-list {
  display: block;
  width: 10rem;
  height: 4.25rem;
  background: #ffffff;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  position: absolute;
  top: 1.6875rem;
  right: 0;
  z-index: 10;

  .inner {
    height: 100%;
    padding: 0.5rem 0;
  }

  .item {
    font-size: 14px;
    height: 1.625rem;
    justify-content: center;
    align-items: center;
  }
}

.sort-list:hover {
  background: #f8f8f8;
}
.sort-list_wrap:hover {
  cursor: url("../assets/cursor.svg"), pointer;
}
</style>

