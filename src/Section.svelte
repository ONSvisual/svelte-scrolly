<script>
	import { themes } from './config.js';
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
</script>

<section style="--text: {themes[theme]['text']}; --background: {themes[theme]['background']}">
	<div class="col-medium">
		<slot></slot>
	</div>
</section>

<style>
	section {
		color: var(--text);
		background-color: var(--background);
	}
</style>