<template>
  <div :class="$style.listWrap">
    <span :class="$style.listTitle"> Товары в корзине </span>
    <form @submit.prevent="validateForm" id="cart_form" :class="$style.form">
      <div :class="$style.products">
        <div
          v-for="(item, index) in productsInCart"
          :key="index"
          :class="$style.productsItemWrap"
        >
          <div :class="[$style.productsItem, $style.dflex]">
            <div :class="[$style.productsItemInner, $style.dflexNoWrap]">
              <router-link to="#" :class="$style.dflexNoWrap">
                <div :class="$style.productsImgWrap">
                  <img
                    :src="$options.Url.url + item.photo"
                    :class="$style.productsImg"
                    alt="Изображение товара"
                  />
                </div>
                <div :class="[$style.productsInfo, $style.dflex]">
                  <div>{{ item.name }}</div>
                  <div :class="$style.productsPrice">
                    {{ item.price }} &#x20bd;
                  </div>
                  <div :class="[$style.dflex, $style.productsRatingWrap]">
                    <i :class="$style.productsRatingStar"></i>
                    <span>{{ item.rating }}</span>
                  </div>
                </div>
              </router-link>
              <div :class="[$style.productsDeleteWrap, $style.dflex]">
                <div
                  @click="deleteFromCart(item)"
                  :class="$style.productsDelete"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M6 10C6 9.44772 6.44772 9 7 9H25C25.5523 9 26 9.44772 26 10C26 10.5523 25.5523 11 25 11H7C6.44772 11 6 10.5523 6 10Z"
                      fill="#959DAD"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14 7C13.7348 7 13.4804 7.10536 13.2929 7.29289C13.1054 7.48043 13 7.73478 13 8V9H19V8C19 7.73478 18.8946 7.48043 18.7071 7.29289C18.5196 7.10536 18.2652 7 18 7H14ZM21 9V8C21 7.20435 20.6839 6.44129 20.1213 5.87868C19.5587 5.31607 18.7956 5 18 5H14C13.2044 5 12.4413 5.31607 11.8787 5.87868C11.3161 6.44129 11 7.20435 11 8V9H9C8.44772 9 8 9.44772 8 10V24C8 24.7957 8.31607 25.5587 8.87868 26.1213C9.44129 26.6839 10.2043 27 11 27H21C21.7957 27 22.5587 26.6839 23.1213 26.1213C23.6839 25.5587 24 24.7957 24 24V10C24 9.44772 23.5523 9 23 9H21ZM10 11V24C10 24.2652 10.1054 24.5196 10.2929 24.7071C10.4804 24.8946 10.7348 25 11 25H21C21.2652 25 21.5196 24.8946 21.7071 24.7071C21.8946 24.5196 22 24.2652 22 24V11H10Z"
                      fill="#959DAD"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M14 14C14.5523 14 15 14.4477 15 15V21C15 21.5523 14.5523 22 14 22C13.4477 22 13 21.5523 13 21V15C13 14.4477 13.4477 14 14 14Z"
                      fill="#959DAD"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M18 14C18.5523 14 19 14.4477 19 15V21C19 21.5523 18.5523 22 18 22C17.4477 22 17 21.5523 17 21V15C17 14.4477 17.4477 14 18 14Z"
                      fill="#959DAD"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.formDataToSendWrap">
        <span>Оформить заказ</span>
        <div :class="$style.formDataToSendInputs">
          <div :class="$style.formDataToSend">
            <input v-model="name" type="text" placeholder="Ваше имя" />
            {{ checkInput }}
          </div>
          <div v-if="focused" :class="$style.formDataToSend">
            <input @focus="onFocus" type="text" placeholder="+7(___)-__-__" />
          </div>
          <div v-else :class="$style.formDataToSend">
            <input
              v-phone
              v-model="phone"
              maxlength="18"
              type="text"
              placeholder="Телефон"
            />
          </div>
          <div :class="$style.formDataToSend">
            <input v-model="address" type="text" placeholder="Адрес" />
          </div>
        </div>
        <BaseButton
          @has-click="validateForm"
          :class="{ [$style.errorForm]: !isActive }"
        >
          <slot>Отправить</slot>
        </BaseButton>
      </div>
    </form>
    <div v-if="error" :class="$style.dataNotValid">
      <span>Все поля обязательны к заполнению</span>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import { Url } from "../../additionals/variables";
import { mapMutations } from "vuex";
export default {
  Url,
  data() {
    return {
      name: null,
      phone: null,
      focused: false,
      address: null,
      isActive: false,
      error: false,
      btnText: "Назад",
    };
  },
  components: {
    BaseButton: () => import("@/components/buttons/BaseButton"),
  },

  computed: {
    ...mapGetters(["productsInCart", "successCart"]),
    // Вычисляем заполнены ли все поля и если да, то кнопка отправки формы меняет теряет класс errorForm
    checkInput: function () {
      const fn = () => {
        if (
          !this.phone ||
          (this.phone && this.phone.length < 18) ||
          !this.name ||
          !this.address
        ) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
      };
      return fn();
    },
  },

  methods: {
    ...mapMutations(["deleteFromCart"]),

    // Флаг для фокуса на поле телефона, если он не введен или введен не до конца
    onFocus() {
      this.focused = false;
    },

    // Метод проверки заполнена ли верно форма заказа
    validateForm() {
      let phone = this.phone;
      // Проверяем верно ли заполнено поле телефона
      // если phone имеет хоть один символ, то включаем маску, чтобы нельзя было ввести буквы
      if (phone) {
        phone = this.phone.replace(/\D/g, "").substring(0, 11); // Создаём переменную phone, которая преобразовывается в телефон без знаков для передачи на сервер
        // если телефон не полностью заполнен, то показываем ошибку и пример формата телефона
        if (phone.length != 11) {
          this.focused = true;
        }
        // если телефон вообще не заполнялся, то показываем ошибку и пример формата телефона
      } else {
        this.focused = true;
      }
      //проверяем заполнены ли все инпуты формы и если успешно, то показываем компонент успешно оформленного заказа
      if (!this.name || !this.address || !phone || phone.length != 11) {
        const container = document.querySelector(".cart-container");
        container.scrollTop = container.scrollHeight;
        this.error = true;
      } else if (this.name && this.address && phone) {
        this.error = false;
        this.$store.dispatch("CountProductsInCart");
        this.$store.dispatch("showOrderSuccess");
      }
    },

    // closeCart
  },
};
</script>


<style lang="scss" module>
@import "../../../public/css/style";
@import "../../../public/css/includes/_font";

.listWrap {
  text-align: left;

  .listTitle {
    font-size: $fz18px;
    line-height: $fz23px;
  }
  .form {
    padding-top: 1rem;

    .products {
      .productsItemWrap:first-child {
        padding-top: 0;
      }
      .productsItemWrap {
        padding-top: 0.75rem;

        .productsItem {
          min-height: 120px;
          box-shadow: 0rem 0.25rem 1rem rgba(0, 0, 0, 0.05);
          border-radius: 0.5rem;
        }

        .productsItemInner {
          width: 100%;
          padding: 0.75rem 0 0.75rem 1.5625rem;

          a {
            flex-grow: 1;

            .productsImgWrap {
              max-width: 8.125rem;
              height: auto;
              align-items: center;

              .productsImg {
                height: 100%;
                max-height: 5.625rem;
                width: auto;
              }
            }

            .productsInfo {
              font-size: $fz14px;
              line-height: $fz18px;
              color: $grey;
              flex-grow: 1;
              flex-direction: column;
              justify-content: space-between;
              align-items: flex-start;

              .productsPrice {
                padding-top: 0.375rem;
                font-size: $fz14px;
                font-weight: bold;
                line-height: $fz18px;
                color: $black;
              }

              .productsRatingWrap {
                padding-top: 1rem;
                align-items: center;

                .productsRatingStar {
                  width: 1.25rem;
                  height: 1.25rem;
                  background: url("../../assets/star.svg") no-repeat center;
                }

                .productsRatingStar + span {
                  font-size: 0.625rem;
                  line-height: 0.8125rem;
                }
              }
            }
          }
        }
        .productsDeleteWrap {
          align-items: center;
          padding: 0 1.375rem;

          .productsDelete {
            width: 2rem;
            height: 2rem;
          }
        }
      }
    }

    .formDataToSendWrap {
      padding-top: 2rem;

      span {
        font-size: $fz18px;
        line-height: 1.4375rem;
        color: $grey;
      }

      .formDataToSendInputs {
        padding-bottom: 1.5rem;

        .formDataToSend {
          padding-top: 1rem;

          input {
            width: 100%;
            height: 3.125rem;
            padding: 0.875rem 0 0.9375rem 0.875rem;
            line-height: $fz21px;
            background: $grey-extra-light;
            border: none;
            border-radius: 0.5rem;
          }
        }
      }

      .errorForm {
        background: $grey;
      }
    }
  }

  .dataNotValid {
    font-size: 1rem;
    line-height: $fz21px;
    padding-top: 2rem;
    text-align: center;
  }
}
</style>