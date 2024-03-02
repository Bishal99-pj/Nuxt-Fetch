<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 place-self-center">
        <MyInput v-model="amount" label="Number" type="number" />
        <MyInput v-model="msg" label="String" type="text" />

        <div class="mt-10 bg-sky-100 rounded p-4">
            <pre>{{ { val: amount, type: typeof amount } }}</pre>
        </div>
        <div class="mt-10 bg-sky-100 rounded p-4">
            <pre>{{ { val: msg, type: typeof msg } }}</pre>
        </div>
    </div>
</template>

<script setup lang="ts">
const amount = ref(0)
const msg = ref('')
</script>

<style lang="postcss" scoped></style>