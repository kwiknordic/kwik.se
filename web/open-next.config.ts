// default open-next.config.ts file created by @opennextjs/cloudflare
import { defineCloudflareConfig, initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

initOpenNextCloudflareForDev()

export default defineCloudflareConfig({
	// For best results consider enabling R2 caching
	// See https://opennext.js.org/cloudflare/caching for more details
	// incrementalCache: r2IncrementalCache
});
