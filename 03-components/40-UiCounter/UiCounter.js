import { defineComponent, ref } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import './UiCounter.css'

export default defineComponent({
  name: 'UiCounter',

  components: {
    UiButton,
  },

  props: {
    count: {
      type: Number,
      required: true,
    },

    min: {
      type: Number,
      required: false,
      default: 0,
    },

    max: {
      type: Number,
      required: false,
    },
  },

  emits: ['update:count'],

  setup(props, { emit }) {
    // Рекомендуется для практики реализовать обработку событий внутри setup, а не непосредственно в шаблоне

    function update(operation) {
      operation == 'inc' ? emit('update:count', props.count + 1) : emit('update:count', props.count - 1)
    }
    return {
      update,
    }
  },

  template: `
    <div class="counter">
      <UiButton aria-label="Decrement" :disabled="count <= min" @click="update('dec')">➖</UiButton>
      <span class="count" data-testid="count">{{ count }}</span>
      <UiButton aria-label="Increment" :disabled="count >= max" @click="update('inc')">➕</UiButton>
    </div>
  `,
})
