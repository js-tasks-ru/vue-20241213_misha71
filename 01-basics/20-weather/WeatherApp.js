import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  data() {
    return {
      weatherList: getWeatherData(),
      weatherConditionIcons: WeatherConditionIcons,

    }
  },

  methods: {
    isNight(item) {
      const currentTime = this.convertToTimestamp(item.current.dt);
      const sunsetTime = this.convertToTimestamp(item.current.sunset);
      const sunriseTime = this.convertToTimestamp(item.current.sunrise);

      return currentTime > sunsetTime || currentTime < sunriseTime;
    },

    convertToTimestamp(timeString) {
      const [hours, minutes] = timeString.split(':').map(Number);
      return hours * 60 + minutes; // Время в минутах
    },
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>

      <ul class="weather-list unstyled-list">
        <li class="weather-card" :class="{'weather-card--night' : isNight(item)}" v-for="(item, index) in weatherList" :key="index">
          <div class="weather-alert" v-if="item.alert">
            <span class="weather-alert__icon">⚠</span>
            <span class="weather-alert__description">{{ item.alert.sender_name }}: {{ item.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ item.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ item.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" :title="item.current.weather.description">{{ this.weatherConditionIcons[item.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ (item.current.temp - 273.15).toFixed(1) + ' °C' }}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ (item.current.pressure * 0.75).toFixed(0) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ item.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ item.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ item.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
