<template>
  <div class="px-6 container mx-auto">
    <NuxtLoadingIndicator />
    <AppNav />
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
});
</script>
