<template>
  <div class="form">
    <h2 class="form__header">Сделать заказ</h2>
    <div class="form__body">
      <ValidationObserver
          v-slot="{ invalid }"
          ref="form"
          class="form__wr"
      >
        <form
          class="form__form"
          @submit.prevent="handleSubmit"
        >
          <div class="form__input-wrapper">
            <ValidationProvider rules="required" v-slot="{ errors, invalid, untouched }">
              <input
                ref="name"
                v-model="name"
                type="text"
                placeholder="Ваше имя"
                autocomplete="off"
                class="form__input"
                :class="{ 'form__input--invalid': invalid && !untouched }"
                @focus="focusHandler"
              />
            <div class="form__input-error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form__input-wrapper">
            <input
                ref="instagram"
                v-model="instagram"
                type="text"
                placeholder="Instagram"
                autocomplete="off"
                class="form__input"
                @focus="focusHandler"
            />
            <!--        <div class="form__input-error">{{ errors.instagram }}</div>-->
          </div>
          <div class="form__input-wrapper">
            <ValidationProvider rules="required" v-slot="{ errors, invalid, untouched }">
              <input
                ref="phone"
                v-maska:unmaskedValue.phone="'+375 (##) ###-##-##'"
                v-model="maskedPhone"
                type="tel"
                placeholder="Номер телефона"
                autocomplete="off"
                class="form__input"
                :class="{ 'form__input--invalid': invalid && !untouched }"
                @focus="focusHandler"
              />
              <div class="form__input-error">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="form__input-wrapper">
            <input
              ref="promocode"
              v-model="promoCode"
              type="text"
              placeholder="Промокод"
              autocomplete="off"
              class="form__input"
              @focus="focusHandler"
            />
    <!--        <div class="form__input-error">{{ errors.instagram }}</div>-->
          </div>
          <div class="form__submit-button-wr">
            <button class="form__submit-button" :disabled="invalid" type="submit">{{ buttonText }}</button>
          </div>
          <span class="form__hint">Введите промокод для получения скидки. Промокод можно узнать у продавца точки на которой оформляете заказ.</span>
        </form>
      </ValidationObserver>
      <div
        class="form__selected-product"
        :style="`background-image: url(${productPhoto})`"
      >
        <transition name="fade">
          <template v-if="selectedProduct?.name">
            <div class="form__selected-model">
              Модель: {{ selectedProduct.name }}
              <button class="form__clear-select-button" @click="$emit('product:remove')">x</button>
            </div>
          </template>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { vMaska } from "maska/vue"
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Заполните это поле'
});

const defaultProductPhoto = '/products/default.jpg'

export default {
  directives: { maska: vMaska },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  name: 'MainForm',
  data () {
    return {
      name: '',
      maskedPhone: '',
      instagram: '',
      promoCode: '',
      isSending: false
    }
  },
  props: {
    selectedProduct: {
      type: Object
    }
  },
  mounted () {
    this.$bus.$on('reset', this.globalResetHandler)
  },
  beforeDestroy() {
    this.$bus.$off('reset', this.globalResetHandler)
  },
  computed: {
    buttonText () {
      return this.isSending.value ? 'Отправляю...' : 'Отправить'
    },
    values () {
      return {
        name: this.name,
        phone: this.phone,
        instagram: this.instagram,
        promoCode: this.promoCode
      }
    },
    productPhoto () {
      return this.selectedProduct.img || defaultProductPhoto
    }
  },
  methods: {
    globalResetHandler () {
      this.resetFocus()
      this.resetForm()
      this.$refs.form.reset()
    },
    focusHandler (event) {
      event.preventDefault()
      event.srcElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
    },
    resetFocus () {
      const inputs = document.querySelectorAll('.form__input')
      inputs.forEach(input => input.blur())
    },
    resetForm () {
      this.name = ''
      this.phone = ''
      this.instagram = ''
      this.maskedPhone = ''
      this.promoCode = ''
    },
    requestHandler (evt) {
      console.log(evt)
    },
    handleSubmit () {
      const request = new XMLHttpRequest()
      const sendMailUrl = '/mail.php'

      this.isSending = true
      const formData = JSON.stringify({...this.values, selectedProduct: this.selectedProduct.name })
      request.open('POST', sendMailUrl)
      request.addEventListener('load', this.requestHandler)
      request.setRequestHeader('Content-Type', 'application/json');
      request.addEventListener('error', () => {
        this.$toast.error('Упс, произошла ошибка, попробуйте позже')
        this.isSending = false
      })

      request.addEventListener('abort', () => {
        this.$toast.error('Эммм... запрос отменен')
        this.isSending = false
      })

      request.send(formData)

    }
  }
}
</script>

<style lang="scss">
.form {
  display: flex;
  flex-direction: column;
  height: 82vh;
  margin-top: 20rem;
  margin-bottom: 240rem;
}

.form__wr {
  width: 100%;
}

.form__form {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 48rem 36rem;
  font-size: 18rem;
  color: #e6e6e6;
  background-color: #1c1c1c;
  //background-image: url("@/assets/patrick-bg-2.png");
  background-size: cover;
}

.form__body {
  display: flex;
  position: relative;
  flex-wrap: wrap;
  border-radius: 26rem;
  overflow: hidden;
  margin: 80rem 68rem;
}

.form__title {
  font-size: 36rem;
  margin-bottom: 32rem;
  text-align: center;
  color: #e6e6e6;
}

.form__selected-model {
  position: absolute;
  top: 20rem;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 16rem;
  font-size: 32rem;
  color: #ffffff;
}

.form__clear-select-button {
  position: absolute;
  top: 46%;
  right: -80rem;
  transform: translateY(-50%);
  border: none;
  color: red;
  cursor: pointer;
  background-color: transparent;
  font-size: 38rem;
}

.form__input-wrapper {
  position: relative;
  width: 45%;
}

.form__input {
  border-radius: 50rem;
  border: none;
  font-size: 32rem;
  color: var(--vt-c-black-soft);
  background-color: rgba(253, 253, 253, 0.9);
  padding: 16rem 46rem;
  margin-bottom: 32rem;
  width: 100%;
}

.form__input--invalid {
  border: 1px solid red;
}

.form__input::placeholder {
  color: rgba(53, 53, 53, 0.7);
}

.form__input-error {
  position: absolute;
  bottom: 0rem;
  left: 18rem;
  font-size: 22rem;
  text-align: left;
  color: red;
  max-width: 100%;
}

.form__submit-button-wr {
  width: 45%;
  display: flex;
  justify-content: center;
}

.form__submit-button {
  background-color: #37c106;
  color: white;
  border: none;
  border-radius: 12rem;
  padding: 20rem 68rem;
  margin: 20rem auto 30rem;
  font-size: 28rem;
}

.form__submit-button:disabled {
  opacity: 0.5;
}

.form__header {
  width: 100%;
  font-size: 64rem;
  text-align: center;
  color: white;
}

.form__hint {
  width: 45%;
  display: block;
  color: #f4f4f4;
  font-size: 22rem;
  margin-bottom: 20rem;
  padding-right: 60rem;
  padding-left: 30rem;
}

.form__selected-product {
  position: relative;
  width: 50%;
  min-height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>