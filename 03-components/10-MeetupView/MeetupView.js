import { defineComponent } from 'vue'
import { UiAlert, UiContainer } from '@shgk/vue-course-ui'
import MeetupAgenda from './MeetupAgenda.js'
import MeetupDescription from './MeetupDescription.js'
import MeetupCover from './MeetupCover.js'
import MeetupInfo from './MeetupInfo.js'
import './MeetupView.css'

export default defineComponent({
  name: 'MeetupView',
  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
  components: {
    UiAlert,
    UiContainer,
    MeetupDescription,
    MeetupAgenda,
    MeetupCover,
    MeetupInfo
  },

  template: `
    <div>

      <!-- Обложка митапа -->

      <UiContainer>
        <MeetupCover :title="meetup.title" :image="meetup.image"/>
        <div class="meetup">
          <div class="meetup__content">
            <h2>Описание</h2>

            <!-- Описание митапа -->
            <MeetupDescription :description="meetup.description"/>
            <h2>Программа</h2>

            <!-- Программа митапа -->
            <MeetupAgenda :agenda="meetup.agenda" v-if="meetup.agenda.length"/>
            <!-- Или при пустой программе - сообщение "Программа пока пуста..." в UiAlert -->
            <UiAlert v-else>Программа пока пуста...</UiAlert>

          </div>
          <div class="meetup__aside">

            <!-- Краткая информация о митапе -->
            <MeetupInfo :organizer="meetup.organizer" :date="meetup.date" :place="meetup.place"/>
            <div class="meetup__aside-buttons"></div>
          </div>
        </div>
      </UiContainer>
    </div>
  `,
})
