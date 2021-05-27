<script>
  import { themes } from '../config.js';
	import { onMount, getContext } from 'svelte';
	import { debounce } from 'debounce';
	
	const colWidths = {
		'narrow': 200,
		'medium': 310,
		'wide': 500
	};

  export let theme = getContext('theme');
  export let col = 'medium';
  export let grid = null;
  export let caption = null;
	export let height = 200;
	export let gap = 12;

	let rowHeight = !Number.isNaN(height) ? height + 'px' : height;
	
	const minWidth = grid && colWidths[grid] ? colWidths[grid] : null;
	
	let gridWidth;
	let cols;
	
	let el;
	let divs;
	let count;
	
	onMount(() => {
		resize();
	});
	
	const update = debounce(resize, 200);
	
	function resize() {
		if (el && !divs) {
			let arr = [];
			let children = el.childNodes;
			children.forEach(child => {
				if (child.nodeName == 'DIV') { arr.push(child)};
			});
			divs = arr;
		};
		count = divs.length;
		cols = !minWidth || gridWidth <= minWidth ? 1 : Math.floor(gridWidth / minWidth);
		makeCols();
	}
	
	function makeCols() {
		let r = Math.ceil(count / cols) > 1 ? `-ms-grid-rows: ${rowHeight} (${gap}px ${rowHeight})[${Math.ceil(count / cols) - 1}]; grid-template-rows: ${rowHeight} repeat(${Math.ceil(count / cols) - 1}, ${gap}px ${rowHeight});` : `-ms-grid-rows: ${rowHeight}; grid-template-rows: ${rowHeight};`;
		let c = cols > 1 ? `-ms-grid-columns: 1fr (${gap}px 1fr)[${cols - 1}]; grid-template-columns: 1fr repeat(${cols - 1}, ${gap}px 1fr);` : '';
		el.style.cssText = r + c;
		divs.forEach((div, i) => {
			let col = (i % cols) * 2 + 1;
			let row = Math.floor(i / cols) * 2 + 1;
			div.style.cssText = `-ms-grid-column: ${col}; -ms-grid-row: ${row}; grid-column: ${col}; grid-row: ${row};`;
		});
	}
	
	$: minWidth && gridWidth && update();
</script>

<figure style="color: {themes[theme]['text']}; background-color: {themes[theme]['background']};">
	<div class="col-{col}">
		<div bind:this={el} bind:clientWidth={gridWidth} class="grid">
			<slot></slot>
		</div>
  </div>
</figure>
{#if caption}
<caption style="color: {themes[theme]['text']}; background-color: {themes[theme]['background']};">
  <div class="col-medium">
    <div class="caption">{@html caption}</div>
  </div>
</caption>
{/if}

<style>
	.grid {
		display: grid;
		display: -ms-grid;
		-ms-grid-columns: 1fr;
		grid-template-columns: 1fr;
    margin-top: 40px;
	}
</style>