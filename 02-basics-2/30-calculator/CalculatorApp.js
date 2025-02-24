import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0)
    const secondOperand = ref(0)
    const operator = ref('sum')

    const result = computed(() => {
      switch (operator.value) {
        case "sum":
          return firstOperand.value + secondOperand.value

        case "subtract":
          return firstOperand.value - secondOperand.value

        case "multiply":
          return firstOperand.value * secondOperand.value

        case "divide":
          return firstOperand.value / secondOperand.value

        default:
          return 0
      }
    })

    const setOperator = (value) => {
      operator.value = value
    }

    return {
      firstOperand,
      secondOperand,
      setOperator,
      operator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" v-model="firstOperand" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" v-model="operator" value="sum"/>➕</label>
        <label><input type="radio" name="operator" v-model="operator" value="subtract"/>➖</label>
        <label><input type="radio" name="operator" v-model="operator" value="multiply"/>✖</label>
        <label><input type="radio" name="operator" v-model="operator" value="divide"/>➗</label>
      </div>

      <input type="number" v-model="secondOperand" aria-label="Second operand" />

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})
