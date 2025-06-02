import type { Story } from '@/types/story'

export const checkImageSize = (
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<boolean> => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        resolve(img.width <= maxWidth && img.height <= maxHeight)
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

export const getExpiredDate = () => Date.now() + 1000 * 60 * 60 * 24

export const getFormattedDate = (timestamp: number) =>
  new Date(timestamp).toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit'
  })

export const setStoriesToLocalStorage = (stories: Story[]) => {
  localStorage.setItem('stories', JSON.stringify(stories))
}
