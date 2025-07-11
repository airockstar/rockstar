import adapter from "@sveltejs/adapter-auto"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    // allow up to 150kb of style to be inlined with the HTML
    // Faster FCP (First Contentful Paint) by reducing the number of requests
    inlineStyleThreshold: 150000,
    alias: {
        "@skunkworks": 'src/routes/production',
        "@home": 'src/routes/(home)',
        "@src": 'src',
        "@lib": 'src/lib',
        "@utils": 'src/lib/shared/utils',
        "@bundles": 'src/lib/shared/bundles',
        "@components": 'src/shared/components',
        "@api": 'src/lib/api',
        "@shared": 'src/lib/shared',
	"@store": 'src/lib/store',
	"@server": 'src/lib/server',
	"@client": 'src/lib/client',
    }
  },
  preprocess: vitePreprocess(),
}

export default config
