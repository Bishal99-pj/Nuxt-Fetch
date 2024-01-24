<template>
    <div class="text-center my-3 text-xl font-semibold" v-if="pending">Loading Product Info...</div>
    <div class="flex flex-col items-cente bg-white p-6 rounded-lg shadow-md gap-2 max-w-md w-full my-8 mx-auto" v-else>
        <img :src="product.image" :alt="product.title" class="w-[200px] h-auto self-center mb-6">
        <h3 class="font-semibold overflow-hidden text-center text-lg">{{product.title}}</h3>
        <p class="text-gray-500 text-pretty capitalize">{{product.description}}</p>
        <h4 class="font-semibold text-lg truncate italic hover:underline text-blue-500">
            <span class="not-italic text-black text-sm">in</span> 
            {{product.category}}
        </h4>
        <span class="text-xl font-bold">${{product.price}}</span> 
        <div class="flex items-center gap-x-1">
            <Icon name="mdi:star" size="18" color="yellow" v-for="n in stars"/>
            <span class="text-gray-500 text-sm">{{product.rating.count}} reviews</span>
        </div> 
    </div>
</template>

<script setup>
const BaseURL = 'https://fakestoreapi.com/products/'
const route = useRoute()
const stars = ref(0)

const pId = route.params.id

const uri = BaseURL + pId

const { data : product , pending } = await useFetch(uri)

stars.value = Math.floor(product.value.rating.rate)


</script>

<style scoped>

</style>