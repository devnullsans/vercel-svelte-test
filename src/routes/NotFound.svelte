<script>
  import { link } from "svelte-spa-router";
</script>

<h1>Not Found</h1>
<p>This route doesn't exist.</p>
<a href="/" use:link>Back Home</a>

<style>
  h1 {
    color: #ff0040;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
</style>
