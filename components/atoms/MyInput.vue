<template>
    <div class="mt-20">
        <label :for="id" class="mr-2">{{ label }}</label>
        <input :id="id" type="text" :pattern="(type === 'number') ? '[0-9]' : '[a-z]'"
            :inputmode="type === 'number' ? 'numeric' : 'text'" @input="$event => updateModelVal($event)"
            v-model="modelVal" v-bind="$attrs" class="rounded p-2 ">
        <!-- <pre>{{ $attrs }}</pre> -->
        <pre>type of modelVal- {{ typeof modelVal }}</pre>
    </div>
</template>

<script lang="ts" setup generic="T extends 'text' | 'number'">

const id = crypto.randomUUID()

defineOptions({
    inheritAttrs: false
})

const { type = 'text', label = 'Input Label' } = defineProps<{
    type: T,
    label: String
}>()

// to ensure errors on wrong type passing
type ValueType = T extends 'number' ? number : string

const modelVal = defineModel<ValueType>({ required: true })

const updateModelVal = (e: Event) => {
    const target = e.target as HTMLInputElement

    if (type === 'number') modelVal.value = Number(target.value) as ValueType
    else modelVal.value = String(target.value) as ValueType
}


</script>

<style lang="scss" scoped></style>