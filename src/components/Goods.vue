<template>
  <div :class="[$style['goods_wrap'], $style.dflex]">
    <div v-for="(item, index) in sortedProducts" :key="index" :class="$style['goods-item']">
      <div :class="[$style['goods-item_inner'], $style.dflex]">
        <div :class="[$style['product-header'], $style['dflex_nowrap']]">
          <div :class="$style['rating_wrap']">
            <div :class="[$style['rating_inner'], $style['dflex_nowrap']]">
              <i :class="$style['rating-star']"></i>
              <div :class="[$style['rating-text'],$style.dflex]">
                <span>{{ item.rating }}</span>
              </div>
            </div>
          </div>
          <a href="#" :class="$style['img_wrap']">
            <img
              :src="$options.Url.url + item.photo"
              :class="$style.img"
              :title="item.name"
              alt="Фото товара"
            />
          </a>
          <div :class="$style['cart-icon_wrap']">
            <div @click="addProduct(item)" :class="$style['cart-icon']">
              <svg
                v-if="!checkProductsInCart(item)"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                fill="#959DAD"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.84 3.48C8.06663 3.17783 8.42229 3 8.8 3H23.2C23.5777 3 23.9334 3.17783 24.16 3.48L27.76 8.28C27.9158 8.48772 28 8.74036 28 9V25.8C28 26.7548 27.6207 27.6705 26.9456 28.3456C26.2705 29.0207 25.3548 29.4 24.4 29.4H7.6C6.64522 29.4 5.72955 29.0207 5.05442 28.3456C4.37928 27.6705 4 26.7548 4 25.8V9C4 8.74036 4.08421 8.48772 4.24 8.28L7.84 3.48ZM9.4 5.4L6.4 9.4V25.8C6.4 26.1183 6.52643 26.4235 6.75147 26.6485C6.97652 26.8736 7.28174 27 7.6 27H24.4C24.7183 27 25.0235 26.8736 25.2485 26.6485C25.4736 26.4235 25.6 26.1183 25.6 25.8V9.4L22.6 5.4H9.4Z"
                  fill="#959DAD"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4 9C4 8.33726 4.53726 7.8 5.2 7.8H26.8C27.4627 7.8 28 8.33726 28 9C28 9.66274 27.4627 10.2 26.8 10.2H5.2C4.53726 10.2 4 9.66274 4 9Z"
                  fill="#959DAD"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.2 12.6C11.8627 12.6 12.4 13.1373 12.4 13.8C12.4 14.7548 12.7793 15.6705 13.4544 16.3456C14.1295 17.0207 15.0452 17.4 16 17.4C16.9548 17.4 17.8705 17.0207 18.5456 16.3456C19.2207 15.6705 19.6 14.7548 19.6 13.8C19.6 13.1373 20.1373 12.6 20.8 12.6C21.4627 12.6 22 13.1373 22 13.8C22 15.3913 21.3679 16.9174 20.2426 18.0426C19.1174 19.1679 17.5913 19.8 16 19.8C14.4087 19.8 12.8826 19.1679 11.7574 18.0426C10.6321 16.9174 10 15.3913 10 13.8C10 13.1373 10.5373 12.6 11.2 12.6Z"
                  fill="#959DAD"
                />
              </svg>
              <CartIcon v-else></CartIcon>
            </div>
          </div>
        </div>
        <a href="#" :class="$style['bottom_wrap']">
          <div :class="$style['goods-item__title']">
            <span :title="item.name">{{ item.name }}</span>
          </div>
          <div :class="$style['goods-item__price']">
            <span>{{ item.price }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Url } from "../additionals/variables";
import { mapGetters } from "vuex";
export default {
  Url,
  props: {
    sortedProducts: Array
  },
  components: {
    CartIcon: () => import("@/components/common/CartIcon")
  },
  computed: mapGetters(["productsInCart"]),
  methods: {
    //добавляем (делаем мутацию) товар в store vuex в корзине через actions
    addProduct(item) {
      this.$store.dispatch("addToCart", item);
      this.$forceUpdate();
    },
    checkProductsInCart(item) {
      return this.productsInCart.find(itemInCart => item.id == itemInCart.id);
    }
  }
};
</script>

<style lang="scss" module>
@import "../../public/css/style";
@import "../../public/css/includes/_font";
@import "../../public/css/includes/_colors";

.goods_wrap {
  width: 100%;
  max-width: 69rem;

  .goods-item:nth-child(1),
  .goods-item:nth-child(4n + 5) {
    margin-left: 0;
  }

  .goods-item:nth-child(4n + 4) {
    margin-right: 0;
  }

  .goods-item {
    width: 100%;
    max-width: 16.5rem;
    padding-bottom: 1rem;
    margin: 0 0.5rem;

    .goods-item_inner {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 1rem;
      background: $white;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
      border-radius: 8px;

      .product-header {
        .rating_wrap {
          font-style: normal;
          font-weight: bold;
          font-size: 10px;
          line-height: 13px;
        }

        .rating_inner {
          padding-right: 0.6875rem;

          .rating-star {
            display: block;
            width: 20px;
            height: 20px;
            background: url("../assets/star.svg") no-repeat center;
          }

          .rating-text {
            color: $yellow;
            align-items: center;
          }
        }

        .img_wrap {
          flex-grow: 1;
          display: block;

          .img {
            width: 100%;
          }
        }

        .cart-icon_wrap {
          .cart-icon {
            margin-left: 0.6875rem;
          }
        }
      }
    }

    .bottom_wrap {
      display: block;
      width: 100%;
      text-align: left;
      font-size: $fz14px;
      line-height: 18px;

      .goods-item__title {
        font-weight: normal;
        color: $grey;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .goods-item__price {
        font-weight: bold;
        color: $black;
        padding-top: 0.375rem;
      }
    }
  }
}
</style>