<script lang='ts'>
	import { ioSocket, isIoSocketConnected } from '$lib/stores/socketStore';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import LiveChat from './LiveChat.svelte';

	$: socket = $ioSocket;

	function toggleIoSocket() {
		$isIoSocketConnected ? socket?.disconnect() : socket?.connect();
	}

	function disconnectIoSocket() {
		socket?.disconnect();
	}
	function connectIoSocket() {
		socket?.connect();
	}
</script>

<div class='container h-full mx-auto flex justify-center items-center'>
	<div class='space-y-10 text-center'>
		<h2 class='font-bold'>Welcome to Realtime Chat with Sveltekit.</h2>
		<div class='flex justify-around'>
			<p>Connection Status: {$isIoSocketConnected ? 'connected' : 'disconnected'}</p>
			<button class='btn btn-link' on:click={toggleIoSocket}>{$isIoSocketConnected ? 'Disconnect' : 'Connect'}</button>
			<button class='btn btn-link' on:click={connectIoSocket}>Connect</button>
			<button class='btn btn-link' on:click={disconnectIoSocket}>DisConnect</button>
		</div>

		{#if !socket}
			<div class='min-h-[60vh] flex flex-col items-center justify-center'>
				<ProgressRadial />
			</div>
		{:else}
			<LiveChat />
		{/if}

	</div>
</div>
