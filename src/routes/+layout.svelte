<script>
  import './app.css';
  import 'highlight.js/styles/github.css';

  let { children } = $props();
</script>

<main class="wrapper">
  {@render children()}
</main>

<style>
  .wrapper {
    width: 100%;
    max-width: 960px;
    margin: 0px auto;
  }

  @media (max-width: 960px) {
    .wrapper {
      padding: 0px 1rem;
    }
  }
</style>
