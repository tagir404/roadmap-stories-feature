<script setup lang="ts">
import AddStoryButton from './AddStoryButton.vue'
</script>

<template>
  <div class="storybar">
    <AddStoryButton />
  </div>
</template>

<style scoped>
.storybar {
  display: flex;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #333;
}
</style>
