<script setup lang="ts">
import type { Story } from '@/types/story'
import type { Swiper } from 'swiper'

const props = defineProps<{
  stories: Story[]
  activeStoryIndex: number
}>()

const emit = defineEmits<{
  changeStoryIndex: [index: number]
  slideshowEnded: []
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

  const isLastSlide =
    swiper.activeIndex === props.stories.length - 1

  if (isLastSlide) {
    finalSlideTimer = setTimeout(() => emit('slideshowEnded'), 3000)
  }
}

</script>

<template>
  <div class="wrapper">
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
  background: rgba(0, 0, 0, 0.5);
  padding: 50px;
}

.progress-list {
  display: flex;
  gap: 50px;
  width: 100%;
  height: 10px;
  margin-bottom: 50px;
  flex-shrink: 0;
}

.progress-item {
  flex: 1;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
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
  max-height: calc(100vh - 160px);
  margin: auto 0;
  display: flex;
  justify-content: center;
}

@keyframes progress {
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
}
</style>
