<script setup lang="ts">
import type { Story } from '@/types/story'

const props = defineProps<{
  story: Story
}>()
</script>

<template>
  <div
    class="story-item"
    :class="{ viewed: props.story.viewed }"
  >
    <img
      data-fancybox="gallery"
      :src="props.story.base64img"
      alt=""
    />
  </div>
</template>

<style scoped>
.story-item {
  width: 66px;
  height: 66px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(#90e0ef, #00b4d8, #0077b6);
  cursor: pointer;
  overflow: hidden;
}

.story-item.viewed {
  background: #adb5bd;
}

.story-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 3px solid #fff;
}
</style>
