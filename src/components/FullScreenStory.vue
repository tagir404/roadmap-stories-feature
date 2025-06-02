<script setup lang="ts">
import type { Story } from '@/types/story'
import { getFormattedDate } from '@/utils/functions'
import type { Swiper } from 'swiper'

const props = defineProps<{
  stories: Story[]
  activeStoryIndex: number
}>()

const emit = defineEmits<{
  changeStoryIndex: [index: number]
  close: []
}>()

let finalSlideTimer: ReturnType<typeof setTimeout> | null = null

const storyChange = (e: CustomEvent<[Swiper]>) => {
  const [swiper] = e.detail
  emit('changeStoryIndex', swiper.activeIndex)
  checkSwiperEnd(swiper)
}

const checkSwiperEnd = (swiper: Swiper) => {
  if (finalSlideTimer) {
    clearTimeout(finalSlideTimer)
    finalSlideTimer = null
  }

  const isLastSlide = swiper.activeIndex === props.stories.length - 1

  if (isLastSlide) {
    finalSlideTimer = setTimeout(() => emit('close'), 3000)
  }
}
</script>

<template>
  <div class="wrapper">
    <div
      @click="emit('close')"
      class="close-btn"
    >
      ✕
    </div>
    <div class="progress-list">
      <div
        v-for="item in stories.length"
        :key="item"
        class="progress-item"
      >
        <span v-if="item === props.activeStoryIndex + 1"></span>
      </div>
    </div>
    <swiper-container
      class="swiper"
      :autoplay="{
        delay: 3000,
        stopOnLastSlide: true
      }"
      :initial-slide="props.activeStoryIndex"
      @swiperslidechange="storyChange"
    >
      <swiper-slide
        v-for="story in stories"
        :key="story.expiredDate"
        class="story"
      >
        <img
          :src="story.base64img"
          alt="Story"
        />
        <p class="expired-text">
          Expires at {{ getFormattedDate(story.expiredDate) }}
        </p>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #000;
  padding: 40px;
}

.progress-list {
  display: flex;
  gap: 5px;
  width: 100%;
  height: 10px;
  margin-bottom: 50px;
  flex-shrink: 0;
}

.progress-item {
  flex: 1;
  height: 100%;
  background: gray;
  display: flex;
  position: relative;
  border-radius: 3px;
}

.progress-item span {
  border-radius: 3px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  animation: progress 3000ms linear forwards;
  position: absolute;
}

.swiper {
  max-width: 100%;
}

.story {
  margin: auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.story img {
  max-height: 60vh;
  object-fit: contain;
}

.expired-text {
  color: #fff;
  font-size: 18px;
  margin-top: 10px;
  text-align: right;
}

.close-btn {
  color: #fff;
  font-size: 36px;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

@keyframes progress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .wrapper {
    padding: 20px;
  }
}
</style>
