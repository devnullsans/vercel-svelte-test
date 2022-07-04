<script>
  export let params = {};
  import { onMount } from "svelte";
  import { pop, push } from "svelte-spa-router";

  let expense = {
      _id: "",
      note: "",
      amount: 0,
      timestamp: 0,
    },
    loading = true;

  const onDel = async () => {
    if (!params.id) return;
    loading = true;
    try {
      const res = await fetch(`/api?id=${expense._id}`, {
        method: "DELETE",
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` }
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

  onMount(async () => {
    if (!params.id) return;
    try {
      const res = await fetch(`/api?id=${params.id}`, {
        method: "GET",
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` }
      });
      const { data } = await res.json();
      if (res.ok) expense = data;
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
  });
</script>

{#if loading}
  <header>
    <strong>Loading</strong>
  </header>
  <section>... ... ... ... ...</section>
  <footer>
    <button on:click={() => pop()}> Back Home </button>
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
      value={expense.note}
      readonly
    />
    <input
      class={expense.amount < 0 ? "re" : "gr"}
      type="number"
      placeholder="Amount"
      value={expense.amount}
      readonly
    />
    <button on:click={onDel}> Delete Expense </button>
  </section>
  <footer>
    <button on:click={() => pop()}> Back Home </button>
    <button on:click={() => push(`/edit/${expense._id ?? params.id}`)}> Edit Expense </button>
  </footer>
{/if}
