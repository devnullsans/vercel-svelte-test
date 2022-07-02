<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
</script>

<main>
	<Router {routes} />
</main>

<style>
	main {
    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
		text-align: center;
		padding: 1em;
		max-width: 360px;
    height: calc(100vh - 3em);
    margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
