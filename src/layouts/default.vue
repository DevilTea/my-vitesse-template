<template>
  <main>
    <router-view />
  </main>
  <nav class="flex nav justify-center items-center">
    <router-link
      class="nav-item locale-switch"
      :data-text="t('text')"
      :to="{ params: { locale: nextLocale } }"
    >
      <carbon-translate></carbon-translate>
    </router-link>
    <button class="nav-item" @click="switchColorSchema">
      <mdi-brightness-auto v-show="colorSchema === 'auto'"></mdi-brightness-auto>
      <mdi-brightness-2 v-show="colorSchema === 'dark'"></mdi-brightness-2>
      <mdi-brightness-7 v-show="colorSchema === 'light'"></mdi-brightness-7>
    </button>
  </nav>
</template>

<script lang="ts">
import { useLocaleSwitch } from '@/modules/i18n'
import { useTheme } from '@/modules/theme'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'DefaultLayout',
  setup () {
    const { t } = useI18n()
    const { nextLocale } = useLocaleSwitch()
    const { colorSchema, switchColorSchema } = useTheme()

    return {
      t,
      nextLocale,
      colorSchema,
      switchColorSchema
    }
  }
})
</script>
