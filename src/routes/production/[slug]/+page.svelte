<script lang="ts">
  import RSkunkWorks from "./RSkunkWorks.svelte"
  import "@src/app.css"
  import { page } from '$app/state';
import { setContext } from 'svelte';
  import { getLogger } from "@utils/logger";
  const log = getLogger(import.meta.url);

  interface Profile {
    full_name?: string
    company_name?: string
    website?: string
  }

  interface Props {
    data: { user: User; profile: Profile, channels: array, artifacts: Array, agents: array, skunkwork: object }
  }

  let { data }: Props = $props()
  log.info("load", "data=" + (data && JSON.stringify(data)));

   setContext('productionData', () => data);

  let { skunkwork } = data
  skunkwork = skunkwork || { name: "My Production" }

/*

  log.info("load", "page.params.slug=" + page.params.slug);
  log.info("load", "channels=" + channels);
  log.info("load", "agents=" + agents);

  let loading = $state(false)
  let fullName: string = profile?.full_name ?? ""
  let companyName: string = profile?.company_name ?? ""
  let website: string = profile?.website ?? ""
*/

</script>

<svelte:head>
  <title>A Rockstar Production: {skunkwork.name}</title>
</svelte:head>

<div class="Production">
    <div>
      <h1 class="text-2xl m-6">{skunkwork.name}</h1>
      <RSkunkWorks />
    </div>
</div>

<style lang="scss">
	.Production {
		width: 100%;
		height: 100%;
		background-color: var(--color-background-surround);
	}
</style>
