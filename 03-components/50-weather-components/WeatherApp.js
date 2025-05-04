import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import WeatherCard from './WeatherCard.js'
import './WeatherApp.css'

export default defineComponent({
  name: 'WeatherApp',
  components: { WeatherCard },
  data() {
    return {
      weatherData: getWeatherData(),
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <WeatherCard v-for="region in weatherData" :key="region.geographic_name" :data="region" />
      </ul>
    </div>
  `,
})
