<script lang="ts">
  import { Router, Route } from "svelte-routing";
  import Launch from "./Launch.svelte";
  import Home from "./Home.svelte";

  let url: string = "";
</script>

<Router {url}>
  <Route path="/">
    <Launch />
  </Route>
  <Route path="/app">
    <Home />
  </Route>
</Router>
