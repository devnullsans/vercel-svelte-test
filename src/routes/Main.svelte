<script>
  import { onMount } from "svelte";

  let toDate = new Date(),
    expenses = [
    // {_id: "62bfe4c4e693fb447b6a5478", timestamp: 1656743106288, note: 'Morning Test', amount: -20},
    // {_id: "62bf4284383b9d464ee8446f", timestamp: 1656701571152, note: 'My Note', amount: -45},
    // {_id: "26fb4e4c6e39bf44b7a64587", timestamp: 1656625175126, note: 'Some Note', amount: -60},
    // {_id: "62b99bc11538b0aec75f047b", timestamp: 1656331200800, note: 'TXN-442', amount: 240},
  ],
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
    <div class={expense.amount < 0 ? "re" : "gr"} on:click={() => location.hash = `#/info/${expense._id}`}>
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
    Load Expense
  </button>
  <button on:click={() => (location.hash = "#/add")}>
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
