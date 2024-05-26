<template>
	<main>
		<div class="mx-auto max-w-screen-sm px-4 sm:px-0">
			<input
				type="text"
				v-model="searchQuery"
				@input="getSearchResults"
				placeholder="Search for a city"
				class="py-2 px-1 w-full bg-transparent border-b text-white" />
			<ul
				class="bg-sky-950 text-white w-full shadow-md py-2 px-1 top-[66px] h-[200px] overflow-y-auto"
				v-if="searchResults">
				<p class="py-2" v-if="searchError">
					Sorry, something went wrong, please try again.
				</p>
				<p class="py-2" v-if="!searchError && searchResults.length === 0">
					No results match your query, try a different term.
				</p>
				<template v-else>
					<li
						v-for="searchResult in searchResults"
						:key="searchResult.city_id"
						class="p-2 cursor-pointer"
						@click="previewCity(searchResult)">
						{{ searchResult.city_name + ', ' + searchResult.country_full }}
					</li>
				</template>
			</ul>
		</div>
		<h2
			class="mt-8 mb-4 mx-auto max-w-screen-sm px-4 text-center text-3xl text-white"
			v-if="currentCity">
			{{ currentCity.city_name }}
		</h2>
		<suspense v-if="currentCity">
			<template #default>
				<WeatherDetail :currentCity="currentCity" />
			</template>
			<template #fallback>
				<span>Loading...</span>
			</template>
		</suspense>
		<div class="mt-4 mx-auto max-w-screen-sm">
			<button
				type="button"
				class="block mx-auto bg-sky-900 text-white py-3 px-8 rounded-xl"
				@click="backHome()">
				Close
			</button>
		</div>
	</main>
</template>

<script setup>
	import { ref, onMounted, watch } from 'vue';
	import axios from 'axios';
	import { useRouter } from 'vue-router';
	import Papa from 'papaparse';
	import WeatherDetail from '../components/WeatherDetail.vue';

	const router = useRouter();
	const searchQuery = ref('');
	const queryTimeout = ref(null);
	const searchResults = ref(null);
	const searchError = ref(null);
	const currentCity = ref(null);

	const backHome = () => {
		router.push({
			name: 'home'
		});
		cleanSearch();
	};

	const cleanSearch = () => {
		searchQuery.value = '';
		searchResults.value = null;
		searchError.value = null;
		currentCity.value = null;
	};

	const cities = ref([]);
	onMounted(async () => {
		const file = await axios.get('http://localhost:3000/readfile');
		Papa.parse(file.data, {
			header: true,
			skipEmptyLines: true,
			complete: (results) => {
				cities.value = results.data;
			}
		});
	});

	const getSearchResults = () => {
		clearTimeout(queryTimeout.value);
		queryTimeout.value = setTimeout(async () => {
			if (searchQuery.value !== '') {
				let citiesList = [];
				cities.value.forEach((city) => {
					if (
						city.city_name &&
						city.city_name
							.toLowerCase()
							.includes(searchQuery.value.toLowerCase())
					) {
						citiesList.push(city);
					}
				});
				searchResults.value = citiesList;
				return;
			}
			searchResults.value = null;
		}, 300);
	};

	const previewCity = async (searchResult) => {
		searchResults.value = null;
		currentCity.value = searchResult;
		searchQuery.value = searchResult.city_name;
	};
</script>
