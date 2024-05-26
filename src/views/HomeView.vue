

<template>
  <main>
		<div
			class="mx-auto max-w-screen-sm pt-4 px-4 flex items-center gap-8 overflow-x-scroll bg-white">
			<button
				v-for="item in predefiendCities"
				class="text-sm font-bold uppercase"
				:item="item"
				:key="item.city_name"
				:class="[
					currentCity.city_name == item.city_name
					? 'pb-2 border-b-4 border-red-500'
					: 'pb-3 text-secondary-200'
				]"
					@click="updateCity(item)">
				{{ item.city_name }}
			</button>
		</div>
		<suspense>
			<template #default>
				<WeatherDetail :currentCity = "currentCity" />
			</template>
			<template #fallback>
				<span>Loading...</span>
			</template>
		</suspense>
  </main>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import WeatherDetail from '../components/WeatherDetail.vue';

const predefiendCities = ref([{'city_name':'Rio de Janeiro','lat':'-22.9110137','lon':'-43.2093727'}, {'city_name':'Beijing','lat':'39.906217','lon':'116.3912757'}, {'city_name':'Los Angeles','lat':'34.0536909','lon':'-118.242766'}]);
	let currentCity = ref({'city_name':'Los Angeles','lat':'34.0536909','lon':'-118.242766'});
	const updateCity = (city) => {
		currentCity.value = city;
	};
</script>