<template>
  <nav id="nav" :class="$style.nav">
    <router-link
      v-for="(item, index) in categories"
      :key="index"
      :to="{
        name: 'GoodsList',
        params: { id: item.id},
      }"
      :class="$style.link"
      exact-path
      >{{ item.name }}</router-link
    >
  </nav>
</template>

<script>
// import { Translit } from "@/additionals/translit";
import "whatwg-fetch";
import { mapGetters, mapActions } from "vuex";

export default {
  // mixins: [Translit],
  props: {
    categories: Array,
  },

  data() {
    return {
      id: 1,
    };
  },

  //Обновляем id в адресе при изменении id категории
  watch: {
    $route(to, from) {
      if (to.params.id) this.getCategoryId(+to.params.id);
      if (to.params.id && from.params.id && to.params.id != from.params.id) {
        this.$route.query.page = 1
      }
    },
  },

  computed: {
    ...mapGetters(["products/idCategories"]),
  },

  mounted() {
    this.$emit("get-categories");
  },

  methods: {
    ...mapActions(["products/getID"]),
    getCategoryId(id) {
      this["products/getID"](id);
      this.$emit("get-goods");
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/scss/includes/_colors";
@import "../../public/css/scss/includes/_font";

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