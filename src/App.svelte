<script>
	import Router, { push } from 'svelte-spa-router';
	import routes from './routes';

  function routeGuard(event) {
    if (event.detail.route === '/login') push('/');
    else push('/login');
  }
</script>

<main>
	<Router {routes} on:conditionsFailed={routeGuard} />
</main>
