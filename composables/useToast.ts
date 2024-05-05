export type ToastConfig = {
  message?: string,
  variant?: 'success' | 'info' | 'warning' | 'danger',
  life?: number,
  position?: 'top' | 'bottom' | 'left' | 'right',
  dismissible?: boolean,
}

export const toastConfig = ref<ToastConfig>({})

export const useNotifications = () => useState<any[]>('notifications', () => [])

export const useToast = () => {

  const toasts = useNotifications()

  const maxAge = ref<number>()

  function add(config: ToastConfig) {
    const { life = 3000, variant = 'info' } = config

    maxAge.value = life

    toastConfig.value = config

    toasts.value.push(config.message)
  }

  const timeOut = computed(() => maxAge.value || 3000)

  function remove(index: number = 0) {
    toasts.value.filter((t, i) => i !== index)
  }



  let intervalId: ReturnType<typeof setTimeout>

  onMounted(() => {
    intervalId = setTimeout(() => {
      toasts.value = []
    }, timeOut.value)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  return {
    add, remove
  }
}


