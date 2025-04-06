import { defineComponent, onBeforeMount, ref, computed, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const currentMeetup = ref({})
    const loading = ref(false)
    const meetupId = ref(1)

    // Загрузка данных митапа
    function getItem(id) {
      loading.value = true
      getMeetup(id).then((meetup) => {
        currentMeetup.value = meetup
        loading.value = false
      })
    }

    // Загрузка первого митапа при монтировании
    onBeforeMount(() => {
      getItem(meetupId.value)
    })

    // Обработчики кнопок
    function getNext() {
      if (meetupId.value < 5) {
        meetupId.value += 1
      }
    }

    function getPrevious() {
      if (meetupId.value > 1) {
        meetupId.value -= 1
      }
    }

    // Вычисляемые свойства для блокировки кнопок
    const canGetPrevious = computed(() => meetupId.value === 1)
    const canGetNext = computed(() => meetupId.value === 5)

    // Наблюдатель за изменением meetupId
    watch(meetupId, (newValue) => {
      getItem(newValue)
    })

    return {
      getItem,
      getNext,
      meetupId,
      getPrevious,
      loading,
      canGetPrevious,
      canGetNext,
      currentMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button
          class="button button--secondary"
          @click="getPrevious"
          :disabled="canGetPrevious || loading"
          type="button"
        >
          Предыдущий
        </button>

        <div class="radio-group" role="radiogroup">
          <div
            class="radio-group__button"
            v-for="index in 5"
            :key="index"
          >
            <input
              :id="'radio-' + index"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              v-model="meetupId"
              :value="index"
            />
            <label
              :for="'radio-' + index"
              class="radio-group__label"
            >
              {{ index }}
            </label>
          </div>
        </div>

        <button
          class="button button--secondary"
          @click="getNext"
          :disabled="canGetNext || loading"
          type="button"
        >
          Следующий
        </button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{ currentMeetup.title }}</h1>
        </div>
      </div>
    </div>
  `,
})
