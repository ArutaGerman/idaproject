<template>
  <main class="main-content">
    <div class="container">
      <div class="main-content__catalog catalog-header dflex">
        <div class="catalog-header__title">
          <span>Каталог</span>
        </div>
        <div class="catalog-header__filter">
          <label for="sort">Сортировать по:</label>
          <select v-model="sorted" @change="sort" name="sort" id="select_sort">
            <option v-for="(item, index) in sortOptions" :key="index">
              {{ item }}
            </option>
          </select>
        </div>
      </div>
      <div class="dflex">
        <SideMenu
          @get-categories="getCategories"
          @get-id="getCategoryId"
          @get-goods="getGoods"
          :categories="categories"
          :id="id"
        ></SideMenu>
        <Goods :goods="goods" @get-goods="getGoods"></Goods>
      </div>
    </div>
  </main>
</template>

<script>
import "whatwg-fetch";
export default {
  data() {
    return {
      id: null,
      sorted: "",
      categories: [],
      sortOptions: ["цене", "популярности"],
      goods: [],
    };
  },
  components: {
    Goods: () => import("@/components/Goods"),
    SideMenu: () => import("@/views/SideMenu"),
  },
  mounted() {
    this.getCategories;
    this.getGoods;
  },
  methods: {
    getCategories() {
      let url = `https://front-test.idalite.com/api/product-category`;
      fetch(url)
        .then((response) => response.json())
        .then((answer) => this.categories.push(...answer));
    },
    getCategoryId(id) {
      this.id = id;
    },
    getGoods() {
      this.goods = [];
      let url = `https://front-test.idalite.com/api/product?category=${this.id}`;
      fetch(url)
        .then((response) => response.json())
        .then((answer) => {
          this.goods.push(...answer);
          this.sort()
        });        
    },
    sort() {
      if (this.sorted == "цене") {
        this.goods.sort((prev, curr) => prev.price - curr.price);
      } else {
        this.goods.sort((prev, curr) => curr.rating - prev.rating);
      }
    },
  },
};
</script>

<style lang="scss">
.main-content__catalog {
  width: 100%;
  justify-content: space-between;
}
</style>