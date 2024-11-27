<template>
  <div class="main-slider">
    <carousel
      ref="slider"
      class="main-slider__slider"
      :auto="7000"
      :watch-items="slides"
      :loop="true"
    >
      <carousel-item
        v-for="(slide, index) in slides"
        :key="slide.src"
        :index="index"
        class="main-slider__slide"
        :class="slide.style ? `main-slider__slide--${slide.style}` : ''"
      >
        <img
          class="main-slider__img"
          :src="slide.src"
          :alt="slide.alt"
        />
        <div class="main-slider__buttons-wrapper">
          <div
            class="main-slider__buttons"
            :style="slide.buttonsPosition || ''"
          >
            <button
                v-for="button in slide.buttons"
                :key="button.id"
                @click.prevent="buttonClickHandler(button)"
                class="main-slider__button"
                :class="{ 'main-slider__button--buy': button.text === 'Заказать' }"
            >
              {{ button.text }}
            </button>
          </div>
        </div>
      </carousel-item>
    </carousel>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'vue-l-carousel'
import 'hooper/dist/hooper.css';

export default {
  name: 'MainSlider2',
  components: {
    Carousel,
    CarouselItem
  },
  props: {
    slides: Array
  },
  methods: {
    buttonClickHandler (button) {
      this.$emit('button:click', button)
    }
  }
}
</script>

<style lang="scss">
.v-carousel-nav,
.v-carousel-dots {
  display: none;
}

.main-slider {
  min-height: 100vh;
}

.main-slider__img {
  width: 100%;
}

.main-slider {
  width: 99.2vw;
}
.main-slider__slider {
  height: unset;
}

.main-slider__slide {
  position: relative;
}

.main-slider__buttons-wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  height: 50%;
  width: 50%;
}

.main-slider__buttons {
  position: absolute;
  display: flex;
  flex-direction: column;
  margin: 10rem;
}

.main-slider__button {
  margin: 10rem;
  padding: 22rem 78rem;
  border: 2rem solid #eaa8a8;
  line-height: 1;
  background-color: #ffffff;
  color: #f84a4a;
  border-radius: 14rem;
  font-size: 36rem;

  .main-slider__slide--patrick & {
    padding: 24rem 64rem;
    border: none;
    color: #e469b7;
    background-color: white;

    &:last-child {
      color: white;
      background-color: #e469b7;
      box-shadow: #e469b7 2px 2px 11px 3px;
    }
  }

  .main-slider__slide--dark & {
    border-radius: 14rem;
    border: 2rem solid green;
    line-height: 1;
    background-color: #353535;
    color: white;
    min-width: 340rem;

    &:last-child {
      color: white;
      background-color: green;
      box-shadow: green 2px 2px 11px 3px;
    }
  }

  .main-slider__slide--light-red & {
    border-radius: 14rem;
    border: 2rem solid #eaa8a8;
    line-height: 1;
    background-color: #ffffff;
    color: #f84a4a;
    min-width: 340rem;

    &:last-child {
      color: white;
      background-color: #da0e0e;
      border: none;
      box-shadow: #da0e0e 2px 2px 11px 3px;
    }
  }

  .main-slider__slide--blue & {
    border-radius: 14rem;
    border: 2rem solid #042655;
    line-height: 1;
    background-color: #ffffff;
    color: #0a1943;
    min-width: 340rem;

    &:last-child {
      color: white;
      background-color: #054daf;
      box-shadow: #054daf 2px 2px 11px 3px;
    }
  }

  .main-slider__slide--yellow & {
    border-radius: 14rem;
    border: 2rem solid #fa780e;
    line-height: 1;
    background-color: #ffffff;
    color: #fa780e;
    min-width: 340rem;

    &:last-child {
      color: white;
      background-color: #fa780e;
      box-shadow: #fa780e 2px 2px 11px 3px;
    }
  }
}

  .main-slider {
    width: 100vw;
  }

  .main-slider__slide {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .main-slider__img {
    width: 100%;
    height: auto;
  }


.v-carousel {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.v-carousel-items {
  overflow: hidden;
}
.v-carousel-dots {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
}
.v-carousel-dot {
  cursor: pointer;
  display: inline-block;
  width: 10px;
  height: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
}
.v-carousel-dot.active {
  background: #000;
  cursor: default;
}
.v-carousel-nav {
  cursor: pointer;
  position: absolute;
  line-height: 30px;
  color: #FFF;
  padding: 0 5px;
  background: rgba(0, 0, 0, 0.5);
  top: 50%;
  margin-top: -15px;
}
.v-carousel-nav.prev {
  left: 0;
}
.v-carousel-nav.next {
  right: 0;
}


.v-carousel-item {
  width: 100%;
  float: left;
}
</style>