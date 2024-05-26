<template>
	<div class="pt-2 px-4">
		<NextHours :nextHours="nextHours" />
		<NextDays :nextDays="nextDays" />
		<div class="mx-auto max-w-screen-sm">
			<p class="text-white text-end">
				Last updated on
				{{
					new Date(lastUpdateTime * 1000).toLocaleDateString('en-us', {
						hour12: false,
						month: 'short',
						day: 'numeric',
						hour: '2-digit',
						minute: '2-digit'
					})
				}}
			</p>
		</div>
	</div>
</template>

<script async setup>
	import axios from 'axios';
	import { toRefs, watch, ref, onMounted } from 'vue';
	import NextHours from './NextHours.vue';
	import NextDays from './NextDays.vue';

	let props = defineProps(['currentCity']);
	const { currentCity } = toRefs(props);
	// API key normally should be stored in .env file
	const APIkey = '482944e26d320a80bd5e4f23b3de7d1f';
	let nextHours = ref([]);
	let nextDays = ref([]);
	let lastUpdateTime = ref(null);

	const getWeatherForecast = async (currentCity) => {
		try {
			const lat = currentCity.lat;
			const lon = currentCity.lon;
			const weatherData = await axios.get(
				`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${APIkey}`
			);

			const localOffset = new Date().getTimezoneOffset() * 60000;
			// cal hourly weather offset
			weatherData.data.hourly.forEach((hour) => {
				const utc = hour.dt * 1000 + localOffset;
				hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
			});

			lastUpdateTime.value = weatherData.data.current.dt;
			nextHours.value = weatherData.data.hourly.slice(0, 24);
			nextDays.value = weatherData.data.daily.slice(0, 5);
		} catch (error) {
			console.error(error);
		}
	};

	onMounted(async () => {
		await getWeatherForecast(currentCity.value);
	});

	watch(currentCity, async (newVal) => {
		await getWeatherForecast(newVal);
	});
</script>
