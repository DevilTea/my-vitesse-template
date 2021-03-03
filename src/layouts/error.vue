<template>
  <main>
    <router-view></router-view>
  </main>
  <nav class="nav">
    <button class="nav-item" @click="goBack">
      <akar-icons-arrow-back></akar-icons-arrow-back>
      <span class="ml-2">Go Back</span>
    </button>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ErrorLayout',
  setup () {
    const router = useRouter()

    return {
      goBack: () => router.back()
    }
  }
})
</script>
