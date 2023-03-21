<script lang='ts'>
	import { ioSocket, connectedUsers } from '$lib/stores/socketStore';
	import { authUser } from '$lib/stores/authStore';
	import { SOCKET_EVENTS } from '$lib/contants';
	import { onDestroy, onMount } from 'svelte';
	import type { SocketMessagePayload } from '$lib/types';
	import { getTimeFromDate } from '$lib/helpers.js';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { fly } from 'svelte/transition';
	import ComposeMessage from './ComposeMessage.svelte';
	import ChatPausedAlert from './ChatPausedAlert.svelte';

	$: socket = $ioSocket;
	$: user = $authUser;

	let messages: SocketMessagePayload[] = [];
	let hideTimestamps = false;
	let isScrollPaused = false;
	let element;
	let prevScrollY = 0;

	const scrollToBottom = async (node: HTMLUListElement) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	$: if (messages && element) {
		if (!isScrollPaused) {
			scrollToBottom(element);
		}
	}

	function handleScroll() {
		const currentScroll = element.scrollTop;

		isScrollPaused = currentScroll < prevScrollY;

		prevScrollY = currentScroll;
	}

	function handleUnpauseScroll() {
		scrollToBottom(element);
		isScrollPaused = false
	}

	function updateOnlineUsers(data: number) {
		connectedUsers.update(() => data)
	}

	function handleIncomingMessage(data: SocketMessagePayload) {
		// console.log(data);
		messages = [...messages, data];
	}

	function socketListener() {
		socket?.on(SOCKET_EVENTS.onlineUsers, updateOnlineUsers);

		socket?.on(SOCKET_EVENTS.newMessage, handleIncomingMessage);
	}

	function sendMessage(e: CustomEvent) {
		const message = e.detail.trim() as string;
		if (message.length > 0) {
			// save first to db
			// const resp = await saveToDatabase(message);

			const payload: SocketMessagePayload = {
				message: message,
				user: {
					name: 'ManU',
					color: 'red',
					badges: []
				},
				createdAt: new Date()
			};

			socket?.emit(SOCKET_EVENTS.message, payload);
		}
	}


	onMount(() => {
		socketListener();
		socket?.emit(SOCKET_EVENTS.onlineUsers);
	});

	onDestroy(() => {
		socket?.off(SOCKET_EVENTS.onlineUsers, updateOnlineUsers)
		socket?.off(SOCKET_EVENTS.newMessage, handleIncomingMessage)
	})

</script>

<p>Users online: {$connectedUsers}</p>
<br />

<div class='flex flex-wrap'>
	<div class='w-full md:w-1/5 order-first md:order-last'>
		<div class='ml-5'>
			<h6>Settings</h6>
			<SlideToggle name='slider-label' size='sm' bind:checked={hideTimestamps}>Hide timestamps</SlideToggle>
			{#if isScrollPaused}
				<SlideToggle name='slider-scroll-paused' size='sm' checked>Scroll Paused</SlideToggle>
			{:else}
				<SlideToggle name='slider-scroll-paused' size='sm'>Scroll Active</SlideToggle>
			{/if}
		</div>
	</div>
	<div class='w-full md:w-4/5'>
		<!--message box-->
		<div class='px-6 pt-12 pb-[70px] rounded-md bg-slate-900 h-[60vh] relative'>
			<!--messages-->
			<ul
				bind:this={element}
				on:scroll={handleScroll}
				class='h-[100%] flex flex-col justify-start overflow-y-auto overflow-x-hidden'>
				{#each messages as message}
					<li class='relative hover:bg-gray-500/50 rounded-md px-1 py-1'>
						{#if !hideTimestamps}
							<p class='absolute italic text-sm font-light'
								 transition:fly={{x: -50}}>{getTimeFromDate(message.createdAt)}</p>
						{/if}
						<div class='flex'
								 style={`transform: translatex(${hideTimestamps ? '0' : '45px'}); transition: transform 300ms ease-out`}>
							<div class='mr-1 flex items-center gap-1'>
								{#each message.user.badges as badge}
									<img src='/badges/{badge}.png' alt='badge' class='w-[16px] h-auto' />
								{/each}
							</div>
							<p class='mr-2 italic text-sm font-semibold'>
								<span style={`color: ${message.user.color}`}>{message.user.name}</span>:
							</p>
							<p class='break-words'>{message.message}</p>
						</div>
					</li>
				{/each}
			</ul>

			<!--chat box-->
			<div class='absolute left-6 right-6 bottom-2'>
				<ComposeMessage on:message={sendMessage} />
			</div>

			<!--pause alert-->
			{#if isScrollPaused}
				<div class='absolute left-6 right-6 bottom-[80px]' transition:fly={{y: 30}}>
					<ChatPausedAlert on:click={handleUnpauseScroll}/>
				</div>
			{/if}
		</div>
	</div>
</div>
