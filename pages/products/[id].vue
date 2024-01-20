<template>
<<<<<<< feature/nuxt-fetch
    <div class="flex flex-col items-cente bg-white p-6 rounded-lg shadow-md gap-2 max-w-md w-full my-8 mx-auto">
        <img :src="product.image" :alt="product.title" class="w-[200px] h-auto self-center mb-6">
        <h3 class="font-semibold overflow-hidden text-center text-lg">{{product.title}}</h3>
        <span class="text-gray-500 text-pretty capitalize">{{product.description}}</span>
        <h4 class="font-semibold text-lg truncate italic hover:underline text-blue-500">
            <span class="not-italic text-black text-sm">in</span> 
            {{product.category}}</h4>
        <span class="text-xl font-bold">${{product.price}}</span>
        <div class="flex items-center gap-x-1">
            <Icon name="mdi:star" size="18" color="yellow" v-for="n in rating"/>
            <span class="text-gray-500 text-sm">{{product.rating.count}} reviews</span>
        </div>
=======
    <div>
        
>>>>>>> added: Iconify module
    </div>
</template>

<script setup>
<<<<<<< feature/nuxt-fetch
const BaseURL = 'https://fakestoreapi.com/products/'
const route = useRoute()

const pId = ref(route.params.id)

const uri = BaseURL + pId.value

const { data : product } = await useFetch(uri)
const rating = Math.floor(product.value.rating.rate)

// console.log(rating);
=======

>>>>>>> added: Iconify module
</script>

<style scoped>

</style>