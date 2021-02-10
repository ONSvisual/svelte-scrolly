<script>
	import { onMount } from 'svelte';
	import mapbox from 'mapbox-gl';
	
	export let location = {
		bounds: [[-5.816, 49.864], [1.863, 55.872]] // England & Wales bounding box
	};
	export let style;
	export let map;
	
	let container;
	let options;
	
	if (location.bounds) {
		options = { bounds: location.bounds };
	} else if (location.lon && location.lat) {
		options = {
			center: [location.lon, location.lat]
		}
		if (location.zoom) {
			options.zoom = location.zoom;
		}
	};

	onMount(() => {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'https://unpkg.com/mapbox-gl@1.13.0/dist/mapbox-gl.css';

		link.onload = () => {
			map = new mapbox.Map({
				container,
				style: style,
				interactive: false,
				...options
			});
			map.scrollZoom.disable();
		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div bind:this={container}>
	{#if map}
		<slot></slot>
	{/if}
</div>