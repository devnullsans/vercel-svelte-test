<script>
	let get;
	
	function handleScroll(event) {
		get = (event.target.scrollTop + 10 > event.target.scrollHeight - event.target.clientHeight)
		console.log('scrollTop', event.target.scrollTop);
		console.log('clientHeight', event.target.clientHeight);
		console.log('scrollHeight', event.target.scrollHeight);
	}
</script>

<style>
	section {
		background-color: yellowgreen;
		height: 400px;
		overflow-y: auto;
	}
	div {
		border: 1px solid blue;
		height: 400vh;
	}
</style>

<p>{get}</p>
<section on:scroll={handleScroll}>
	<div>scroll me !</div>
</section>
