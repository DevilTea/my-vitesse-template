<template>
  <div class="min-h-48">
    <h1 class="text-5xl text-gray-800 dark:text-white">{{ t('hello') }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  setup () {
    const { t } = useI18n()
    return {
      t
    }
  }
})
</script>

<route>
{
  name: 'Home',
  meta: {
    layout: 'default'
  }
}
</route>
