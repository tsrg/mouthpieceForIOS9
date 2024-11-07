<template>
  <div id="app">
    <main>
      <MainSlider2
          id="slider"
          :slides="slides"
          @button:click="sliderButtonClickHandler"
      />
      <TheCatalog
          id="catalog"
          :products="products"
          :visibleProductsCount="visibleProductsCount"
          :isMoreButtonVisible="isMoreButtonVisible"
          @product:select="selectProductHandler"
          @show:more="showMore"
      />
      <MainForm
          id="form"
          ref="form"
          :selectedProduct="selectedProduct"
          @product:remove="removeProductHandler"
      />
    </main>
  </div>
</template>

<script>
import MainSlider2 from './components/MainSlider2.vue'
import TheCatalog from './components/TheCatalog.vue'
import MainForm from './components/MainForm.vue'

const defaultVisibleProductsCount = 6

export default {
  name: 'App',
  components: {
    MainSlider2,
    TheCatalog,
    MainForm
  },
  data () {
    return {
      selectedProduct: {},
      slides: [],
      products: [],
      scrollTimer: null,
      visibleProductsCount: defaultVisibleProductsCount
    }
  },
  created() {
    this.getSlides()
    this.getProducts()
  },
  mounted() {
    document.addEventListener('scroll', this.scrollHandler)
  },
  beforeDestroy() {
    document.addEventListener('scroll', this.scrollHandler)
  },
  computed: {
    productsCount () {
      return this.products.length
    },
    isMoreButtonVisible () {
      return this.visibleProductsCount < this.productsCount
    }
  },
  methods: {
    showMore () {
      this.visibleProductsCount = this.visibleProductsCount + 6
    },
    selectProductHandler (modelName) {
      this.selectedProduct = modelName
      this.$refs.form?.$el?.scrollIntoView({behavior: 'smooth'})
      this.setScrollTimer(120000)
    },
    removeProductHandler () {
      this.selectedProduct = ''
    },
    getSlides () {
      const Http = new XMLHttpRequest()
      const slidesUrl = '/slides/slides.json'

      Http.open('GET', slidesUrl)
      Http.setRequestHeader('Cache-Control', 'no-cache, no-store, max-age=0')
      Http.setRequestHeader('Expires', 'Thu, 1 Jan 1970 00:00:00 GMT')
      Http.setRequestHeader('Pragma', 'no-cache')
      Http.send()

      Http.onreadystatechange = () => {
        if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
          this.slides = JSON.parse(Http.responseText).slides
        }
      }
    },
    getProducts () {
      const Http = new XMLHttpRequest()
      const url = '/products/products.json'

      Http.open('GET', url)
      Http.send()

      Http.onreadystatechange = () => {
        if (Http.readyState === XMLHttpRequest.DONE && Http.status === 200) {
          this.products = JSON.parse(Http.responseText).products
        }
      }
    },
    scrollHandler () { this.setScrollTimer() },
    setScrollTimer (time = 30000) {
      clearTimeout(this.scrollTimer)
      this.scrollTimer = setTimeout(() => {
        document.getElementById('app').scrollIntoView({behavior: 'smooth'})
        clearTimeout(this.scrollTimer)
        this.resetState()
        this.scrollTimer = null
      }, time)
    },
    resetState () {
      this.$bus.$emit('reset')
      this.selectedProduct = {}
      this.visibleProductsCount = defaultVisibleProductsCount
    },
    sliderButtonClickHandler (button) {
      if (button.goalId) {
        // eslint-disable-next-line no-undef
        ym(98552804,'reachGoal', button.goalId)
      }

      const section = button.link ? document.querySelector(button.link) : null

      if (section) {
        section.scrollIntoView({behavior: 'smooth'})
        this.setScrollTimer(60000)
      }
    }
  }
}

import "vue-toastification/dist/index.css";
import "./assets/main.css";
</script>

<style>
html {
  max-width: 100vw;
  overflow-x: hidden;
}

header {
  line-height: 1.5;
}

@media (min-width: 1024rem) {
  header {
    display: flex;
    place-items: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
