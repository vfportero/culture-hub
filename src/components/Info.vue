<template>
	<div class="center">
		App made by <span class="vellons">Vellons</span>
		<p><a href="https://github.com/vellons" target="_blank">GitHub</a></p>
		<p>Ciao!</p>
	</div>
</template>

<script>
	export default {
		name: "Info"
	}
</script>

<style scoped>
	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		-ms-transform: translate(-50%, -50%);
		text-align: center;
	}

	.vellons {
		font-weight: bold;
	}
</style>