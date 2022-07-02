<script>
  import { onMount } from "svelte";

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
      const res = await fetch(`/api?to=${toDate.getTime()}`);
      const { data, error } = await res.json();
      if (res.ok) {
        expenses = [...expenses, ...data];
        toDate.setDate(toDate.getDate() - 1);
      } else console.warn(res, error);
    } catch (err) {
      console.warn(err);
    } finally {
      // toDate.setDate(toDate.getDate() - 1);
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
  <!-- expense stats -->
  <strong class="gr">${gain}</strong>
  <strong class="bl">${gain - loss}</strong>
  <strong class="re">${loss}</strong>
</header>
<section>
  <!-- expense list -->
  {#each expenses as expense (expense._id)}
    <div class={expense.amount < 0 ? "re" : "gr"}>
      <br />
      {new Date(expense.timestamp).toLocaleDateString()}<br />
      {new Date(expense.timestamp).toLocaleTimeString()}<br />
      {expense.note}<br />
      ${expense.amount}<br />
    </div>
  {/each}
</section>
<footer>
  <button on:click={() => getExps()}>
    <!-- get more -->
    Load Expense
  </button>
  <button on:click={() => (location.hash = "#/add")}>
    <!-- expense add -->
    Add Expense
  </button>
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
  .re {
    color: #ff3e00;
  }
  .bl {
    color: #222222;
  }
  .gr {
    color: #4fff00;
  }
  section {
    flex: 1 1 100%;
    overflow-y: auto;
  }
  div {
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
