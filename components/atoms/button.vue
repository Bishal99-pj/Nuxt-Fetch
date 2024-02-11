<template>
    <div class="text-center text-2xl mt-10">
        <button class="btn" :type="variant">{{ label }}</button>
    </div>
</template>

<script setup lang="ts">

enum enumTypes {
    Button = 'button',
    Reset = 'reset',
    Submit = 'submit',
}



type Props = {
    label: string,
    //--- to get the keys from the enum
    // variant: keyof typeof enumTypes,

    // variant?: 'button' | 'submit' | 'reset',

    //--- to get the values from the enum
    variant?: `${enumTypes}`,
}

withDefaults(defineProps<Props>(), {
    label: 'Base Button',
    variant: 'button'
})
// console.log(typeof variant.value);

</script>

<style lang="postcss" scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .btn {
        @apply p-4 bg-blue-500 text-white rounded hover:bg-blue-600
    }
}
</style>