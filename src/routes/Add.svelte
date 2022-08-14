<script>
  import { onDestroy } from "svelte";
  import { push, pop } from "svelte-spa-router";

  let note,
    amount,
    timestamp = new Date(),
    loading = false;

  const desFn = () => clearInterval(id);
  const id = setInterval(() => (timestamp = new Date()), 5e2);

  const onCha = (e) => (timestamp = desFn() ?? new Date(e.target.value));

  const onSav = async () => {
    loading = true;
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` },
        body: JSON.stringify({ amount, note, timestamp: timestamp.getTime() }),
      });
      if (res.ok) pop();
      else {
        sessionStorage.removeItem("code");
        push("/login");
      }
    } catch (err) {
      sessionStorage.removeItem("code");
      push("/login");
    } finally {
      loading = false;
    }
  };

  onDestroy(desFn);
</script>


{#if loading}
  <header>
    <strong class="bl">Loading</strong>
  </header>
  <section>⬤ ⬤ ⬤</section>
  <footer>
    <strong class="bl">Please Wait</strong>
  </footer>
{:else}
  <header>
    <strong class={amount < 0 ? "re" : "gr"}>
      {timestamp?.toLocaleTimeString()}
      {timestamp?.toLocaleDateString()}
    </strong>
  </header>
  <section>
    <input type="datetime-local" on:input={onCha} />
    <input type="text" placeholder="Note" bind:value={note} />
    <input type="number" placeholder="Amount" bind:value={amount} />
  </section>
  <footer>
    <button on:click={() => pop()}> Home </button>
    <button on:click={onSav}> Save </button>
  </footer>
{/if}
