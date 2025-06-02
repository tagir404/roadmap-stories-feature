<script setup lang="ts">
import AddStoryButton from '@/components/AddStoryButton.vue'
import StoryItem from '@/components/StoryItem.vue'
import { getExpiredDate, toBase64 } from '@/utils/functions'
import type { Story } from '@/types/story'
import { computed, reactive } from 'vue'
import FullScreenStory from './FullScreenStory.vue'

const props = defineProps<{
  stories: Story[]
}>()

const emit = defineEmits<{
  addNewStory: [e: Story]
}>()

const uploadStory = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]!
  const base64img = await toBase64(file)
  const newStory = {
    base64img,
    expiredDate: getExpiredDate()
  }

  emit('addNewStory', newStory)
}

const fullMode = reactive({
  activeStoryIndex: 0,
  isOpen: false
})

const activeStory = computed(() =>
  props.stories.find((_, i) => i === fullMode.activeStoryIndex)
)

const openStory = (activeStoryIndex: number) => {
  fullMode.activeStoryIndex = activeStoryIndex
  fullMode.isOpen = true
}
</script>

<template>
  <div class="storybar">
    <AddStoryButton @upload-story="uploadStory" />
    <div class="storybar-stories">
      <StoryItem
        v-for="(story, i) in props.stories"
        :key="i"
        :story
        @click="openStory(i)"
      />
    </div>
    <Teleport to="body">
      <Transition>
        <FullScreenStory
          v-if="fullMode.isOpen && activeStory"
          :stories="props.stories"
          :active-story-index="fullMode.activeStoryIndex"
          @change-story-index="fullMode.activeStoryIndex = $event"
          @slideshow-ended="fullMode.isOpen = false"
        />
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.storybar {
  display: flex;
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  border: 2px solid #333;
  width: 100%;
  max-width: 1200px;
}

.storybar-stories {
  display: flex;
  gap: 10px;
}
</style>
