<script>
	import { themes } from './config.js';
	import { getContext } from 'svelte';

  export let theme = getContext('theme');
  export let hr = true;
</script>

<section style="--text: {themes[theme]['text']}; --background: {themes[theme]['background']};">
	<div class="col-medium">
    {#if hr}
    <hr style="--muted: {themes[theme]['muted']}"/>
    {:else}
    <hr style="--muted: {themes[theme]['muted']}; border: none;"/>
    {/if}
	</div>
</section>

<style>
  section {
    color: var(--text);
    background-color: var(--background);
  }
  hr {
    color: var(--muted);
    width: 65px;
    border: none;
    border-top: 4px dotted;
    margin: 40px auto -10px auto;
  }
</style>

