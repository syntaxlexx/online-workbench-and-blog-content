<script lang='ts'>
	import IoIosArrowDown from 'svelte-icons/io/IoIosArrowDown.svelte';
	import IoIosPause from 'svelte-icons/io/IoIosPause.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let isHovered = false;

	function handleClick() {
		dispatch('click');
	}
</script>

<div
	tabindex='0'
	on:mouseenter={() => isHovered = true}
	on:mouseleave={() => isHovered = false}
	on:click={handleClick}
	class='w-full max-w-[300px] inline-flex justify-center px-4 py-2 rounded-lg bg-black/60 cursor-pointer'>
	<div class='inline-flex items-center'>
		{#if isHovered}
			<div class='w-6 h-6 mr-4'>
				<IoIosArrowDown />
			</div>
			See new messages
		{:else}
			<div class='w-6 h-6 mr-4'>
				<IoIosPause />
			</div>
			Chat paused due to scroll
		{/if}
	</div>
</div>