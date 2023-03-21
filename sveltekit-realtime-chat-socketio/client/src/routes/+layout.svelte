<script lang='ts'>
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { ioSocket, isIoSocketConnected, connectedUsers } from '$lib/stores/socketStore';
	import { authUser } from '$lib/stores/authStore';
	import socket from '$lib/socket';
	import { SOCKET_EVENTS } from '../lib/contants';

	export let data;
	// const authToken: string | undefined = data?.accessToken;

	function handleOnConnect() {
		// console.log('connected');
		isIoSocketConnected.update(() => true)
	}
	function handleOnDisconnect() {
		// console.log('disconnected');
		isIoSocketConnected.update(() => false)
		connectedUsers.update((prev) => prev - 1)
	}

	onMount(() => {
		socket.on(SOCKET_EVENTS.connect, handleOnConnect)
		socket.on(SOCKET_EVENTS.disconnect, handleOnDisconnect)

		ioSocket.update(() => socket);
		authUser.update(() => data.user);

		// feed initial socket connection state
		if(socket.connected) {
			handleOnConnect()
		} else {
			handleOnDisconnect()
		}
	});

	onDestroy(() => {
		socket.off()
		// socket.disconnect()
		ioSocket.update(() => null);
		isIoSocketConnected.update(() => false);
	})
</script>

<AppShell>
	<svelte:fragment slot='header'>
		<Navbar />
	</svelte:fragment>
	<slot />
</AppShell>
