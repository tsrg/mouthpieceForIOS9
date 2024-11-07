<template>
  <div class="catalog">
    <h2 class="catalog__header">Каталог</h2>
    <Product
      v-for="(product) in slicedProducts"
      :key="product.id"
      :product="product"
      class="catalog_product"
      @product:select="$emit('product:select', product)"
    />
    <transition name="fade" mode="out-in">
      <button
          v-if="isMoreButtonVisible"
          class="catalog__show-more-button"
          type="button"
          @click="$emit('show:more')"
      >
        Показать еще
      </button>
    </transition>
  </div>
</template>

<script>
import Product from '@/components/TheProduct.vue'

export default {
  name: 'TheCatalog',
  components: {Product},
  props: {
    products: {
      type: Array
    },
    isMoreButtonVisible: {
      type: Boolean
    },
    visibleProductsCount: {
      type: Number
    }
  },
  computed: {
    slicedProducts () {
      return this.products.slice(0, this.visibleProductsCount)
    }
  }
}
</script>

<style lang="scss">
.catalog {
  display: flex;
  flex-wrap: wrap;
  margin: 40rem 28rem;
}

.catalog_product {
  width: calc((100% - 84rem) /3);
  border-radius: 20rem;
  overflow: hidden;
  margin: 14rem;
}

.catalog__header {
  width: 100%;
  font-size: 64rem;
  padding-bottom: 20rem;
  text-align: center;
  color: white;
}

.catalog__show-more-button {
  margin: 60rem auto 20rem;
  min-width: 400rem;
  background-color: white;
  border: none;
  border-radius: 12rem;
  padding: 24rem 48rem;
  font-size: 36rem;
}
</style>
