<script lang="ts">
import { defineComponent } from 'vue'
import { useHead } from '@vueuse/head'

export default defineComponent({
  setup () {
    Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.useModule?.())
    useHead({
      title: 'Vitesse',
      meta: [
        { name: 'description', content: 'Opinionated Vite Starter Template' }
      ]
    })
    return {}
  }
})
</script>

<template>
  <router-view />
</template>
