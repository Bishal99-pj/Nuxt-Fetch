<template>
    <button
ref="backToTopRef" class="top" :class="[props.target === 'window' ? 'fixed' : 'sticky', btnClass]"
        @click="scrollToStart">
        <slot>
            <Icon :name="floatIcon" size="18" class=" shrink-0" />
        </slot>
    </button>
</template>

<script lang="ts" setup>
const props = defineProps({
    target: { type: String as PropType<'parent' | 'window'>, default: 'window' },
    variant: { type: String as PropType<'horizontal' | 'vertical'>, default: 'vertical' },
    controls: { type: String as PropType<'start' | 'end'>, default: 'start' }
})

const backToTopRef = ref<HTMLButtonElement | null>(null)
const scrollPanel = ref<HTMLElement | null>(null)
let parentScroll: ReturnType<typeof useScroll> | null = null
const winScroll = useWindowScroll({ behavior: 'smooth' })

const positionClass = {
    vertical: 'left-[95%] bottom-4 mr-4',
    horizontal: 'left-4 bottom-4 ml-4',
}

const btnClass = computed<string>(() => positionClass[props.variant])

const iconMap = {
    vertical: {
        start: 'uiw:up',
        end: 'uiw:down'
    },
    horizontal: {
        start: 'uiw:left',
        end: 'uiw:right'
    }
}

const floatIcon = computed<string>(() => iconMap[props.variant][props.controls])

function scrollToStart() {
    const target = props.target === 'window' ? winScroll : parentScroll
    const axis = props.variant === 'vertical' ? 'y' : 'x'
    // ENH
    if (!target) {
        console.error('Target not found');
        return
    }
    // scroll to start
    if (props.controls === 'start')
        target[axis].value = 0
    else {
        // scroll to end
        if (axis === 'y')
            target[axis].value = (target === winScroll) ? document.body.scrollHeight : (scrollPanel.value?.scrollHeight! - scrollPanel.value?.clientHeight!)
        else
            target[axis].value = (target === winScroll) ? document.body.scrollWidth : (scrollPanel.value?.scrollWidth! - scrollPanel.value?.clientWidth!)
    }
}

// TODO: recheck functionality
onMounted(() => {
    if (backToTopRef.value?.closest("[data-scroll-id]"))
        scrollPanel.value = backToTopRef.value?.closest("[data-scroll-id]")

    if (scrollPanel.value)
        parentScroll = useScroll(scrollPanel, {
            behavior: 'smooth'
        })
})
</script>

<style scoped>
.top {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    text-decoration: none;
    color: #fff;
    background: #2e2e2e;
    border-radius: 9999px;
    white-space: nowrap;
}
</style>