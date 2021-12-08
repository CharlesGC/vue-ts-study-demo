<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { useRequest } from '../hooks/useRequest.js';

let state = reactive({
	input: ref('vue'),
	query: ref('vue'),
});

const { hits, loading, error, run } = useRequest();

const setQuery = () => {
	console.log(state.input);

	state.query = state.input;
	console.log(state.query);

	run({
		url: 'https://hn.algolia.com/api/v1/search',
		params: {
			query: state.query,
		},
	});
};

onMounted(() => {
	run({
		url: 'https://hn.algolia.com/api/v1/search',
		params: {
			query: state.query,
		},
	});
});
</script>

<template>
	<input type="text" v-model="state.input" />
	<button @click="setQuery">搜索</button>
	<div v-if="loading">Loading ...</div>
	<div v-else-if="error">Something went wrong ...</div>
	<ul v-else>
		<li v-for="item of hits" :key="item.objectID">
			<a :href="item.url">{{ item.title }}</a>
		</li>
	</ul>
</template>

<style scoped>
ul li {
	text-align: left;
}
a {
	color: #42b983;
}
</style>
