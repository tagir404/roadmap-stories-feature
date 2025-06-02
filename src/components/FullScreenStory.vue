<script setup lang="ts">
import type { Story } from '@/types/story'
import { computed } from 'vue';

const props = defineProps<{
  stories: Story[]
  activeStoryIndex: number
}>()

const activeStory = computed(() => props.stories.find((_, i) => i === props.activeStoryIndex))
</script>

<template>
  <div class="wrapper">
    <div>
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
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, .5);
  padding: 50px;
}
</style>
