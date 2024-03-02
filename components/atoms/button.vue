<template>
    <div class="text-center text-2xl mt-10">
        <button class="btn" :class="baseClasses" :type="variant">{{ label }}</button>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

enum enumTypes {
    Button = 'button',
    Reset = 'reset',
    Submit = 'submit',
}

// getting array values as types
const values = ['foo', 'bar', 'baz'] as const;

type UnionType = typeof values[number]

// error
// const balo : UnionType = 10

type Props = {
    label: string,
    //--- to get the keys from the enum
    // variant: keyof typeof enumTypes,

    // variant?: 'button' | 'submit' | 'reset',

    //--- to get the values from the enum
    variant?: `${enumTypes}`,
    baseClasses?: string[]
}


/* No Strict Checking */
// const {
//     label = 'Base Button',
//     variant = 'button',
//     baseClasses = ['container border-0 shadow', 9]
// } = defineProps<Props>()



withDefaults(defineProps<Props>(), {
    label : 'Base Button',
    variant : 'button',
    baseClasses : () => ['container border-0 shadow', 'mx-auto']
})


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