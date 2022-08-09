<script>
  export let params = {};
  import { onMount } from "svelte";
  import { pop, push } from "svelte-spa-router";

  let expense = {
      _id: "",
      note: "",
      amount: 0,
      timestamp: 0,
    }, loading = true;

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
    <strong class="bl">Loading</strong>
  </header>
  <section>⬤ ⬤ ⬤</section>
  <footer>
    <strong class="bl">Please Wait</strong>
  </footer>
{:else}
  <header>
    <strong class={expense.amount < 0 ? "re" : "gr"}>
      {new Date(expense.timestamp).toLocaleTimeString()}
      {new Date(expense.timestamp).toLocaleDateString()}
    </strong>
  </header>
  <section>
    <div class={expense.amount < 0 ? "re" : "gr"}>
      {expense.note}
      <br />
      ₹{expense.amount}
    </div>
    <button on:click={onDel}> Delete </button>
  </section>
  <footer>
    <button on:click={() => pop()}> Home </button>
    <button on:click={() => push(`/edit/${expense._id ?? params.id}`)}> Edit </button>
  </footer>
{/if}

<style>
  div {
    width: 100%;
    line-height: 2em;
  }
</style>