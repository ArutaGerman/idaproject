<template>
  <div class="goods_wrap dflex">
    <div v-for="(item, index) in goods" :key="index" class="goods-item">
      <div class="goods-item_inner dflex">
        <div class="goods-item__top product-header dflex_nowrap">
          <div class="product-header__rating_wrap">
            <div class="product-header__rating_inner dflex_nowrap">
              <div class="product-header__rating-star">
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 3.125C10.2379 3.125 10.4552 3.26005 10.5605 3.47336L12.3464 7.09154L16.3404 7.67532C16.5758 7.70972 16.7712 7.87473 16.8445 8.10098C16.9179 8.32723 16.8565 8.57552 16.6861 8.74147L13.7966 11.5559L14.4785 15.5318C14.5187 15.7663 14.4223 16.0033 14.2299 16.1432C14.0374 16.283 13.7822 16.3014 13.5716 16.1907L10 14.3124L6.42843 16.1907C6.21785 16.3014 5.96267 16.283 5.77018 16.1432C5.5777 16.0033 5.48129 15.7663 5.52151 15.5318L6.20344 11.5559L3.31394 8.74147C3.14355 8.57552 3.08213 8.32723 3.15549 8.10098C3.22885 7.87473 3.42428 7.70972 3.65963 7.67532L7.6536 7.09154L9.43958 3.47336C9.54487 3.26005 9.76213 3.125 10 3.125ZM10 5.16203L8.62921 7.93914C8.53825 8.12342 8.36251 8.25121 8.15916 8.28093L5.09278 8.72913L7.3111 10.8898C7.45852 11.0334 7.52581 11.2403 7.49102 11.4432L6.96763 14.4948L9.70911 13.0531C9.89122 12.9573 10.1088 12.9573 10.2909 13.0531L13.0324 14.4948L12.509 11.4432C12.4742 11.2403 12.5415 11.0334 12.6889 10.8898L14.9073 8.72913L11.8409 8.28093C11.6375 8.25121 11.4618 8.12342 11.3708 7.93914L10 5.16203Z"
                    fill="#F2C94C"
                  />
                  <path
                    d="M6.5 11L4 8H10H16L13.5 11V14.5L13 15.5L10 14L9 14.5L6.5 15.5V14.5V11Z"
                    fill="#F2C94C"
                  />
                </svg>
              </div>
              <div class="product-header__rating dflex">
                <span>{{ item.rating }}</span>
              </div>
            </div>
          </div>
          <a href="#" class="product-header__img">
            <img :src="$options.Url.url + item.photo" alt="Фото товара" />
          </a>
          <div class="product-header__cart">
            <div @click="addProduct(item)" class="product-header__cart_inner cart-icon_wrap">
              <svg
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
            </div>
          </div>
        </div>
        <a href="#" class="goods-item__bottom">
          <div class="goods-item__title">
            <span>{{ item.name }}</span>
          </div>
          <div class="goods-item__price">
            <span>{{ item.price }}</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { Url } from "../additionals/variables";
export default {
  Url,
  props: {
    id: Number,
    goods: Array
  },
  methods: {
    //добавляем (делаем мутацию) товар в store vuex в корзине через actions
    addProduct(item) {
      this.$store.dispatch("addToCar", item);
    }
  }
};
</script>

<style lang="scss">
.goods_wrap {
  width: 100%;
  max-width: 69rem;

  .goods-item {
    width: 100%;
    max-width: 16.5rem;
    padding-bottom: 1rem;
    margin: 0 0.5rem;

    &:nth-child(1),
    &:nth-child(4n + 5) {
      margin-left: 0;
    }

    &:nth-child(4n + 4) {
      margin-right: 0;
    }

    &_inner {
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      padding: 1rem;
      background: #ffffff;
      box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
      border-radius: 8px;

      .product-header {
        &__rating_wrap {
          font-style: normal;
          font-weight: bold;
          font-size: 10px;
          line-height: 13px;
          color: #f2c94c;
        }

        &__rating {
          align-items: center;
        }

        &__rating_inner {
          padding-right: 0.6875rem;
        }

        &__rating-star {
          width: 20px;
          height: 20px;
        }

        &__img {
          flex-grow: 1;
          display: block;

          img {
            width: 100%;
          }
        }
        &__cart_inner {
          padding-left: 0.6875rem;
        }
      }
    }

    &__bottom {
      display: block;
      width: 100%;
      text-align: left;
      font-size: 14px;
      line-height: 18px;
    }

    &__title {
      font-weight: normal;
      color: #59606d;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &__price {
      font-weight: bold;
      color: #1f1f1f;
    }
  }
}
</style>