import { defineComponent, ref, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const time = ref('')

    function getCurrentTime() {
      return new Date().toLocaleTimeString(navigator.language, { timeStyle: 'medium' })
    }

    time.value = getCurrentTime()

    const timer = setInterval(() => {
      time.value = getCurrentTime()
    }, 1000)

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      time,
    }
  },

  template: `<div class="clock">{{ time }}</div>`,
})
