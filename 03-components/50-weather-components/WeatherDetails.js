import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherDetails',
  props: {
    details: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div class="weather-details">
      <div class="weather-details__item" v-for="(value, label) in details" :key="label">
        <div class="weather-details__item-label">{{ label }}</div>
        <div class="weather-details__item-value">{{ value }}</div>
      </div>
    </div>
  `,
})
