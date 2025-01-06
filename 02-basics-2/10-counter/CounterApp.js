import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CounterApp',

  setup() { },

  data() {
    return {
      currentValue: 0,
    }
  },

  computed: {
    isIncrLimit() {
      return this.currentValue === 5
    },

    isDecrLimit() {
      return this.currentValue === 0
    },
  },


  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        @click="this.currentValue--"
        :disabled="isDecrLimit"
      >➖</button>

      <span class="count" data-testid="count">{{ currentValue }}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="isIncrLimit"
        @click="this.currentValue++"
      >➕</button>
    </div>
  `,
})
