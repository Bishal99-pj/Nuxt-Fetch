<template>
    <ol class="no-underline flex justify-between max-w-lg mx-auto mt-8">
        <li v-for="category in data.categories" class="capitalize font-semibold text-purple-700 hover:underline cursor-pointer">{{category}}</li>
    </ol>
    <div class="text-center my-3 text-xl font-semibold" v-if="pending">Loading Products data...</div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10" v-else>
        <ProductCard v-for="p in data.products" :key="p.id" :product="p"/>
    </div>
</template>

<script setup>
const BaseURL = 'https://fakestoreapi.com/products'
const catURL = 'https://fakestoreapi.com/products/categories'

const {data , pending} = useAsyncData('item' , async ()=> {

    const [products , categories] = await Promise.all([$fetch(BaseURL) , $fetch(catURL)])
    
    return { products , categories}
},{ lazy : true})


// const {data: products , pending} = useFetch(BaseURL, {
//     lazy : true,
// })

</script>

<style scoped>

</style>