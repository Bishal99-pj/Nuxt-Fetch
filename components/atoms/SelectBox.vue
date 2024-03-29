<template>
    <form>
        <label :for="'select-' + randomId" class="block mb-2 text-sm font-medium text-gray-950 dark:text-white">
            {{ label }}</label>
        <select v-bind="$attrs" v-model="selectedOption" :id="'select-' + randomId"
            :class="$attrs.class || twMerge('w-full rounded border-0', appendClass)">
            <option disabled value="">{{ placeholder || 'Select an option' }}</option>
            <option v-for="(option, index) in options" :key="getKey(option)" @mouseover="activeOption = option">
                <slot name="option" :option="option" :activeOption="activeOption">
                    {{ getLabel(option) }}
                </slot>
            </option>
        </select>
    </form>
</template>

<script setup lang="ts" generic="T">
import { twMerge, type ClassNameValue } from 'tailwind-merge';

defineOptions({
    inheritAttrs: false
})

const selectedOption = defineModel<T>()
const activeOption = ref<T>()

const props = defineProps<{
    label?: string,
    options: T[],
    optionLabel?: keyof T,
    appendClass?: ClassNameValue
    placeholder?: string
}>()


const getKey = (opt: T): string | number => {
    if (typeof opt === 'string' || typeof opt === 'number') return opt
    return JSON.stringify(opt)
}

const getLabel = (opt: T): any => {
    if (props.optionLabel && typeof opt === 'object') return opt![props.optionLabel]
    return String(opt)
}

const randomId = ref<string>('')

onMounted(() => randomId.value = crypto.randomUUID())
</script>

<style scoped>
select {
    appearance: none;
}
</style>