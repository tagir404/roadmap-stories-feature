<script setup lang="ts">
import AddStoryButton from '@/components/AddStoryButton.vue'
import FancyBox from '@/components/FancyBox.vue'
import StoryItem from '@/components/StoryItem.vue'
import { toBase64 } from '@/utils/functions'
import type { ComponentOptionsType, PluginsOptionsType } from '@fancyapps/ui/types/Fancybox/options';

const props = defineProps<{
  stories: string[]
}>()

const uploadStory = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]!
  const base64file = await toBase64(file)
  localStorage.setItem(
    'stories',
    JSON.stringify([...props.stories, base64file])
  )
}

const fancyboxOptions: Partial<ComponentOptionsType & PluginsOptionsType> = {
  Fullscreen: {
    autoStart: true
  },
  Carousel: {
    infinite: false,
    Autoplay: {
      autoStart: true,
      timeout: 5000
    },
    Panzoom: {
      click: false
    }
  },
  Toolbar: {
    enabled: false
  }
}
</script>

<template>
  <div class="storybar">
    <AddStoryButton @upload-story="uploadStory" />
    <FancyBox :options="fancyboxOptions">
      <div class="storybar-stories">
        <StoryItem
          v-for="(story, i) in props.stories"
          :key="i"
          :story
        />
      </div>
    </FancyBox>
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
