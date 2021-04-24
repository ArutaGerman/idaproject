<template>
  <main :class="$style.mainContent">
    <div :class="$style.mainContentInner">
      <div :class="$style.mainContentHeaderWrap">
        <span :class="$style.title">Каталог</span>
        <div :class="$style.sortBlockWrap">
          <span :class="$style.sortTitle">Сортировать по: </span>
          <SortList @sort-param="sortProducts"></SortList>
        </div>
      </div>
      <div :class="$style.dflex">
        <SideMenu
          @get-categories="getCategories"
          @get-goods="getGoods"
          :categories="categories"
        ></SideMenu>
        <Goods :sortedProducts="sortedProducts" @get-goods="getGoods"></Goods>
      </div>
    </div>
  </main>
</template>

<script>
import "whatwg-fetch";
import { mapGetters } from "vuex";
import { fetchProducts, fetchCategories } from "../api/api";
export default {
  data() {
    return {
      categories: [],
      goods: [],
      sortParam: null,
    };
  },
  components: {
    Goods: () => import("@/components/Goods"),
    SideMenu: () => import("@/views/SideMenu"),
    SortList: () => import("@/components/SortList"),
  },
  computed: {
    ...mapGetters(["idCategories"]),

    // Отслеживаем изменения в параметре сортировки
    sortedProducts: function () {
      const sort = (array) => {
        switch (array) {
          case "цене":
            this.goods.sort((prev, curr) => prev.price - curr.price);
            return this.goods;
          case "популярности":
            this.goods.sort((prev, curr) => curr.rating - prev.rating);
            return this.goods;
          default:
            this.goods.sort((prev, curr) => curr.rating - prev.rating);
            return this.goods;
        }
      };
      return sort(this.sortParam);
    },
  },

  mounted() {
    this.getCategories; //Запускаем получение категорий оп api
    this.getGoods; //Запускаем получение товаров по api

    // Если адрес страницы содержит goods, то выполняем запрос на api
    if (window.location.href.match(/goods/)) {
      // Если есть localStorage, для отправки запроса в api, id запрашиваемой категории товаров берется из localStorage, иначе id = 1
      JSON.parse(localStorage.getItem("idCategory"))
        ? this.$store.commit(
            "getIdCategories",
            JSON.parse(localStorage.getItem("idCategory"))
          )
        : (this.idCategories = 1);

      fetchProducts(this.idCategories, this.goods);
    } else {
      fetchProducts(1, this.goods); // Если адрес не сожердит goods, то запрашиваем по-умолчанию категорию с id = 1
    }
  },

  methods: {
    // Получаем категории товаров из api
    getCategories() {
      fetchCategories(this.categories);
    },

    // Получаем товары по выбранной категории из api и сортируем их
    getGoods() {
      this.goods = [];
      fetchProducts(this.idCategories, this.goods);
    },

    // Получаем параметр для сортировки из SortList.vue
    sortProducts(param) {
      this.sortParam = param;
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/includes/_flex";
@import "../../public/css/includes/_colors";
@import "../../public/css/includes/_font";

.mainContent {
  position: relative;
  z-index: 1;

  .mainContentInner {
    padding: 2rem 5.5rem 4.125rem 5.5rem;

    .sort-arrow {
      height: 100%;
    }

    .mainContentHeaderWrap {
      display: flex;
      padding-bottom: 2.125rem;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 101;

      .sortBlockWrap {
        display: flex;
        align-items: center;
      }
    }

    .title {
      font-size: 2rem;
      font-weight: 700;
      line-height: $fz41px;
      height: 100%;
    }

    .sortTitle {
      color: $black;
      margin-right: 0.375rem;
    }
  }
}
</style>