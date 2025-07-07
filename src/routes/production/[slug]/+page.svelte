<script lang="ts">
  import { applyAction, enhance } from "$app/forms"
  import type { SubmitFunction } from "@sveltejs/kit"
  import RSkunkWorks from "./RSkunkWorks.svelte"
  import "@src/app.css"

  interface User {
    email: string
  }

  interface Profile {
    full_name?: string
    company_name?: string
    website?: string
  }

  interface Props {
    data: { user: User; profile: Profile }
    skunkwork: Object // RProduction
  }

  let { data, skunkwork }: Props = $props()

  skunkwork = skunkwork || { name: "My Production" }

  let { user, profile, channel } = data

  let loading = $state(false)
  let fullName: string = profile?.full_name ?? ""
  let companyName: string = profile?.company_name ?? ""
  let website: string = profile?.website ?? ""

  const fieldError = (liveForm: FormAccountUpdateResult, name: string) => {
    let errors = liveForm?.errorFields ?? []
    return errors.includes(name)
  }

  const handleSubmit: SubmitFunction = () => {
    loading = true
    return async ({ update, result }) => {
      await update({ reset: false })
      await applyAction(result)
      loading = false
    }
  }
</script>

<svelte:head>
  <title>Production {skunkwork.name}</title>
</svelte:head>

<div class="Production">
  <div class="flex flex-col w-64 lg:w-80">
    <div>
      <h1 class="text-2xl font-bold mb-6">Production {skunkwork.name}</h1>
      <RSkunkWorks channels={data.channels} user={data.user} visiteds={data.visiteds} />
      <div class="text-sm text-slate-800 mt-14">
        You are logged in as {user?.email}.
        <br />
        <a class="underline" href="/account/sign_out"> Sign out </a>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
	.Production {
		width: 100%;
		height: 100%;
	}
</style>
