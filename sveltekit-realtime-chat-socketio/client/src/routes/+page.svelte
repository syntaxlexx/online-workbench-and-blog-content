<script lang="ts">
	import { ioSocket } from '$lib/stores/socketStore';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import LiveChat from './LiveChat.svelte';

	export let data;
	$: io = $ioSocket;
</script>

<div class='container h-full mx-auto flex justify-center items-center'>
	<div class='space-y-10 text-center'>
		<h2 class='font-bold'>Welcome to Realtime Chat with Sveltekit.</h2>


		{#if !io}
			<div class="min-h-[60vh] flex flex-col items-center justify-center">
				<ProgressRadial />
			</div>
		{:else}
			<LiveChat />
		{/if}

	</div>
</div>
