<template>
	<header>
		<div class="mx-auto max-w-screen-sm flex justify-between items-center text-white p-4 sm:px-0">
			<h1 class="text-2xl">Simple Weather</h1>
			<button class="material-symbols-outlined" @click="searchCity">
				search
			</button>
		</div>
	</header>
</template>

<script setup>
	import { useRouter } from 'vue-router';

	const router = useRouter();

	const searchCity = () => {
		router.push({
			name: 'search'
		});
	};
</script>
