import { defineComponent, ref } from 'vue'
import { UiButton } from '@shgk/vue-course-ui'
import UiCounter from './UiCounter.js'

export default defineComponent({
  name: 'App',

  components: {
    UiButton,
    UiCounter,
  },

  setup() {
    const count1 = ref(1)
    const count2 = ref(2)

    function reset() {
      count1.value = 1
      count2.value = 2
    }

    return {
      count1,
      count2,
      reset,
    }
  },

  template: `
    <div>
      <p style="margin: 1em 0">
        <UiCounter v-model:count="count1" @update:count="(value)=>{count1 = value}"/>
      </p>
      <p style="margin: 1em 0">
        <UiCounter v-model:count="count2" :min="1" :max="3" @update:count="(value)=>{count2 = value}"/>
      </p>
      <p style="margin: 1em 0">
        <UiButton kind="primary" @click="reset">Reset</UiButton>
      </p>
    </div>
  `,
})
