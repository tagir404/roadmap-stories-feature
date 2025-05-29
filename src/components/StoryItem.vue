<script setup lang="ts">
const props = defineProps<{
  story: string
}>()
</script>

<template>
  <div class="story-item">
    <img data-fancybox="gallery" :src="props.story" alt="">
  </div>
</template>

<style scoped>
.story-item {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #333;
  cursor: pointer;
  overflow: hidden;
}

.story-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
