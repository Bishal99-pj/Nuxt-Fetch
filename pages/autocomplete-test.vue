<template>
    <div class="grid place-items-center min-h-[70dvh]">
        <h1 class="text-lg text-center">Selected User : {{ selectedPerson?.name }}</h1>
        <Autocomplete :options="people" v-model="selectedPerson" label-by="name">
            <template v-slot="{ option }">
                <Icon name="mdi:check" v-if="selectedPerson?.id === option.id" class="w-5 h-5 me-0.5 text-green-500" />
                {{ option.name }}
            </template>
        </Autocomplete>

    </div>
</template>

<script setup lang="ts">
import type { Person } from '~/types/people.type';


const people: Person[] = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
    { id: 7, name: 'Gregory Lucas' },
    { id: 8, name: 'Leon Holloway' },
    { id: 9, name: 'Alfred Rice' },
    { id: 10, name: 'Anne Singleton' },
    { id: 11, name: 'Sophia Mendoza' },
    { id: 12, name: 'Grace Neal' },
    { id: 13, name: 'Michael Watson' },
    { id: 14, name: 'Jennie Schneider' },
    { id: 15, name: 'Alvin Klein' },
    { id: 16, name: 'Ollie Norman' },
    { id: 17, name: 'Agnes Lucas' },
    { id: 18, name: 'Ida Paul' },
    { id: 19, name: 'Roger Santiago' },
    { id: 20, name: 'Alejandro Figueroa' },
]

const selectedPerson: Ref<Person | null> = ref(null)

</script>
