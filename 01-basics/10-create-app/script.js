import { defineComponent, createApp } from 'vue'



const App = defineComponent({
	name: 'App',

	setup() {
		const event = new Date()
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}
		const date = event.toLocaleDateString(navigator.language, options)
		return {
			date,
		}
	},

	template: `
		<div>Сегодня {{date}}</div>
	`,
})

const app = createApp(App)

const vm = app.mount('#app')