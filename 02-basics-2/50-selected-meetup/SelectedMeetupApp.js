import { defineComponent, onMounted, ref, computed, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const currentMettup = ref({})
    const loading = ref(false)
    const meetupId = ref(1)

    onMounted(() => {
      getItem(1)
    })

    function getItem(id) {
      loading.value = true
      getMeetup(id).then((meetup) => {
        currentMettup.value = meetup;
        loading.value = false
      })
    }


    function getNext() {
      getItem(currentMettup.value.id + 1)
    }
    function getPrevious() {
      getItem(currentMettup.value.id - 1)
    }


    const canGetPrevious = computed(() => {
      return currentMettup.value.id === 1
    })
    const canGetNext = computed(() => {
      return currentMettup.value.id === 5
    })

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
      currentMettup
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" @click="getPrevious" :disabled="canGetPrevious || loading" type="button" disabled>Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div class="radio-group__button" v-for="item, index in 5" :key="index">
            <input
              :id="index"
              :checked="currentMettup.id === index + 1"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              v-model="meetupId"
              :value="index + 1"
            />
            <label for="index" class="radio-group__label">{{ index + 1 }}</label>
          </div>
        </div>

        <button class="button button--secondary" :disabled="canGetNext || loading" @click="getNext" type="button">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{currentMettup.title}}</h1>
        </div>
      </div>

    </div>
  `,
})
