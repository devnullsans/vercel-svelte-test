<script>
  export let params = {};
  import { onMount } from "svelte";

  let _id = "",
    note = "",
    amount = 0,
    timestamp = new Date(),
    loading = true;

  const onEdt = async () => {
    if (!params.id || loading) return;
    loading = true;
    try {
      const res = await fetch(`/api?id=${_id}`, {
        method: "PUT",
        body: JSON.stringify({ amount, note, timestamp: timestamp.getTime() }),
      });
      console.log({ _id, amount, note, timestamp });
      const data = await res.json();
      if (res.ok) {
        console.log(params.id, data, res);
        console.log((location.hash = "#/"));
      } else console.warn(res);
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    if (!params.id) return;
    try {
      const res = await fetch(`/api?id=${params.id}`);
      const data = await res.json();
      if (res.ok) {
        console.log(params.id, data, res);
        // destructure data plus params id if needed
      } else console.warn(res);
    } catch (err) {
      console.warn(err);
    } finally {
      loading = false;
    }
  });

</script>

{#if loading}
  <header>
    <strong>Loading</strong>
  </header>
  <section>... ... ... ... ...</section>
  <footer>
    <button on:click={() => (location.hash = "#/")}> Back Home </button>
  </footer>
{:else}
  <header>
    <strong class={amount < 0 ? "re" : "gr"}>
      {timestamp?.toLocaleDateString()}
      {timestamp?.toLocaleTimeString()}
    </strong>
  </header>
  <section>
    <input type="datetime-local" on:input={(e) => (timestamp = new Date(e.target.value))} />
    <input type="text" placeholder="Note" bind:value={note} />
    <input type="number" placeholder="Amount" bind:value={amount} />
    <!-- <input type="checkbox" bind:checked={withdraw} />Withdrawn? -->
  </section>
  <footer>
    <button on:click={() => (location.hash = "#/")}> Cancel Home </button>
    <button on:click={onEdt}> Save Changes </button>
  </footer>
{/if}

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
