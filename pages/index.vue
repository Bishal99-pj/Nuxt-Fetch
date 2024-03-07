<template>
    <div class="flex flex-col justify-center space-y-3">
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
        <!-- <TestModal>
            <template #dismiss="{ modal }">
                <button @click="modal?.hide()" type="button"
                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
            </template>
</TestModal>

<button @click="changeQuery(1)">Increase Query</button>
<button @click="changeQuery(-1)">Decrease Query</button>
<button @click="changeRef(1)">Increase Ref</button>
<button @click="changeRef(-1)">Decrease Ref</button>

<pre>{{ data }}</pre> -->

        <Media>
            <template #media-left>
                <figure class="shrink-0">
                    <NuxtImg src="https://bulma.io/images/placeholders/128x128.png" />
                </figure>
            </template>
            <template #media-content>
                <div class="flex flex-col">
                    <p>
                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                        <br>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu
                        pellentesque
                        tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                    </p>
                    <nav class="flex">
                        <div class="space-x-1.5 me-auto">
                            <a href="#">
                                <Icon size="24" name="mdi:reply-outline" />
                            </a>
                            <a href="#">
                                <Icon size="24" name="ant-design:retweet-outlined" />
                            </a>
                            <a href="#">
                                <Icon size="24" name="mdi:heart-outline" />
                            </a>
                        </div>
                    </nav>
                </div>
            </template>
            <template #media-right>
                <button
                    class="justify-center items-center flex-shrink-0 text-gray-600 hover:text-gray-900 rounded-md p-1.5 inline-flex h-8 w-8 dark:hover:text-white bg-gray-300 hover:bg-gray-400">
                    <Icon name="mdi:close" />
                </button>
            </template>
        </Media>
    </div>
</template>

<script setup lang="ts">
// useAsyncData and useFetch demo app
const { page, changeQuery } = useQuery()
const { param, changeRef } = useParamRef()

// useFetch
const { data } = await useFetch('/api/queryResults', {
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

<style lang="postcss" scoped></style>