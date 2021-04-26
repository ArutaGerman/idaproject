<template>
  <nav id="nav" :class="$style.nav">
    <ul>
      <li
        v-for="(item, index) in categories"
        :key="index"
        @click="getCategoryId(item.id)"
      >
        <router-link :to="'/goods/' + rus_to_latin(item.name)">{{
          item.name
        }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { Translit } from "@/additionals/translit";
import "whatwg-fetch";
import { mapGetters } from "vuex";
export default {
  mixins: [Translit],
  props: {
    categories: Array,
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters(["idCategories"]),
  },

  mounted() {
    this.$emit("get-categories");
  },

  methods: {
    getCategoryId(id) {
      this.$store.dispatch("getID", id);
      this.$emit("get-goods");
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

  a {
    color: $grey-light;

    &:hover {
      color: $black;
    }
  }
}
</style>