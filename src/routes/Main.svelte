<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";

  let toDate = new Date(),
    expenses = [],
    loading = false,
    loads = 0,
    search = '',
    gain,
    loss;
  toDate.setHours(0, 0, 0, 0);

  async function getExps() {
    if (loading) return;
    loading = true;
    try {
      const res = await fetch(`/api?to=${toDate.getTime()}&${loads<3?'d':loads<5?'w':'m'}=-`, {
        method: "GET",
        headers: { authorization: `Basic ${sessionStorage.getItem("code")}` }
      });
      const { data } = await res.json();
      if (res.ok) {
        loads++;
        toDate.setTime(toDate.getTime() - ((loads<3) ? 864e5 : ((loads<5) ? 5184e5 : 25056e5)));
        expenses = [...expenses, ...data];
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

  $: gain = +expenses.reduce((tot, exp) => tot + ((exp.note.includes(search) && (exp.amount > 0)) ? exp.amount : 0), 0);
  $: loss = -expenses.reduce((tot, exp) => tot + ((exp.note.includes(search) && (exp.amount < 0)) ? exp.amount : 0), 0);
  onMount(getExps);
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
    <strong class="gr">₹{gain}</strong>
    <strong class="bl">₹{gain - loss}</strong>
    <strong class="re">₹{loss}</strong>
  </header>
  <section>
    {#each expenses.filter(ex => ex.note.includes(search)) as expense (expense._id)}
      <div class={expense.amount < 0 ? "re" : "gr"} on:click={() => push(`/info/${expense._id}`)}>
        {new Date(expense.timestamp).toLocaleTimeString()}
        {new Date(expense.timestamp).toLocaleDateString()}
        <br />₹{expense.amount} | {expense.note} |
      </div>
    {/each}
  </section>
  <footer>
    <button on:click={() => getExps()}> More </button>
    <input type="text" class="small" placeholder="Search Words ..." bind:value={search} />
    <button on:click={() => push("/add")}> Add </button>
  </footer>
{/if}

<style>
  section {
    display: block;
  }
</style>