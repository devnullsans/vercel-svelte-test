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
      if (res.ok) push("/");
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
        method: 'GET',
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` }
      });
      const { data } = await res.json();
      if (res.ok) expense = { ...data, timestamp: new Date(data.timestamp) };
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
      {expense.timestamp?.toLocaleTimeString()}
      {expense.timestamp?.toLocaleDateString()}
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
