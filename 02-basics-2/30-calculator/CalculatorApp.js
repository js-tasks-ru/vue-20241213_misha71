import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {
    const firstOperand = ref(0)
    const secondOperand = ref(0)
    const operator = ref('sum')
    const result = ref(0)

    const setOperator = (value) => {
      operator.value = value
    }

    const calculate = () => {
      switch (operator.value) {
        case "sum":
          result.value = firstOperand.value + secondOperand.value
          break;

        case "subtract":
          result.value = firstOperand.value - secondOperand.value
          break;

        case "multiply":
          result.value = firstOperand.value * secondOperand.value
          break;

        case "divide":
          result.value = firstOperand.value / secondOperand.value
          break;

        default:
          break;
      }
    }

    return {
      firstOperand,
      secondOperand,
      setOperator,
      operator,
      result,
      calculate,
    }

  },

  watch: {
    operator(){
      this.calculate()
    },

  },

  template: `
    <div class="calculator">
      <input type="number" v-model="firstOperand" @change="calculate()" aria-label="First operand" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" v-model="operator" value="sum"/>➕</label>
        <label><input type="radio" name="operator" v-model="operator" value="subtract"/>➖</label>
        <label><input type="radio" name="operator" v-model="operator" value="multiply"/>✖</label>
        <label><input type="radio" name="operator" v-model="operator" value="divide"/>➗</label>
      </div>

      <input type="number" v-model="secondOperand" @change="calculate()" aria-label="Second operand" />

      <div>=</div>

      <output>{{result}}</output>
    </div>
  `,
})
