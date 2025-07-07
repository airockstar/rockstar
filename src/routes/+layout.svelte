<script lang="ts">
  import "../app.css"
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte'
  import { navigating } from "$app/stores"
  import { expoOut } from "svelte/easing"
  import { slide } from "svelte/transition"
  interface Props {
    children?: import("svelte").Snippet
  }

  let { data, children } = $props()
  let { session, supabase } = $derived(data)

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }

      if (event === 'INITIAL_SESSION') {
        // handle initial session
      } else if (event === 'SIGNED_IN') {
        // handle sign in event
      } else if (event === 'SIGNED_OUT') {
        // handle sign out event
      } else if (event === 'PASSWORD_RECOVERY') {
        // handle password recovery event
      } else if (event === 'TOKEN_REFRESHED') {
        // handle token refreshed event
      } else if (event === 'USER_UPDATED') {
        // handle user updated event
      }
    })

    return () => data.subscription.unsubscribe()
  })
</script>

{#if $navigating}
  <!-- 
    Loading animation for next page since svelte doesn't show any indicator. 
     - delay 100ms because most page loads are instant, and we don't want to flash 
     - long 12s duration because we don't actually know how long it will take
     - exponential easing so fast loads (>100ms and <1s) still see enough progress,
       while slow networks see it moving for a full 12 seconds
  -->
  <div
    class="fixed w-full top-0 right-0 left-0 h-1 z-50 bg-primary"
    in:slide={{ delay: 100, duration: 12000, axis: "x", easing: expoOut }}
  ></div>
{/if}
{@render children?.()}
