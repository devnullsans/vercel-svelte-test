<script>
  import { replace } from "svelte-spa-router";

  let code;

  function login() {
    const token = btoa(code);
    sessionStorage.setItem("code", token);
    replace("/");
  }
</script>

<header>
  <strong>Enter Password</strong>
</header>
<section>
  <input type="password" placeholder="Password" bind:value={code} />
</section>
<footer>
  <button on:click={login}>Login</button>
</footer>

<style>
  header {
    flex: 1 1 20%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    font-size: 2em;
    font-weight: 500;
  }
  section {
    flex: 1 1 100%;
    overflow-y: auto;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: stretch;
  }
  input {
    display: block;
    /* width: 100%; */
    height: 2em;
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 1.5em;
    font-weight: 300;
  }
  footer {
    flex: 1 1 20%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
  }
</style>
