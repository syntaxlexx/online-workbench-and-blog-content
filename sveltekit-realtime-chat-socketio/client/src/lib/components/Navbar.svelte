<script>
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { siteInfo } from '$lib/contants.ts';
</script>

<AppBar>
	<svelte:fragment slot='lead'>
		<a href='/'>
			<strong class='text-xl uppercase'>{siteInfo.name}</strong>
		</a>
		<span class='ml-5 lg:ml-20'></span>
		<a
			class='nav-item'
			href='/'
		>
			Live Chat
		</a>
		<a
			class='nav-item'
			href='/about'
		>
			About
		</a>
	</svelte:fragment>
	<svelte:fragment slot='trail'>
		<LightSwitch />
		<a
			class='btn btn-sm variant-ghost-surface'
			href={siteInfo.github}
			target='_blank'
			rel='noreferrer'
		>
			Source Code
		</a>
		<a
			class='btn btn-sm variant-ghost-surface'
			href='https://github.com/skeletonlabs/skeleton'
			target='_blank'
			rel='noreferrer'
		>
			Skeleton Template
		</a>
	</svelte:fragment>
</AppBar>

<style lang='postcss'>
	.nav-item {
			@apply mx-5 hover:underline hover:underline-offset-4;
	}
</style>