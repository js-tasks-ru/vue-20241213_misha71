import { defineComponent } from 'vue'
import WeatherAlert from './WeatherAlert.js'
import WeatherDetails from './WeatherDetails.js'
import { WeatherConditionIcons } from './weather.service.js'

export default defineComponent({
  name: 'WeatherCard',
  components: { WeatherAlert, WeatherDetails },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    weatherIcon() {
      return WeatherConditionIcons[this.data.current.weather.id]
    },

    temperature() {
      return (this.data.current.temp - 273.15).toFixed(1)
    },

    details() {
      return {
        'Давление, мм рт. ст.': (this.data.current.pressure * 0.750062).toFixed(0),
        'Влажность, %': this.data.current.humidity,
        'Облачность, %': this.data.current.clouds,
        'Ветер, м/с': this.data.current.wind_speed,
      }
    },

    isNight() {
      const currentTime = this.data.current.dt
      const sunriseTime = this.data.current.sunrise
      const sunsetTime = this.data.current.sunset
      return currentTime < sunriseTime || currentTime > sunsetTime
    },
  },

  template: `
    <li class="weather-card" :class="{ 'weather-card--night': isNight }">
      <WeatherAlert :alert="data.alert" />
      <div>
        <h2 class="weather-card__name">{{ data.geographic_name }}</h2>
        <div class="weather-card__time">{{ data.current.dt }}</div>
      </div>
      <div class="weather-conditions">
        <div class="weather-conditions__icon" :title="data.current.weather.description">
          {{ weatherIcon }}
        </div>
        <div class="weather-conditions__temp">{{ temperature }} °C</div>
      </div>
      <WeatherDetails :details="details" />
    </li>
  `,
})
