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

const viewStory = (index: number) => {
  stories.value[index].viewed = true
  setStoriesToLocalStorage(stories.value)
}
</script>

<template>
  <div class="wrapper">
    <h1>Stories App</h1>
    <StoryBar
      :stories
      @add-new-story="addNewStory"
      @story-viewed="viewStory"
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

h1 {
  margin-bottom: 20px;
}

@media (max-width: 640px) {
  .wrapper {
    padding: 20px;
  }
}
</style>
