<template>
  <div class="main-slider">
    <swiper
      :options="swiperOptions"
      class="main-slider__slider"
    >
      <swiper-slide
        v-for="slide in slides"
        :key="slide.src"
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
            >
              {{ button.text }}
            </button>
          </div>
        </div>
      </swiper-slide>
<!--      <div class="swiper-button-prev" slot="button-prev"></div>-->
<!--      <div class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'MainSlider',
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    slides: Array
  },
  data() {
    return {
      swiperOptions: {
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // },
        loop: 'true',
        autoplay: { delay: 5000 }
      }
    }
  },
  methods: {
    buttonClickHandler (button) {
      if (button.goalId) {
        // eslint-disable-next-line no-undef
        ym(98552804,'reachGoal', button.goalId)
      }

      const section = button.link ? document.querySelector(button.link) : null

      if (section) {
        section.scrollIntoView({behavior: 'smooth'})
      }
    }
  }
}

// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';
// import 'swiper/css/navigation';
import 'swiper/dist/css/swiper.css'
</script>

<style lang="scss">
.main-slider__img {
  width: 100%;
  height: auto;
}

.main-slider {
  width: 99.2vw;
}
.main-slider__slider {

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

  .main-slider__slide--patrick & {
    flex-direction: row;
  }
}

.main-slider__button {
  padding: 12rem 24rem;
  border: 2rem solid hsla(160, 100%, 37%, 1);
  border-radius: 14rem;
  font-size: 24rem;
  line-height: 1;

  .main-slider__slide--patrick & {
    padding: 12rem 36rem;
    border: none;
    color: #9b09d1;
    background-color: white;
    border-radius: 24rem;
    font-size: 24rem;
    font-weight: 600;
    line-height: 1;
  }

  .main-slider__slide--dark & {
    padding: 12rem 24rem;
    border-radius: 14rem;
    border: 2rem solid green;
    font-size: 24rem;
    line-height: 1;
    background-color: #353535;
    color: white;
    min-width: 259rem;
  }

  .main-slider__slide--light-red & {
    padding: 12rem 24rem;
    border-radius: 14rem;
    border: 2rem solid #eaa8a8;
    font-size: 24rem;
    line-height: 1;
    background-color: #ffffff;
    color: #f84a4a;
    min-width: 259rem;
  }

  .main-slider__slide--blue & {
    padding: 12rem 24rem;
    border-radius: 14rem;
    border: 2rem solid #042655;
    font-size: 24rem;
    line-height: 1;
    background-color: #ffffff;
    color: #0a1943;
    min-width: 259rem;
  }
}

@media (orientation: landscape) {
  .main-slider {
    width: 100vw;
  }

  .main-slider__slide {
    width: 100vw;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .main-slider__img {
    width: auto;
    height: 100vh;
  }
}
</style>