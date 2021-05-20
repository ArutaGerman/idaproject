<template>
  <div :class="[$style.goodsWrap, $style.dflex]">
    <div
      v-for="(item, index) in paginationGoods"
      :key="index"
      :class="$style.goodsItem"
    >
      <div :class="[$style.goodsItemInner, $style.dflexNoWrap]">
        <div :class="[$style.productHeader, $style.dflexNoWrap]">
          <div :class="$style.ratingWrap">
            <div :class="[$style.ratingInner, $style.dflexNoWrap]">
              <i :class="$style.ratingStar"></i>
              <div :class="[$style.ratingText, $style.dflex]">
                <span>{{ item.rating }}</span>
              </div>
            </div>
          </div>
          <a href="#" :class="$style.imgWrap">
            <img
              :src="$options.Url.url + item.photo"
              :class="$style.img"
              :title="item.name"
              alt="Фото товара"
            />
          </a>
          <div :class="$style.cartIconWrap">
            <CartIcon
              @click-svg="addProduct(item)"
              :class="[
                $style.cartIcon,
                { [$style.cartIconProductInCart]: checkProductsInCart(item) },
              ]"
            ></CartIcon>
          </div>
        </div>
        <a href="#" :class="$style.bottomWrap">
          <div :class="$style.goodsItemTitle">
            <span :title="item.name">{{ item.name }}</span>
          </div>
          <div :class="$style.goodsItemPrice">
            <span>{{ Intl.NumberFormat("ru").format(item.price) }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Url } from "../additionals/variables";
import { mapGetters, mapActions } from "vuex";
export default {
  Url,
  props: {
    paginationGoods: Array,
  },

  components: {
    CartIcon: () => import("@/components/common/icons/CartIcon"),
  },
  
  computed: mapGetters(["cart/productsInCart"]),

  methods: {
    ...mapActions(["products/addToCart"]),

    //добавляем (делаем мутацию) товар в store vuex в корзине через actions
    addProduct(item) {
      this["products/addToCart"](item);
      localStorage.setItem(
        "products",
        JSON.stringify(this["cart/productsInCart"])
      ); 
    },

    checkProductsInCart(item) {
      return this["cart/productsInCart"].find(
        (itemInCart) => item.id == itemInCart.id
      );
    },
  },
};
</script>

<style lang="scss" module>
@import "../../public/css/includes/_flex";
@import "../../public/css/includes/_font";
@import "../../public/css/includes/_colors";

.goodsWrap {
  width: 100%;
  max-width: 69rem;

  .goodsItem:nth-child(1),
  .goodsItem:nth-child(4n + 5) {
    margin-left: 0;
  }

  .goodsItem:nth-child(4n + 4) {
    margin-right: 0;
  }

  .goodsItem {
    width: 100%;
    max-width: 16.5rem;
    padding-bottom: 1rem;
    margin: 0 0.5rem;

    .goodsItemInner {
      height: 100%;
      padding: 1rem;
      background: $white;
      box-shadow: 0px 4px 16px $shadow;
      border-radius: 8px;
          flex-direction: column;
    justify-content: space-between;


      .productHeader {
          height: 100%;
        .ratingWrap {
          font-style: normal;
          font-weight: bold;
          font-size: 10px;
          line-height: 13px;
        }
        .ratingInner {
          padding-right: 0.6875rem;
          .ratingStar {
            display: block;
            width: 20px;
            height: 20px;
            background: url("../assets/star.svg") no-repeat center;
          }
          .ratingText {
            color: $yellow;
            align-items: center;
          }
        }

        .imgWrap {
          flex-grow: 1;
          display: block;
          .img {
            width: 100%;
          }
        }

        .cartIconWrap {
          .cartIcon {
            margin-left: 0.6875rem;
            svg {
              width: 1rem;
              height: 1rem;
            }
          }

          .cartIconProductInCart {
            path {
              fill: $black;
            }
          }
        }
      }
    }

    .bottomWrap {
      display: block;
      width: 100%;
      text-align: left;
      font-size: $fz14px;
      line-height: $fz18px;

      .goodsItemTitle {
        font-weight: normal;
        color: $grey;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      
      .goodsItemPrice {
        font-weight: bold;
        color: $black;
        padding-top: 0.375rem;
      }
    }
  }
}
</style>