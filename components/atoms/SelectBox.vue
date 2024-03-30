<template>
  <div :id="'root-' + randomId" class="inline-block relative">
    <div ref="selectRef" class="relative">
      <input
        type="search"
        :id="'select-input-' + randomId"
        role="combobox"
        autocomplete="off"
        aria-haspopup="listbox"
        :aria-expanded="dropdownVisible"
        :aria-controls="'select-' + randomId"
        :aria-activedescendant="
          activeOptionIndex ? String(activeOptionIndex) : undefined
        "
        class="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="placeholder"
      />
      <Icon
        name="uiw:down"
        size="18"
        aria-hidden="true"
        :class="
          twJoin(
            'absolute top-3 right-2.5 text-gray-600 cursor-pointer transition-transform duration-200',
            dropdownVisible ? 'rotate-180' : 'rotate-0'
          )
        "
      />
    </div>
    <!-- dropdown -->
    <ul
      ref="dropdownRef"
      :id="'select-' + randomId"
      role="listbox"
      :class="
        twJoin(
          'absolute w-full max-h-56 overflow-y-scroll z-20 hidden shadow bg-gray-100 dark:bg-gray-900 rounded-md border py-2 transition-all duration-100',
          divide && 'divide-y divide-gray-200'
        )
      "
    >
      <li
        v-for="(option, index) in options"
        :key="getKey(option)"
        role="option"
        :aria-label="JSON.stringify(getLabel(option))"
        :aria-selected="isSelected(option)"
        :class="
          twJoin(
            'cursor-pointer py-2 px-3 hover:text-blue-600 hover:bg-sky-200 dark:hover:bg-gray-600 transition-colors duration-200',
            activeOptionIndex === index &&
              'text-blue-600 bg-sky-200 dark:bg-gray-600'
          )
        "
        @click="onSelect(option, index)"
        @mouseover="onHover(option, index)"
      >
        <slot name="option" :option="option" :activeOption="activeOption">
          {{ getLabel(option) }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T">
// flowbite
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";
// twMerge
import { twMerge, type ClassNameValue, twJoin } from "tailwind-merge";

// Component Refs & STATES
const dropdownRef = ref<HTMLUListElement | null>(null);
const selectRef = ref<HTMLDivElement | null>(null);
const dropdown = ref<DropdownInterface | null>(null);
const dropdownVisible = ref<boolean>(false);

const selectedOption = defineModel<T>();
const activeOption = ref<T>();
const activeOptionIndex = ref<number>(-1);

//-------- PROPS
const props = withDefaults(
  defineProps<{
    options: T[];
    optionLabel?: keyof T;
    optionValue?: keyof T;
    divide?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Select an option",
    divide: false,
  }
);

//--------- GETTERS
const isSelected = (option: T) => isEqual(option, selectedOption.value);

const getKey = (opt: T): string | number => {
  if (typeof opt === "string" || typeof opt === "number") return opt;
  return JSON.stringify(opt);
};

const getLabel = (opt: T) => {
  if (props.optionLabel && typeof opt === "object")
    return opt![props.optionLabel];
  return String(opt);
};

//------- METHODS & EMITS
const onSelect = (opt: T, index: number) => {
  selectedOption.value = opt;
  activeOption.value = opt;
  activeOptionIndex.value = index;
  dropdown.value?.hide();
};

const onHover = (opt: T, index: number) => {
  activeOption.value = opt;
  activeOptionIndex.value = index;
};

const randomId = ref<string>("");

onMounted(() => {
  randomId.value = crypto.randomUUID();

  // options with default values
  const options: DropdownOptions = {
    placement: "bottom",
    triggerType: "click",
    offsetSkidding: 0,
    offsetDistance: 5,
    delay: 100,
    onHide: () => {
      dropdownVisible.value = false;
    },
    onShow: () => {
      dropdownVisible.value = true;
    },
    onToggle: () => {},
  };

  // instance options object
  const instanceOptions: InstanceOptions = {
    id: "select-" + randomId.value,
    override: true,
  };

  dropdown.value = new Dropdown(
    dropdownRef.value,
    selectRef.value,
    options,
    instanceOptions
  );
});

onBeforeUnmount(() => dropdown.value?.destroyAndRemoveInstance());
</script>
