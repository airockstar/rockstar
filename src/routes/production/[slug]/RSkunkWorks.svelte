
<script lang="ts">
  import { writable } from 'svelte/store';
  import PlaygroundLabel from './PlaygroundLabel.svelte';
  import ChatPanel from './ChatPanel.svelte';
  import Sidebar from './Sidebar.svelte';
  import { getLogger } from "@utils/logger";
import { getContext } from 'svelte';

/*
  export let channels;
  export let visiteds;
  export let agents;
  export let artifacts;
  export let user;
  export let profile;
  export let skunkwork;
*/
  const log = getLogger(import.meta.url);



  let activeSelection = writable<{
    type: 'channel' | 'agent' | 'artifact';
    item: string;
  }>({ type: 'channel', item: 'General' });



//  const channels = [
 //   'General', 'Defects', 'Feedback', 'Reports', 'Security', 'Analytics', 'SEO'
//  ];

/*
  const agents = [
    'CEO', 'Admin', 'Troubleshooter', 'SecOps', 'Manager', 'PM', 'Analyst', 
    'Architect', 'UX Designer', 'Developer', 'Code Reviewer', 'Code Committer', 
    'Tester', 'Test Writer', 'QA', 'Documentor', 'DevOps', 'HealthOps'
  ];

  const artifacts = [
    'Code base', 'SCM', 'UI', 'Documents', 'Website', 'Tests', 'Database'
  ];

*/

   let data = getContext('productionData')();


  let { user, profile, channels, agents, artifacts, visiteds, skunkwork } = data


//  let { data }: Props = $props()
//  let { user, profile, channels, visiteds, skunkwork } = data || {}
  log.info("load", "channels=" + JSON.stringify(channels));
  log.info("load", "agents=" + JSON.stringify(agents));
</script>

<div class="flex h-screen bg-gray-50">
  <!-- Left Sidebar -->
  <div class="w-64 bg-gray-800 text-white flex flex-col">
    <Sidebar 
      {channels} 
      {agents} 
      {artifacts} 
      {activeSelection}
    />
  </div>

  <!-- Main Chat Panel -->
  <div class="flex-1 flex flex-col">
    <ChatPanel {activeSelection} />
  </div>
</div>

