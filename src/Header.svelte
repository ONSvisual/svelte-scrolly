<script>
  import { themes } from './config.js';
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
  export let bgimage = null;
  export let bgfixed = false;

  let style = '';

  if (bgimage) {
    style += `background-image: url(${bgimage});`;
  } else {
    style += 'background-image: none;';
  }

  if (bgfixed) {
    style += ' background-attachment: fixed;';
  }
</script>

<header style="color: {themes[theme]['text']}; background-color: {themes[theme]['background']}; {style}">
	<div class="col-wide height-full middle">
		<div class="center">
			<slot></slot>
    </div>
	</div>
</header>