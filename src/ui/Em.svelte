<script>
  import parse from 'parse-color';

  export let color = 'lightgrey';
	export let nowrap = true;

  function textColor(rgb) {
		const brightness = ((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000;
		return (brightness > 125) ? 'black' : 'white';
	}

  let text = 'black';

	$: rgb = parse(color).rgb;
	
	$: if (rgb) {
		text = textColor(rgb);
	}

</script>

<span class="em" class:nowrap style="background-color: {color}; color: {text};" role="presentation">
  <slot></slot>
</span>

<style>
	.em {
		padding: 1px 4px 1px 4px;
		font-weight: bold;
	}
	.nowrap {
		white-space: nowrap;
	}
</style>