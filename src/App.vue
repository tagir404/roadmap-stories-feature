<script setup lang="ts">
import StoryBar from '@/components/StoryBar.vue'
import { ref } from 'vue'
import type { Story } from './types/story'

const stories = ref<Story[]>(
  JSON.parse(localStorage.getItem('stories') || '[]')
)

if(stories.value.length) {
  filterExpiredStories()
}

const addNewStory = (story: Story) => {
  localStorage.setItem('stories', JSON.stringify([...stories.value, story]))
  stories.value.push(story)
}

function filterExpiredStories() {
  const now = Date.now()
  stories.value = stories.value.filter(story => story.expiredDate > now)
  localStorage.setItem('stories', JSON.stringify([...stories.value]))
}
</script>

<template>
  <div class="wrapper">
    <StoryBar :stories @add-new-story="addNewStory" />
  </div>
</template>

<style scoped>
.wrapper {
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
