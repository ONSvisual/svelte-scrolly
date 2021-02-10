<script>
  import { themes } from './config.js';
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
  export let col = 'medium';
  export let grid = '';
  export let caption = null;

  if (grid !== '') {
    grid = ` grid-${grid}`;
  }
</script>

<figure style="--text: {themes[theme]['text']}; --background: {themes[theme]['background']};">
	<div class="col-{col}">
		<div class="grid {grid}">
			<slot></slot>
		</div>
  </div>
</figure>
{#if caption}
<caption style="--text: {themes[theme]['text']}; --background: {themes[theme]['background']};">
  <div class="col-medium">
    <div class="caption">{@html caption}</div>
  </div>
</caption>
{/if}

<style>
  figure, caption {
    color: var(--text);
    background-color: var(--background);
  }
</style>