<template>
  <div class="min-h-screen bg-gradient-to-b from-sky-800 to-sky-500">
    <Header />
    <RouterView v-slot="{ Component }">
			<Transition name="page">
				<component :is="Component" />
			</Transition>
		</RouterView>
	</div>
</template>

<script setup>
	import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>
