<script>
  export let params = {};
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  let expense = {
      _id: "",
      note: "",
      amount: 0,
      timestamp: new Date(),
    }, loading = true;

  const onEdt = async () => {
    if (loading) return;
    loading = true;
    try {
      const res = await fetch(`/api?id=${expense._id}`, {
        method: "PUT",
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` },
        body: JSON.stringify({
          amount: expense.amount,
          note: expense.note,
          timestamp: expense.timestamp.getTime()
        })
      });
      // const data = await res.json(); dont think i need data back
      if (res.ok) push("/");
      else console.warn(res);
    } catch (err) {
      console.error(err);
    } finally {
      loading = false;
    }
  };

  onMount(async () => {
    if (!params.id) return;
    // loading = true; loading should be true by default
    try {
      const res = await fetch(`/api?id=${params.id}`, {
        method: 'GET',
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` }
      });
      const { data } = await res.json();
      if (res.ok) expense = { ...data, timestamp: new Date(data.timestamp) };
      else console.warn(res);
    } catch (err) {
      console.error(err);
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
    <button on:click={() => push("/")}> Back Home </button>
  </footer>
{:else}
  <header>
    <strong class={expense.amount < 0 ? "re" : "gr"}>
      {expense.timestamp?.toLocaleDateString()}
      {expense.timestamp?.toLocaleTimeString()}
    </strong>
  </header>
  <section>
    <input type="datetime-local" on:input={(e) => (expense.timestamp = new Date(e.target.value))} />
    <input type="text" placeholder="Note" bind:value={expense.note} />
    <input type="number" placeholder="Amount" bind:value={expense.amount} />
  </section>
  <footer>
    <button on:click={() => push("/")}> Cancel Changes </button>
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
