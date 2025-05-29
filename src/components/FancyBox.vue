<script setup lang="ts">
import { onMounted, onUnmounted, onUpdated, useTemplateRef } from 'vue'
import { Fancybox } from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import type { ComponentOptionsType } from '@fancyapps/ui/types/Fancybox/options';


const props = defineProps<{
  options: Partial<ComponentOptionsType>
}>()

const containerRef = useTemplateRef('container')

onMounted(() => {
  Fancybox.bind(containerRef.value, '[data-fancybox]', {
    ...props.options
  })
})

onUnmounted(() => {
  Fancybox.destroy()
})

onUpdated(() => {
  Fancybox.unbind(containerRef.value)
  Fancybox.close()

  Fancybox.bind(containerRef.value, '[data-fancybox]', {
    ...props.options
  })
})
</script>

<template>
  <div ref="container">
    <slot></slot>
  </div>
</template>
