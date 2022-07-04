<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  let toDate = new Date(),
    expenses = [],
    loading = false,
    gain,
    loss;
  toDate.setHours(0, 0, 0, 0);

  async function getExps() {
    if (loading) return;
    loading = true;
    try {
      const res = await fetch(`/api?to=${toDate.getTime()}`, {
        method: "GET",
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` }
      });
      const { data } = await res.json();
      if (res.ok) {
        expenses = [...expenses, ...data];
        toDate.setDate(toDate.getDate() - 1);
      } else {
        sessionStorage.removeItem("code");
        push("/login");
      }
    } catch (err) {
      sessionStorage.removeItem("code");
      push("/login");
    } finally {
      loading = false;
    }
  }

  $: gain = +expenses
    .filter((exp) => exp.amount > 0)
    .reduce((a, s) => a + s.amount, 0);
  $: loss = -expenses
    .filter((exp) => exp.amount < 0)
    .reduce((a, s) => a + s.amount, 0);
  onMount(getExps);
</script>

<header>
  <strong class="gr">${gain}</strong>
  <strong class="bl">${gain - loss}</strong>
  <strong class="re">${loss}</strong>
</header>
<section>
  {#each expenses as expense (expense._id)}
    <div class={expense.amount < 0 ? "re" : "gr"} on:click={() => push(`/info/${expense._id}`)}>
      {new Date(expense.timestamp).toLocaleDateString()}<br />
      {new Date(expense.timestamp).toLocaleTimeString()}<br />
      {expense.note}<br />
      ₹{expense.amount}<br />
    </div>
  {/each}
</section>
<footer>
  <button on:click={() => getExps()}> Load Expense </button>
  <button on:click={() => push("/add")}> Add Expense </button>
</footer>
