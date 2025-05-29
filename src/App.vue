<script setup lang="ts">
import { ref } from 'vue';
import StoryBar from '@/components/StoryBar.vue'

const stories = ref<string[]>(JSON.parse(localStorage.getItem('stories') || '[]'))
</script>

<template>
  <div class="wrapper">
    <StoryBar :stories />
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
