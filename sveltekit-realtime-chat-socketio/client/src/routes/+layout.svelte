<script lang='ts'>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { ioSocket } from '$lib/stores/socketStore';
	import { authUser } from '$lib/stores/authStore';
	import { io } from '$lib/socket-client';

	export let data;
	const authToken: string | undefined = data?.accessToken;

	onMount(() => {
		ioSocket.update(() => io);
		authUser.update(() => data.user);
	});
</script>

<AppShell>
	<svelte:fragment slot='header'>
		<Navbar />
	</svelte:fragment>
	<slot />
</AppShell>
