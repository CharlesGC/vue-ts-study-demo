<script setup lang="ts">
import { reactive } from 'vue'
import data from './plugins/lazyload/types/index'
import HackNews from './components/HackNews.vue';

const listData = reactive(data)
</script>

<template>
	<!-- <div style="height: 1000px;width: 100%;"></div> -->
	<!-- <HackNews /> -->
	<ul class="list">
		<li v-for="item in listData" class="item" :key="item.id">
			<div class="icon">
				<img width="60" height="60" v-lazy="item.imgurl">
			</div>
			<div class="text">
				<h2 class="name">{{item.name}}</h2>
				<p class="desc">{{ item.desc}}</p>
			</div>
		</li>
	</ul>
</template>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
