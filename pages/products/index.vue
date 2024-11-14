.
<template>
  <div>
    <ol class="no-underline flex justify-between max-w-lg mx-auto mt-8">
      <li
        v-for="category in data?.categories"
        :key="JSON.stringify(category)"
        class="capitalize font-semibold text-purple-700 hover:underline cursor-pointer"
      >
        {{ category }}
      </li>
    </ol>
    <div
      v-if="status === 'pending'"
      class="text-center my-3 text-xl font-semibold"
    >
      Loading Products data...
    </div>

    <div
      v-else
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 my-10"
    >
      <ProductCard
        v-for="p in data?.products"
        :key="(p as any).id"
        :product="p"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const BaseURL = "https://fakestoreapi.com/products";
const catURL = "https://fakestoreapi.com/products/categories";

const { data, status } = useAsyncData(
  "item",
  async () => {
    const [products, categories] = await Promise.all([
      $fetch(BaseURL),
      $fetch(catURL),
    ]);

    return { products, categories };
  },
  { lazy: true }
);

const isLazy = ref(false);
</script>
