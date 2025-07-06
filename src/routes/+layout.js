<script lang="js">
export async function load({ fetch, data }) {
  // you now have access to `data.token`
  const fetchedUser = await getApi(fetch, "/auth/me", data.token);

  return {
    ...data,
    fetchedUser
  };
}
</script>
