<script setup lang="ts">
import StoryBar from '@/components/StoryBar.vue'
import { ref } from 'vue'
import type { Story } from './types/story'
import { setStoriesToLocalStorage } from './utils/functions'

const stories = ref<Story[]>(
  JSON.parse(localStorage.getItem('stories') || '[]')
)

filterExpiredStories()

const addNewStory = (story: Story) => {
  stories.value.push(story)
  setStoriesToLocalStorage([...stories.value, story])
}

function filterExpiredStories() {
  const now = Date.now()
  stories.value = stories.value.filter(story => story.expiredDate > now)
  setStoriesToLocalStorage(stories.value)
}
</script>

<template>
  <div class="wrapper">
    <StoryBar
      :stories
      @add-new-story="addNewStory"
    />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 640px) {
  .wrapper {
    padding: 20px;
  }
}
</style>
