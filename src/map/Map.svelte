<script>
	import { onMount, setContext } from "svelte";
	import mapbox from "mapbox-gl";

	export let map;
	export let id = "map";
	export let location = {
		bounds: [
			[-5.816, 49.864],
			[1.863, 55.872],
		], // England & Wales
	};
	export let style;
	export let interactive = true;
	export let minzoom = 0;
	export let maxzoom = 14;
	export let zoom = null;

	let container;
	let w;
	let options;

	setContext("map", {
		getMap: () => map,
	});

	if (location.bounds) {
		options = { bounds: location.bounds };
	} else if (location.lon && location.lat) {
		options = {
			center: [location.lon, location.lat],
		};
		if (location.zoom) {
			options.zoom = location.zoom;
		}
	}

	onMount(() => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "https://unpkg.com/mapbox-gl@1.13.0/dist/mapbox-gl.css";

		link.onload = () => {
			map = new mapbox.Map({
				container,
				style: style,
				minZoom: minzoom,
				maxZoom: maxzoom,
				interactive: interactive,
				...options,
			});

			// Get initial zoom level
			map.on("load", () => {
				zoom = map.getZoom();
			});

			// Update zoom level when the view zooms
			map.on("zoom", () => {
				zoom = map.getZoom();
			});
		};

		document.head.appendChild(link);

		return () => {
			map.remove();
			link.parentNode.removeChild(link);
		};
	});

	// Function that forces map to resize to fit parent div, in case it doesn't automatically
	function resizeCanvas() {
		let canvas = document.getElementsByClassName("mapboxgl-canvas");
		if (canvas[0]) {
			canvas[0].style.width = "100%";
			map.resize();
		}
	}

	// Invoke above function when parent div size changes
	$: w && resizeCanvas();
</script>

<div bind:clientWidth={w} bind:this={container} {id}>
	{#if map}
		<slot />
	{/if}
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
