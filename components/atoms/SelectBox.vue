<template>
  <div
    :id="'root-' + randomId"
    class="inline-block relative"
    :class="{ 'cursor-pointer': !props.editable }"
  >
    <!-- Select Input -->
    <div ref="selectRef" class="relative">
      <input
        type="search"
        v-model="searchQuery"
        @input="onSearch($event)"
        @focus="onFocus($event)"
        @keydown="onKeydown($event)"
        :id="'select-input-' + randomId"
        role="combobox"
        autocomplete="off"
        aria-haspopup="listbox"
        :aria-expanded="dropdownVisible"
        :aria-controls="'select-' + randomId"
        :aria-activedescendant="
          activeOptionIndex ? String(activeOptionIndex) : undefined
        "
        class="block w-full read-only:cursor-pointer p-2.5 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        :placeholder="props.placeholder"
        :readonly="!props.editable"
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
    <!-- Dropdown Element -->
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
        v-for="(option, index) in visibleOptions"
        :key="getKey(option)"
        :id="'option-' + index + '-' + randomId"
        :ref="listRefs.set"
        role="option"
        :aria-label="JSON.stringify(getLabel(option))"
        :aria-selected="isSelected(option)"
        :class="
          twMerge(
            'cursor-pointer py-2 px-3 transition-colors duration-[175ms]',
            activeOptionIndex === index
              ? 'text-blue-600 bg-sky-200 dark:bg-gray-600'
              : ''
          )
        "
        @click="onSelect(option, index)"
        @mousemove="onHover(option, index)"
      >
        <slot name="option" :option="option" :activeOption="activeOption">
          {{ getLabel(option) }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script
  setup
  lang="ts"
  generic="T extends string | number | Record<string , any>"
>
// flowbite
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import type { InstanceOptions } from "flowbite";
// twMerge
import { twMerge, type ClassNameValue, twJoin } from "tailwind-merge";

// Component Refs & STATES
const dropdownRef = ref<HTMLUListElement | null>(null);
const selectRef = ref<HTMLDivElement | null>(null);
const listRefs = useTemplateRefsList<HTMLLIElement>();
const dropdown = ref<DropdownInterface | null>(null);
const dropdownVisible = ref<boolean>(false);
const searchQuery = ref<string>("");
const selectedOption = defineModel<T>();
const activeOption = ref<T>();
const activeOptionIndex = ref<number>(-1);

//-------- EMITS
const emit = defineEmits<{
  search: [e: Event, query: string, activeIndex: number];
  select: [option: T];
  hover: [option: T];
}>();

//-------- PROPS
const props = withDefaults(
  defineProps<{
    options: T[];
    optionLabel?: keyof T;
    optionValue?: keyof T;
    divide?: boolean;
    editable?: boolean;
    placeholder?: string;
  }>(),
  {
    placeholder: "Select an option",
    editable: true,
    divide: false,
  }
);

//--------- GETTERS
const visibleOptions = ref([...props.options]) as Ref<T[]>;

const isSelected = (option: T) => isEqual(option, selectedOption.value);

const getKey = (opt: T) => {
  return JSON.stringify(opt);
};

const getLabel = (opt: T) => {
  if (props.optionLabel) return opt![props.optionLabel];
  return String(opt);
};

//------- METHODS & EMITS
let searchTimeout: ReturnType<typeof setTimeout>;

const onSearch = (e: Event) => {
  if (!searchQuery.value.trim().length) {
    visibleOptions.value = props.options;
    return;
  }
  if (props.options.length === 0) return;
  // Search and Update
  emit("search", e, searchQuery.value, activeOptionIndex.value);
  activeOptionIndex.value = -1;
  let matched = false;
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(() => {
    visibleOptions.value = visibleOptions.value.filter((opt: T) => {
      return (getLabel(opt) as string)
        .toLowerCase()
        .includes(searchQuery.value.trim().toLowerCase());
    });
    activeOptionIndex.value = 0;
    matched = true;
  }, 400);
};

const onSelect = (opt: T, index: number) => {
  emit("select", opt);
  selectedOption.value = opt;
  searchQuery.value = String(getLabel(opt));
  activeOption.value = opt;
  activeOptionIndex.value = index;
  dropdown.value?.hide();
};

const onHover = (opt: T, index: number) => {
  if (!props.editable) searchQuery.value = String(getLabel(opt));
  activeOption.value = opt;
  activeOptionIndex.value = index;
  emit("hover", opt);
};

// BUG: #Flowbite Dropdown toggles when search input is focused by Tab at start
const onFocus = (event: Event) => {
  console.log("search input focused");
};

function setActiveOption(activeId: number) {
  if (visibleOptions.value.length > 0) {
    activeOption.value = visibleOptions.value[activeId];
    searchQuery.value = String(getLabel(activeOption.value));
  }
}

function scrollInView(listIndex: number) {
  nextTick(() => {
    const activeListElement = listRefs.value[listIndex];
    if (activeListElement) {
      activeListElement.scrollIntoView &&
        activeListElement.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
    }
  });
}

// KEYBINDINGS
const onArrowDownKey = (event: Event) => {
  activeOptionIndex.value++;
  if (activeOptionIndex.value >= visibleOptions.value.length) {
    activeOptionIndex.value = 0;
  }
  scrollInView(activeOptionIndex.value);
  setActiveOption(activeOptionIndex.value);
};

const onArrowUpKey = (event: Event) => {
  activeOptionIndex.value--;
  if (activeOptionIndex.value < 0) {
    activeOptionIndex.value = visibleOptions.value.length - 1;
  }
  scrollInView(activeOptionIndex.value);
  setActiveOption(activeOptionIndex.value);
};

const onDeleteKey = (event: Event) => {
  activeOptionIndex.value = -1;
  searchQuery.value = "";
  visibleOptions.value = [...props.options];
  if (selectedOption.value) {
    selectedOption.value = undefined;
  }
};

const onEscapeKey = (event: Event) => {
  dropdown.value?.hide();
};

const onEnterKey = (event: Event) => {
  if (activeOption.value && activeOptionIndex.value > -1) {
    onSelect(activeOption.value, activeOptionIndex.value);
  }
};

const onSpaceKey = (event: Event, editable: boolean) => {
  if (!editable) dropdown.value?.toggle();
};

function onKeydown(event: Event) {
  switch ((event as KeyboardEvent).code) {
    case "ArrowDown":
      onArrowDownKey(event);
      break;
    case "ArrowUp":
      onArrowUpKey(event);
      break;
    case "Delete":
      onDeleteKey(event);
      break;

    case "PageUp":
      onArrowUpKey(event);
      break;
    case "PageDown":
      onArrowDownKey(event);
      break;

    case "Space":
      onSpaceKey(event, props.editable);
      break;

    case "Enter":
    case "NumpadEnter":
      onEnterKey(event);
      break;

    case "Escape":
      onEscapeKey(event);
      break;
  }
}

const randomId = ref<string>("");

onMounted(() => {
  randomId.value = crypto.randomUUID();

  const options: DropdownOptions = {
    placement: "bottom",
    triggerType: "click",
    offsetSkidding: 0,
    offsetDistance: 5,
    delay: 100,
    onHide: () => {
      console.log("dropdown has been hidden");
      dropdownVisible.value = false;
    },
    onShow: () => {
      console.log("dropdown has been shown");
      if (!selectedOption.value) activeOptionIndex.value = 0;
      dropdownVisible.value = true;
    },
    onToggle: () => {
      console.log("dropdown has been toggled");
    },
  };

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
