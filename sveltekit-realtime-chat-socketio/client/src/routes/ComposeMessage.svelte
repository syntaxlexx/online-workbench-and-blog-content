<script lang='ts'>
	// emit the message instead of handling socket.io here
	import EmojiSelector from 'svelte-emoji-selector';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	let textContent = '';

	function onEmoji(event) {
		textContent += event.detail;
	}

	function handleKeyDown(e: KeyboardEvent) {
		switch (e.key.toLowerCase()) {
			case 'enter':
				dispatch('message', textContent);
				textContent = ''
				break;
			default:
				break;
		}
	}
</script>

<div class='relative h-[50px]'>
	<input
		class='input'
		type='text'
		placeholder='Send a message'
		bind:value={textContent}
		on:keydown={handleKeyDown}
	/>
	<div class='absolute right-5 bottom-2 top-0 flex flex-col justify-center'>
		<EmojiSelector on:emoji={onEmoji} autoClose={false} />
	</div>
</div>
