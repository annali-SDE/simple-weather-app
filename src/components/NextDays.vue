<template>
	<!-- Weekly Weather -->
	<div class="mx-auto mt-5 max-w-screen-sm py-4 bg-white shadow-md">
		<h2 class="text-2xl px-6">Next 5 days</h2>
		<hr class="my-3 w-full bg-slate-400" />
		<div v-for="day in nextDays" :key="day.dt" class="border-b border-gray-200">
			<div class="flex items-center justify-between m-4">
				<img
					class="size-10"
					:src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
					alt="" />
				<div class="flex flex-col items-center">
					<p class="">
						{{
							new Date(day.dt * 1000).toLocaleDateString('en-us', {
								weekday: 'short',
								month: 'short',
								day: 'numeric'
							})
						}}
					</p>
					<p class="text-sm text-gray-500">
						{{ day.weather[0].description.substring(0, 1).toUpperCase() + day.weather[0].description.substring(1) }}
					</p>
				</div>

				<div class="flex gap-2">
					<p>{{ Math.round(day.temp.max) }}&deg;</p>
					<p>{{ Math.round(day.temp.min) }}&deg;</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { toRefs, ref } from 'vue';

	let props = defineProps(['nextDays']);
	const { nextDays } = toRefs(props);
</script>
