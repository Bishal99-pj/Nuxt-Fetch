<template>
  <div class="px-6 container mx-auto">
    <NuxtLoadingIndicator />
    <AppNav />
    <NuxtPage />
    <Button label="999" variant="submit" />
  </div>
</template>

<script setup lang="ts">
const count = ref<number>(-2)
const double = computed<number>(() => count.value * 2)
</script>
