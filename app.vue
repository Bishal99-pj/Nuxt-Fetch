<template>
  <div class="px-6 container mx-auto">
    <NuxtLoadingIndicator />
    <AppNav />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from 'flowbite'

const inputValue = ref<string>('')

const autofocus = ref(false)

const options = {
  "data-input-test-id": '3172ac',
  id: 'my-input-id',
  class: 'rounded-xl'
}

const count = ref<number>(-2)
const double = computed<number>(() => count.value * 2)

onMounted(() => {
  initFlowbite();
})
</script>
