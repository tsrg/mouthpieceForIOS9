<template>
    <hooper
      ref="slider"
      class="main-slider__slider"
      :autoPlay="true"
      :playSpeed="7000"
      :infiniteScroll="true"
      :wheelControl="false"
      :transition="600"
    >
      <slide
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
            >
              {{ button.text }}
            </button>
          </div>
        </div>
      </slide>
    </hooper>
</template>

<script>
import { Hooper, Slide } from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: 'MainSlider2',
  components: {
    Hooper,
    Slide
  },
  props: {
    slides: Array
  },
  watch: {
    slides: function () {
      this.$refs.slider.update()
    }
  },
  mounted() {
    requestAnimationFrame(() => {this.$refs.slider.update()})
  },
  methods: {
    buttonClickHandler (button) {
      this.$emit('button:click', button)
    }
  }
}
</script>

<style lang="scss">
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

  .main-slider__slide--patrick & {
    flex-direction: row;
  }
}

.main-slider__button {
  margin: 10rem;
  padding: 22rem 48rem;
  border: 2rem solid hsla(160, 100%, 37%, 1);
  border-radius: 14rem;
  font-size: 36rem;
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
    border-radius: 14rem;
    border: 2rem solid green;
    line-height: 1;
    background-color: #353535;
    color: white;
    min-width: 340rem;
  }

  .main-slider__slide--light-red & {
    border-radius: 14rem;
    border: 2rem solid #eaa8a8;
    line-height: 1;
    background-color: #ffffff;
    color: #f84a4a;
    min-width: 340rem;
  }

  .main-slider__slide--blue & {
    border-radius: 14rem;
    border: 2rem solid #042655;
    line-height: 1;
    background-color: #ffffff;
    color: #0a1943;
    min-width: 340rem;
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