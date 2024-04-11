<template>
    <ClientOnly>
        <button class="top" @click="scrollToStart">
            <slot>
                <Icon name="uiw:up" size="24" />
            </slot>
        </button>
    </ClientOnly>
</template>

<script lang="ts" setup>
const props = defineProps({
    target: String as PropType<'parent' | 'window'>
})

const scrollPanel = ref<HTMLElement | null>(null)

let parentRef: ReturnType<typeof useScroll> | null = null

function scrollToStart() {
    if (parentRef) {
        if (props.target === 'parent') {
            parentRef.x.value = 0
            parentRef.y.value = 0
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}

onMounted(() => {
    scrollPanel.value = document.querySelector("[scroll_id]")
    parentRef = useScroll(scrollPanel, {
        behavior: 'smooth'
    })
})
</script>

<style scoped>
.top {
    position: sticky;
    left: 100%;
    bottom: 16px;
    margin-right: 16px;
    text-decoration: none;
    padding: 10px;
    color: #fff;
    background: #2e2e2e;
    border-radius: 9999px;
    white-space: nowrap;
}
</style>