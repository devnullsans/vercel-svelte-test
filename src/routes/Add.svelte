<script>
  import { onDestroy } from "svelte";
  import { pop } from "svelte-spa-router";

  let note = "",
    amount = 0,
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
      else console.warn(res);
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  };

  onDestroy(desFn);
</script>

<header>
  <strong>
    {timestamp?.toLocaleDateString()}
    {timestamp?.toLocaleTimeString()}
  </strong>
</header>
<section>
  <input type="datetime-local" on:input={onCha} />
  <input type="text" placeholder="Note" bind:value={note} />
  <input type="number" placeholder="Amount" bind:value={amount} />
  <!-- <input type="checkbox" bind:checked={withdraw} />Withdrawn? -->
</section>
<footer>
  <button on:click={() => pop()}> Cancel Home </button>
  <button on:click={onSav}> Save Expense </button>
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
