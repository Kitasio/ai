<script>
	import { fade } from 'svelte/transition';
	let prompt;
	let max_tokens;
	let data;
  let loading = false;

	const send = async () => {
    loading = true;
		const res = await fetch('api/oai', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ prompt, max_tokens })
		});

    loading = false;
		data = await res.json();
		data = data.data;
	};
</script>

<div class="h-screen bg-slate-900">
	<h1 class="text-pink-600 text-5xl text-center pt-5">OAI</h1>
	<form on:submit|preventDefault={send}>
		<div
			class="flex flex-col font-mono text-lg justify-center gap-5 mt-10 max-w-screen-md md:mx-auto mx-5 sm:mx-16"
		>
			<textarea
				bind:value={prompt}
				type="text"
				class="rounded-xl caret-pink-500 text-pink-500 focus:outline-none p-2 bg-transparent border-2 border-pink-500"
			/>
			<div class="flex justify-between md:justify-start md:gap-5 items-center">
				<input
					bind:value={max_tokens}
					type="number"
					class="rounded-xl focus:outline-none text-pink-500 p-2 bg-transparent border-2 border-pink-500 w-32"
				/>
				<button
          type="submit"
					class="border-2 hover:scale-105 transition duration-200 cursor-pointer border-pink-500 p-2 rounded-xl text-pink-500"
				>
					Submit
				</button>
			</div>
		</div>

    {#if loading}
      <div class="text-pink-500 font-mono text-lg max-w-screen-md md:mx-auto">Loading...</div>
    {/if}
		{#if data}
			<div in:fade class="mt-5 text-lg font-mono text-pink-500 mx-5 md:mx-auto max-w-screen-md">
				{@html data}
			</div>
		{/if}
	</form>
</div>
