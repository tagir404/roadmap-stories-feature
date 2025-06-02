<script setup lang="ts">
const emit = defineEmits<{
  uploadStory: [e: Event]
}>()
</script>

<template>
  <label class="add-story-btn">
    +
    <input
      @change="emit('uploadStory', $event)"
      type="file"
      accept="image/*"
      class="add-story-btn__input"
    />
  </label>
</template>

<style scoped>
.add-story-btn {
  color: #c1c1c1;
  font-size: 30px;
  width: 66px;
  height: 66px;
  border: 3px solid;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: .3s;
}

.add-story-btn:hover {
  color: #333;
}

.add-story-btn__input {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 0;
  height: 0;
}
</style>
