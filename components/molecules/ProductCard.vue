<template>
        <NuxtLink :to="`/products/${product.id}`" class="flex flex-col items-center bg-white p-6 rounded-lg shadow-md gap-2 max-w-sm w-full">
            <img :src="product.image" :alt="product.title" class="w-[100px] h-auto self-center mb-6">
            <h3 class="font-semibold overflow-hidden">{{product.title}}</h3>
            <h4 class="font-semibold text-lg truncate italic hover:underline text-blue-500">
                <span class="not-italic text-black text-sm">in</span> 
                {{product.category}}</h4>
            <span class="text-xl font-bold">${{product.price}}</span>
            <div class="flex items-center gap-x-1">
                <Icon name="mdi:star" size="18" color="yellow" v-for="n in rating"/>
                <span class="text-gray-500 text-sm">{{product.rating.count}} reviews</span>
            </div>
        </NuxtLink>
</template>

<script setup>
const props = defineProps(['product'])

const product = ref(props.product)

const rating = Math.ceil(product.value.rating.rate)
</script>

<style scoped>

</style>