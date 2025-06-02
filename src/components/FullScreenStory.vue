<script setup lang="ts">
import type { Story } from '@/types/story'
import { onMounted, onUpdated } from 'vue'

const props = defineProps<{
  activeStory: Story
  activeStoryIndex: number
  storiesLength: number
}>()

const emit = defineEmits<{
  changeStoryIndex: [index: number]
}>()

onMounted(() => {
  startTimeout()
})

onUpdated(() => {
  startTimeout()
})

const startTimeout = () => {
  setTimeout(() => {
    emit('changeStoryIndex', props.activeStoryIndex + 1)
  }, 3000)
}
</script>

<template>
  <div class="wrapper">
    <div class="progress-list">
      <div
        v-for="item in storiesLength"
        :key="item"
        class="progress-item"
      >
        <span v-if="item === props.activeStoryIndex + 1"></span>
      </div>
    </div>
    <div class="story">
      <img
        :src="activeStory!.base64img"
        alt="Story"
      />
    </div>
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
  background: rgba(0,0,0, .2);
  display: flex;
  position: relative;
  border-radius: 2px;
}

.progress-item span {
  border-radius: 2px;
  height: 100%;
  background: rgba(0,0,0, .4);
  animation: progress 3000ms linear;
  position: absolute;
}

.story {
  max-height: calc(100vh - 160px);
  margin: auto 0;
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
