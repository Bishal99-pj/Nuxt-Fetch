<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10">
        <ProductCard v-for="p in products" :key="p.id" :product="p"/>
    </div>
</template>

<script setup>
const BaseURL = 'https://fakestoreapi.com/products'

const {data: products} = await useFetch(BaseURL)

</script>

<style scoped>

</style>