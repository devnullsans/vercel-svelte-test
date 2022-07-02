<header>
  <!-- expense stats -->
  <strong class="gr">$100</strong>
  <strong class="bl">$33</strong>
  <strong class="re">$77</strong>
</header>
<section>
  <!-- expense list -->
  <div class="re">23-05-22 16:47 $24</div>
  <div class="gr">24-05-22 09:32 $100</div>
  <div class="re">24-05-22 19:09 $53</div>
  <div class="re">23-05-22 16:47 $24</div>
  <div class="gr">24-05-22 09:32 $100</div>
  <div class="re">24-05-22 19:09 $53</div>
</section>
<footer>
  <a href="#/add">
    <!-- expense add -->
    Add More
  </a>
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
    font-size: 3em;
    font-weight: 300;
  }
  footer {
    flex: 1 1 20%;
  }
</style>
