<template>
    <!-- Dropdown search menu -->
    <div id="dropdownSearch" class="z-10 bg-white rounded-lg shadow max-w-sm dark:bg-gray-700">
        <div class="p-3">
            <label for="input-group-search" class="sr-only">Search Users</label>
            <div class="relative">
                <!-- search icon  -->
                <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                </div>
                <!-- search field  -->
                <input type="search" id="input-group-search" v-model="query"
                    class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search user" autofocus>
            </div>
        </div>
        <div v-if="filteredOptions.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700">
            Nothing found.
        </div>
        <!-- list of suggestions -->
        <ul class="px-3 pb-3 overflow-y-scroll text-sm text-gray-700 dark:text-gray-200">
            <li v-for="option in filteredOptions" :key="option.id">
                <div class="flex items-center ps-2 rounded hover:bg-green-300 transition-colors duration-100 hover:font-semibold dark:hover:bg-gray-600"
                    @click="toggleSelection(option)">
                    <div class="w-full py-2 ms-2 text-sm text-gray-900 rounded dark:text-gray-300">
                        <slot :option="option" :query="query" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts" generic="P extends Person">
import type { Person } from '@/types/people.type'


const props = defineProps<{
    options: P[],
    labelBy: P["name"]
}>()

const [selectedPerson] = defineModel<P | null>({ required: true })

const query: Ref<P["name"]> = ref('')

const boldQuery = (str: string, query: string) => {
    const n = str.toUpperCase();
    const q = query.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) {
        return str; // bail early
    }
    const l = q.length;
    return str.substring(0, x) + '' + str.substring(x, l) + '' + str.substring(x + l);
}

const boldMatchText = (text: string, searchInput: string) => {
    let str = text.toLowerCase();
    const query = searchInput.toLowerCase();
    let result = "";
    let queryLoc = str.indexOf(query);

    if (queryLoc === -1) {
        result += text;
    } else
        do {
            result += `${text.substring(0, queryLoc)} <b>${text.substring(queryLoc, query.length)}</b>`;
            str = str.substring(queryLoc + query.length, str.length);
            text = text.substring(queryLoc + query.length, str.length);
            queryLoc = str.indexOf(query);
        } while (text.length > 0 && queryLoc !== -1);

    return result + text;
};


// an array of filtered values
const filteredOptions = computed<P[]>(() => {
    if (query.value === '') return []

    const newOptions = props.options?.map((option: P) => {
        if (option.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .startsWith(query.value.toLowerCase().replace(/\s+/g, '')))
            return { ...option, name: boldMatchText(option.name, query.value) }
        else return option
    })
    return newOptions
})


// methods
const toggleSelection = (option: P) => {
    selectedPerson.value = option
    if (filteredOptions.value.map((p) => p.name).includes(query.value)) {
        query.value = ''
        selectedPerson.value = null
    }
    else query.value = option.name
}
</script>