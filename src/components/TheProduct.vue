<template>
  <div class="product">
    <img
      :src="product.img"
      :alt="product.name"
      class="product__img"
    />
    <div class="product__name">{{ product.name }}</div>
    <div class="product__price">{{ product.price.current }} BYN</div>
    <button
      class="product__button"
      @click="productButtonClickHandler(product)"
    >
      ЗАКАЗАТЬ
    </button>
  </div>
</template>

<script>
export default {
  name: "TheProduct",
  props: {
    product: {
      type: Object
    }
  },
  methods: {
    productButtonClickHandler(product) {
      // ym(98552804,'reachGoal','test')
      this.$emit('product:select', product)
    }
  }
}
</script>

<style>
.product {
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 18rem;
  background-color: rgba(51 51 51, 0.75);
}

.product__img {
  width: 100%;
  height: auto;
  border-radius: 12rem;
  box-shadow: 4rem 4rem 8rem 0 rgba(34, 60, 80, 0.2);
  z-index: 2;
}

.product__name {
  padding: 20rem 16rem;
  font-size: 36rem;
  line-height: 24rem;
  font-weight: 300;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.product__price {
  font-size: 36rem;
  line-height: 40rem;
  font-weight: 700;
  text-align: center;
  padding-bottom: 6rem;
  color: #ffffff;
}

.product__button {
  padding: 20rem;
  border: none;
  border-radius: 12rem;
  background-color: #409a30;
  font-size: 34rem;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  margin: 16rem auto 24rem;
  width: 60%;
}

</style>
