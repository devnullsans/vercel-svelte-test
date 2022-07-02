<script>
  import { onDestroy } from "svelte";

  let note = "",
    amount = 0,
    timestamp = new Date();

  const intFn = () => (timestamp = new Date());
  const desFn = () => clearInterval(id);
  const id = setInterval(intFn, 5e2);

  const onCha = (e) => {
    console.log(e);
    desFn();
    timestamp = new Date(e.target.value);
  };

  const onSav = () => {
    console.log({ note, amount, timestamp });
    fetch("/api", {
      method: "POST",
      body: JSON.stringify({ amount, note, timestamp: timestamp.getTime() }),
    }).then(res => {
      if (res.ok) return console.log(location.hash = '#/');
      return console.warn(res.status);
    }).catch(console.error);
  };

  onDestroy(desFn);
</script>

<header>
  <strong>
    {timestamp?.toLocaleDateString()}
    {timestamp?.toLocaleTimeString()}
  </strong>
</header>
<section>
  <!-- expense fields -->
  <input type="datetime-local" on:input={onCha} />
  <input type="text" placeholder="Note" bind:value={note} />
  <input type="number" placeholder="Amount" bind:value={amount} />
  <!-- <input type="checkbox" bind:checked={withdraw} />Withdrawn? -->
</section>
<footer>
  <!-- expense save -->
  <button on:click={onSav}>
    Save
  </button>
</footer>

<style>
  header {
    flex: 1 1 20%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    font-size: 4em;
    font-weight: 500;
  }
  section {
    flex: 1 1 100%;
    overflow-y: auto;
  }
  input {
    display: block;
    width: 100%;
    height: 4rem;
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 2em;
    font-weight: 300;
  }
  footer {
    flex: 1 1 20%;
  }
</style>
