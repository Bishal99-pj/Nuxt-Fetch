<template>
    <article class="flex">
        <slot>
            <slot name="media-left" />
            <div class="ms-3 flex flex-col">
                <slot name="media-content" />
            </div>
            <div class="ms-auto shrink-0">
                <slot name="media-right" />
            </div>
        </slot>
    </article>

</template>

<script setup lang="ts">
// defineProps({
//   prop : {
//     type : String,
//     required : true
//   }
// })
</script>

<style scoped></style>