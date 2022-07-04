<script>
  import { pop } from "svelte-spa-router";

  let code;

  function login() {
    const token = btoa(code);
    sessionStorage.setItem("code", token);
    pop();
  }
</script>

<header>
  <strong class="bl">Enter Password</strong>
</header>
<section>
  <input type="password" placeholder="Password" bind:value={code} />
  <button on:click={login}>Login</button>
</section>
