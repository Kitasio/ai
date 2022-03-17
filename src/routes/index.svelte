<script>
	import { fade } from 'svelte/transition';
	let prompt;
	let max_tokens;
	let data;

	const send = async () => {
		const res = await fetch('api/oai', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt, max_tokens })
		});

		data = await res.json();
		data = data.data;
	};
</script>

<div class="h-screen bg-emerald-500">
	<h1 class="text-emerald-200 text-5xl text-center pt-5">OAI</h1>
	<div class="flex flex-col justify-center gap-5 mt-10 max-w-6xl md:mx-auto mx-5">
		<textarea
			bind:value={prompt}
			type="text"
			class="rounded-xl text-emerald-100 p-2 bg-emerald-500 border-2 border-emerald-50"
		/>
		<div class="flex justify-between items-center">
			<input
				bind:value={max_tokens}
				type="number"
				class="rounded-xl text-emerald-100 p-2 bg-emerald-500 border-2 border-emerald-50 w-32"
			/>
			<div
				on:click={send}
				class="border-2 uppercase hover:scale-105 transition duration-200 cursor-pointer border-emerald-50 p-2 rounded-xl text-emerald-100"
			>
				click
			</div>
		</div>
	</div>

	{#if data}
		<div in:fade class="mt-5 text-emerald-100 mx-5 md:mx-auto max-w-6xl">
			{@html data}
		</div>
	{/if}
</div>
