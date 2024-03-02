<template>
    <div :id="'alert-' + random_id" :class="container_classes" role="alert">
        <Icon :name="icon" class="shrink-0 w-5 h-5" />
        <span class="sr-only">Info</span>
        <div class="ms-3 font-medium">
            A simple {{ variant }} alert with an <a href="#" class="font-semibold underline hover:no-underline">example
                link</a>.
            Give it a click if you like.
            <div v-if="dismissBtn" class="flex space-x-2 mt-1.5">
                <button :data-dismiss-target="'#alert-' + random_id" aria-label="Close"
                    class="p-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold text-white">
                    {{ btnText }}
                </button>
            </div>
        </div>
        <button type="button"
            class="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            :data-dismiss-target="'#alert-' + random_id" aria-label="Close">
            <span class="sr-only">Close</span>
            <Icon name="mdi:close" aria-hidden="true" :class="icon_classes" />
        </button>

        <slot name="alert-content" />

    </div>
</template>

<script lang="ts" setup>
import { twMerge, twJoin } from 'tailwind-merge'

const INTENTS = ["info", "success", "warning", "danger"] as const

type Props = {
    variant?: typeof INTENTS[number],
    msg?: string
    dismissBtn?: boolean | string
}

const props = withDefaults(defineProps<Props>(), {
    variant: "info",
    msg: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsum, eligendi!",
    dismissBtn: false
})

// console.log(typeof props.dismissBtn);

const btnText = computed(() => (typeof props.dismissBtn === 'string') ? props.dismissBtn : 'Dismiss')

const random_id = crypto.randomUUID()

const container_classes = twJoin('flex p-4 my-4 rounded-lg max-w-xl dark:bg-gray-800',
    (props.variant === "info" && 'text-blue-700 bg-blue-50 dark:text-blue-500'),
    (props.variant === "success" && 'text-green-600 bg-green-50 dark:text-green-400'),
    (props.variant === "warning" && 'text-yellow-400 bg-yellow-50 dark:text-yellow-500'),
    (props.variant === "danger" && 'text-red-600 bg-red-50 dark:text-red-500'),
)


const icon_classes = twJoin('shrink-0 w-5 h-5',
    (props.variant === "info" && 'text-blue-800/60 hover:text-blue-700'),
    (props.variant === "success" && 'text-green-600/60 hover:text-green-600'),
    (props.variant === "warning" && 'text-yellow-500/60 hover:text-yellow-500'),
    (props.variant === "danger" && 'text-red-600/60 hover:text-red-700'),
)

const icon = computed<string>(() => {
    const icons = {
        info: 'mdi:information-variant-circle',
        success: 'ep:success-filled',
        warning: 'clarity:warning-solid',
        danger: 'ic:baseline-dangerous',
    }
    return icons[props.variant]
})

</script>

<style></style>