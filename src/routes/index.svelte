<script>
	import { fade } from 'svelte/transition';
	let prompt;
	let max_tokens = 300;
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

<div class="min-h-screen py-10 bg-slate-900">
	<h1 class="text-pink-600 text-5xl text-center">AI</h1>
	<form on:submit|preventDefault={send}>
		<div
			class="flex flex-col font-mono text-lg justify-center gap-5 mt-10 max-w-screen-md md:mx-auto mx-5 sm:mx-16"
		>
			<textarea
				bind:value={prompt}
				type="text"
				placeholder="Your prompt"
				class="rounded-xl caret-pink-500 text-pink-500 focus:outline-none focus:ring-0 focus:border-pink-500 p-2 bg-transparent border-2 border-pink-500"
			/>
			<div>
				<p class="text-pink-200 text-sm">max tokens</p>
				<div class="flex justify-between md:justify-start gap-5 items-center">
					<input bind:value={max_tokens} min="1" max="2000" type="range" class="bg-transparent" />
					<div class="flex text-pink-200 items-center justify-center text-sm">
						{max_tokens}
					</div>
				</div>
			</div>
			<div class="flex items-center justify-center">
				<button
					type="submit"
					class="border-2 hover:scale-105 transition duration-200 cursor-pointer border-pink-500 p-2 rounded-xl text-pink-500"
				>
					Submit
				</button>
			</div>
		</div>

		{#if loading}
			<div class="text-pink-500 font-mono text-lg max-w-screen-md md:mx-auto mx-5 sm:mx-16">
				Loading...
			</div>
		{/if}
		{#if data}
			<div
				in:fade
				class="mt-10 text-lg font-mono text-pink-500 mx-5 md:mx-auto max-w-screen-md sm:mx-16"
			>
				{@html data}
			</div>
		{/if}
	</form>
</div>

<style>
	input[type='range'] {
		height: 25px;
		-webkit-appearance: none;
		margin: 10px 0;
		width: 100%;
	}
	input[type='range']:focus {
		outline: none;
	}
	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 5px;
		cursor: pointer;
		box-shadow: 0px 0px 0px #000000;
		background: #ec4899;
		border-radius: 1px;
		border: 0px solid #000000;
	}
	input[type='range']::-webkit-slider-thumb {
		box-shadow: 0px 0px 0px #000000;
		border: 1px solid #ec4899;
		height: 18px;
		width: 18px;
		border-radius: 25px;
		background: #ec4899;
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: -7px;
	}
	input[type='range']:focus::-webkit-slider-runnable-track {
		background: #ec4899;
	}
	input[type='range']::-moz-range-track {
		width: 100%;
		height: 5px;
		cursor: pointer;
		box-shadow: 0px 0px 0px #000000;
		background: #ec4899;
		border-radius: 1px;
		border: 0px solid #000000;
	}
	input[type='range']::-moz-range-thumb {
		box-shadow: 0px 0px 0px #000000;
		border: 1px solid #ec4899;
		height: 18px;
		width: 18px;
		border-radius: 25px;
		background: #ec4899;
		cursor: pointer;
	}
	input[type='range']::-ms-track {
		width: 100%;
		height: 5px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}
	input[type='range']::-ms-fill-lower {
		background: #ec4899;
		border: 0px solid #000000;
		border-radius: 2px;
		box-shadow: 0px 0px 0px #000000;
	}
	input[type='range']::-ms-fill-upper {
		background: #ec4899;
		border: 0px solid #000000;
		border-radius: 2px;
		box-shadow: 0px 0px 0px #000000;
	}
	input[type='range']::-ms-thumb {
		margin-top: 1px;
		box-shadow: 0px 0px 0px #000000;
		border: 1px solid #ec4899;
		height: 18px;
		width: 18px;
		border-radius: 25px;
		background: #ec4899;
		cursor: pointer;
	}
	input[type='range']:focus::-ms-fill-lower {
		background: #ec4899;
	}
	input[type='range']:focus::-ms-fill-upper {
		background: #ec4899;
	}
</style>
