<template>
  <div>
    <button :class="baseClasses">{{ text }}</button>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: Number,
  // should give error but does not 
  baseClasses: {
    type: Array<string[]>,
    default: () => ['border-0 shadow', 100]
  }
})

</script>