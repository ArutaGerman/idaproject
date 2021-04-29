<template>
  <nav id="nav" :class="$style.nav">
    <ul>
      <li
        v-for="(item, index) in categories"
        :key="index"
        @click="getCategoryId(item.id)"
      >
        <router-link
          :to="{
            name: 'Goods',
            params: { id: item.id, name: rus_to_latin(item.name) },
          }"
          >{{ item.name }}</router-link
        >
      </li>
    </ul>
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

  li:nth-child(1),
  li:nth-child(2) {
    padding-bottom: 1rem;
  }

  li {
    display: inline-block;
  }

  a {
    color: $grey-light;

    &:hover {
      color: $black;
    }
  }
}
</style>