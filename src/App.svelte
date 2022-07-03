<script>
	import Router, { replace } from 'svelte-spa-router';
	import routes from './routes';

  function routeGuard(event) {
    if (event.detail.route === '/login') replace('/');
    else replace('/login');
  }
</script>

<main>
	<Router {routes} on:conditionsFailed={routeGuard} />
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
