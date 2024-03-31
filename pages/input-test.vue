<template>
  <section class="flex flex-col container mx-auto h-[90dvh]">
    <div
      class="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6 place-items-end"
    >
      <!-- <MyInput v-model="amount" label="Number" type="number" />
        <MyInput v-model="msg" label="String" type="text" /> -->

      <!-- String Select -->
      <SelectBox
        :options="streets"
        v-model="form.street"
        label="Select Street Address"
      />
      <!-- Number Select -->
      <SelectBox :options="years" v-model="form.year" label="Select Year" />
      <!-- OBJECTS -->
      <!-- Select (with image) -->
      <SelectBox
        :options="persons"
        v-model="form.person"
        label="Select Person"
        option-label="label"
      >
        <template #option="{ option, activeOption }">
          <div class="flex items-center space-x-3">
            <NuxtImg
              :src="option.imageUrl"
              :alt="option.label"
              class="w-8 h-8 rounded-full"
            />
            <span>{{ option.label }}</span>
          </div>
        </template>
      </SelectBox>
      <!-- Select (with flag) -->
      <SelectBox
        :options="countries"
        v-model="form.country"
        label="Select Country"
        option-label="label"
      />
      <!-- <template #option="{ option, activeOption }">
                        <div class="flex items-center space-x-3">
                            <span>{{ option.flag }}</span>
                            <span>{{ option.label }}</span>
                        </div>
                    </template>
                </SelectBox> -->
      <!-- Logs -->
    </div>
    <div class="pre mt-auto w-full">
      <pre>
        {{ { value: form, type: typeof form.year } }}
    </pre
      >
    </div>
  </section>
</template>

<script setup lang="ts">
import type { OptionType } from "~/types/option.types";

const amount = ref<number>(0);
const msg = ref<string>("");

interface Person extends OptionType {
  imageUrl: string;
  [key: string]: any;
}

type Country = {
  flag: string;
  [key: string]: any;
} & OptionType;

type Form = {
  street?: string;
  year?: number;
  person?: Person;
  country?: Country;
};

const form = reactive<Form>({
  street: undefined,
  year: undefined,
  person: undefined,
  country: undefined,
});

const streets: string[] = [
  "125 Hutic Junction",
  "1060 Gakbop Ridge",
  "1335 Uleat Terrace",
  "823 Vozfo Pike",
  "410 Ineag Trail",
  "1390 Kepuc Court",
  "188 Dajsir Drive",
  "1732 Duhab Park",
  "1015 Jowise Drive",
  "1119 Rocal Road",
];

const years: number[] = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

const persons: Person[] = [
  {
    id: 1,
    label: "Dennis Buchanan",
    imageUrl:
      "https://www.flowbite.com/docs/images/people/profile-picture-1.jpg",
  },
  {
    id: 2,
    label: "Allie Anderson",
    imageUrl:
      "https://www.flowbite.com/docs/images/people/profile-picture-2.jpg",
  },
  {
    id: 3,
    label: "Viola Graham",
    imageUrl:
      "https://www.flowbite.com/docs/images/people/profile-picture-3.jpg",
  },
  {
    id: 4,
    label: "Cynthia Ferguson",
    imageUrl:
      "https://www.flowbite.com/docs/images/people/profile-picture-4.jpg",
  },
  {
    id: 5,
    label: "Rena Chandler",
    imageUrl:
      "https://www.flowbite.com/docs/images/people/profile-picture-5.jpg",
  },
];

const countries: Country[] = [
  { id: 1, label: "USA", flag: "🏳️‍⚧️" },
  { id: 2, label: "GERMANY", flag: "🏳️‍🌈" },
  { id: 3, label: "ITALY", flag: "🏁" },
  { id: 4, label: "CHINA", flag: "🎌" },
];

// const deliveryDates: Date[] = []
</script>

<style lang="postcss" scoped>
.pre {
  @apply bg-sky-100 rounded p-4 overflow-auto max-w-7xl mx-auto text-left;
}
</style>
