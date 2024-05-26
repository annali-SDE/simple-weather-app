<template>
	<!-- Hourly Weather -->
	<div class="mx-auto max-w-screen-sm pt-4 pb-2 bg-white shadow-md">
		<h2 class="text-2xl px-6">Next hours</h2>
		<hr class="my-3 w-full bg-slate-400" />
		<div class="px-6">
			<div class="flex gap-8 overflow-x-scroll">
				<div
					v-for="hourData in nextHours"
					:key="hourData.dt"
					class="relative flex flex-col gap-1 items-center after:absolute after:inset-y-6 after:-right-4 after:w-px after:h-16 after:bg-gray-200">
					<p class="text-sm">{{ Math.round(hourData.temp) }}&deg;</p>
					<p class="text-sm text-sky-500">{{ Math.round(hourData.pop) }}%</p>
					<img
						class="w-auto h-[50px] object-cover"
						:src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
						alt="weather icon" />
					<p class="whitespace-nowrap text-xs text-gray-400 pb-4">
						{{
							new Date(hourData.currentTime).toLocaleTimeString('en-us', {
								hour: 'numeric',
								minute: '2-digit'
							})
						}}
					</p>
				</div>
			</div>	
		</div>
	</div>
</template>

<script setup>
	import { toRefs, ref } from 'vue';

	let props = defineProps(['nextHours']);
	const { nextHours } = toRefs(props);
</script>
