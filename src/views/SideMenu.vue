<template>
  <nav id="nav" :class="$style.nav">
    <router-link
      v-for="(item, index) in categories"
      :key="index"
      :to="{
        name: 'GoodsList',
        params: { id: item.id, name: rus_to_latin(item.name) },
      }"
      :class="$style.link"
      >{{ item.name }}</router-link
    >
  </nav>
</template>

<script>
import { Translit } from "@/additionals/translit";
import "whatwg-fetch";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [Translit],
  props: {
    categories: Array,
  },
  data() {
    return {
      id: 1,
    };
  },
  //Обновляем id при изменении id категории
  watch: {
    $route(to) {
      if (to.params.id) this.getCategoryId(to.params.id);
    },
  },

  computed: {
    ...mapGetters(["products/idCategories"]),
  },

  mounted() {
    this.$emit("get-categories");
    this.saveCategoryId();
  },

  methods: {
    ...mapActions(["products/getID"]),
    getCategoryId(id) {
      this["products/getID"](id);
      this.saveCategoryId();
      this.$emit("get-goods");
    },
    saveCategoryId() {
      sessionStorage.setItem(
        "idCategory",
        JSON.stringify(this["products/idCategories"])
      );
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/includes/_colors";
@import "../../public/css/includes/_font";

.nav {
  width: 100%;
  max-width: 10rem;
  text-align: left;
  line-height: $fz21px;

  .link:nth-child(1),
  .link:nth-child(2) {
    padding-bottom: 1rem;
  }

  .link {
    display: inline-block;
    color: $grey-light;

    &:hover {
      color: $black;
    }
  }
}
</style>
