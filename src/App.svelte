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
