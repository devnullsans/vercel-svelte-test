<script>
  export let params = {};
  import { onMount } from "svelte";

  let expense = {
      _id: "",
      note: "",
      amount: 0,
      timestamp: 0,
    }, loading = true;

  const onDel = async () => {
    fetch(`/api?id=${expense._id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) return location.hash = "#/";
        return console.warn(res);
      })
      .catch(console.error);
  };

  onMount(async () => {
    if (!params.id) return;
    try {
      const res = await fetch(`/api?id=${params.id}`);
      const { data } = await res.json();
      if (res.ok) expense = data;
      else console.warn(res);
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
    <strong class={expense.amount < 0 ? "re" : "gr"}>
      {new Date(expense.timestamp).toLocaleDateString()}
      {new Date(expense.timestamp).toLocaleTimeString()}
    </strong>
  </header>
  <section>
    <input
      class={expense.amount < 0 ? "re" : "gr"}
      type="text"
      placeholder="Note"
      bind:value={expense.note}
      readonly
    />
    <input
      class={expense.amount < 0 ? "re" : "gr"}
      type="number"
      placeholder="Amount"
      bind:value={expense.amount}
      readonly
    />
    <button on:click={onDel}> Delete Expense </button>
  </section>
  <footer>
    <button on:click={() => (location.hash = "#/")}>
      Back Home
    </button>
    <button on:click={() => (location.hash = `#/edit/${expense._id ?? params.id}`)}>
      Edit Expense
    </button>
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
    width: 100%;
    height: 2em;
    padding-top: 1em;
    padding-bottom: 1em;
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
