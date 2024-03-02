<template>
    <section class="max-w-sm mx-auto">
        <button ref="triggerElRef" type="button" @click="popover?.show()"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Default popover
        </button>
        <div class="flex justify-between">
            <div data-popover id="target-content" role="tooltip" ref="targetElRef"
                class="absolute z-10 invisible inline-block w-80 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                <span class="flex justify-between px-3 py-2">
                    <p class="text-balance">Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                        Aliquam adipisci nulla necessitatibus eius illum,
                        aut et ducimus quaerat maiores error!
                    </p>
                    <span v-if="closeIconVisibility" class="cursor-pointer text-[17px] font-bold"
                        @click.stop="popover?.hide()">x</span>
                </span>
                <div data-popper-arrow :class="twMerge('tooltip-arrow', '!border-0')"></div>
            </div>
        </div>
        <p>Can you see the tooltip : <span :class="popover?.isVisible() ? 'text-blue-600' : 'text-red-600'">{{
            popover?.isVisible() ? 'yes' : 'no' }}</span></p>
    </section>
</template>

<script lang="ts" setup>
import { twMerge, twJoin } from 'tailwind-merge';
import { Popover } from 'flowbite';
import type { PopoverInterface } from 'flowbite';

const popover: Ref<PopoverInterface | null> = ref(null)

const targetElRef: Ref<HTMLElement | null> = ref(null);
const triggerElRef: Ref<HTMLElement | null> = ref(null);

const closeIconVisibility = ref(false)

// const popover = FlowbiteInstances.getInstance('Popover', 'target-content')

// if(popover.value?.isVisible()) closeIconVisibility.value = true


onMounted(() => {
    const instanceOptions = {
        id: 'target-content',
        override: true
    };
    popover.value = new Popover(targetElRef.value, triggerElRef.value, {
        triggerType: 'click',
        placement: 'bottom',
        offset: 30,
        onShow: () => {
            closeIconVisibility.value = true
        },
        onHide: () => {
            closeIconVisibility.value = false
        }
    }, instanceOptions);
})

onBeforeUnmount(() => {
    popover.value?.destroy()
})
</script>

<style></style>