<template>
    <div class="flex flex-col justify-center max-w-xs mx-auto space-y-3">
        <div class="flex gap-1.5 items-center">
            <Icon name="mdi:home" size="26" />
            <span>Home</span>
        </div>
        <TestPopover />
        <!-- <TestPopover /> -->
        <Popover />
        <!-- <MyAlert />
        <MyAlert variant="success" />
        <MyAlert variant="warning" />
        <MyAlert variant="danger" /> -->

        <button @click="changeQuery(1)">Increase Query</button>
        <button @click="changeQuery(-1)">Decrease Query</button>
        <button @click="changeRef(1)">Increase Ref</button>
        <button @click="changeRef(-1)">Decrease Ref</button>

        <pre>{{ data }}</pre>
    </div>
</template>

<script setup lang="ts">
// useAsyncData and useFetch demo app
const { page, changeQuery } = useQuery()
const { param, changeRef } = useParamRef()

// useFetch
const { data } = useFetch('/api/queryResults', {
    query: {
        page, param
    }
})

// useAsyncData
// const {data} = useAsyncData('qResult' , () => $fetch('/api/queryResults', {
//     query: {
//         page: page.value,
//         param: param.value
//     },
// }),{
//     watch : [page, param]
// })


function useQuery() {
    const route = useRoute()
    const page = computed(() => Number(route.query.page) || 0)
    const changeQuery = (val: number) => {
        navigateTo({
            path: '/',
            query: {
                page: page.value + val
            }
        })
    }
    return { page, changeQuery }
}


function useParamRef() {
    const param = ref(1)
    const changeRef = (val: number) => {
        param.value += val
    }
    return { param, changeRef }
}
</script>

<style lang="postcss" scoped>
button {
    @apply text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
}
</style>