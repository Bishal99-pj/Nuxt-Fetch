<template>
  <Teleport to="#teleports">
    <div
      class="fixed flex flex-col w-full sm:max-w-xl justify-end bottom-0 end-0 mb-4 mr-4 z-50"
      role="region"
      v-bind="$attrs"
    >
    <Icon name="mdi:github" class="w-8 h-8" />
      <Transition name="toast ">
        <div
          v-if="notifications.length"
          class="px-4 py-6 space-y-3 overflow-y-auto"
        >
          <div v-for="toast in notifications" :key="toast.id">
            <TransitionGroup name="toast">
              <MyAlert v-bind="config" />
            </TransitionGroup>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const notifications = useNotifications();

const config = toastConfig;
</script>

<style scoped></style>
