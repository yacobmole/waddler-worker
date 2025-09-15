#  Waddler doesn't work on Cloudflare Workers
If you import anything from `"waddler"` in cloudflare workers the worker fails due to using NodeJS specific methods and imports

For example:
```bash
✘ [ERROR] Could not resolve "buffer"


  node_modules/.pnpm/@clickhouse+client@1.12.1/node_modules/@clickhouse/client/dist/utils/stream.js:10:25:
        10 │ const buffer_1 = require("buffer");
           ╵                          ~~~~~~~~

    The package "buffer" wasn't found on the file system but is built into node.
    - Add the "nodejs_compat" compatibility flag to your project.
```

The following worker will fail to build.
```ts
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 */

// #region Standalone sql query builder for D1
import { sql } from 'waddler/d1';

const _statement = sql`SELECT 1`.toSQL();
// #endregion Standalone sql query builder for D1

// #region This section causes the worker to fail
import { SQLValues } from 'waddler';

const _test = new SQLValues([]);
// #endregion This section causes the worker to fail

// Exported Worker
export default {
	async fetch(): Promise<Response> {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;
```
