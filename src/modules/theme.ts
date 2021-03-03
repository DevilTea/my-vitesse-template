import { watch, computed, Ref, WritableComputedRef, inject } from 'vue'
import { usePreferredDark, useStorage } from '@vueuse/core'
import { UserModule } from '@/types'

let used = false

type ColorSchema = 'auto' | 'dark' | 'light'

interface InjectedTheme {
  isDark: WritableComputedRef<boolean>;
  colorSchema: Ref<ColorSchema>;
  switchColorSchema: () => void;
}

export const install: UserModule = ({ app, isClient }) => {
  if (isClient) {
    const order: ColorSchema[] = ['auto', 'dark', 'light']
    const colorSchema = useStorage('color-schema', 'auto') as Ref<ColorSchema>
    const preferredDark = usePreferredDark()
    const isDark = computed(() => colorSchema.value === 'auto'
      ? preferredDark.value
      : colorSchema.value === 'dark')

    const switchColorSchema = () => {
      colorSchema.value = order[(order.indexOf(colorSchema.value) + 1) % order.length]
    }

    app.provide('theme', {
      isDark,
      colorSchema,
      switchColorSchema
    })
  }
}

export const useTheme = () => {
  const theme: InjectedTheme | undefined = inject('theme')
  if (!theme) throw new Error('"theme" is not provided')
  return theme
}

export const useModule = () => {
  if (used) return
  used = true

  const { isDark } = useTheme()

  watch(
    isDark,
    v => typeof document !== 'undefined' && document.documentElement.classList.toggle('dark', v),
    { immediate: true }
  )
}
