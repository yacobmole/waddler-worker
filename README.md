#  Waddler doesn't work on Cloudflare Workers

due to the dependency on @clickhouse/client, which is not compatible with Cloudflare Workers' runtime environment. when using the waddler/clickhouse the worker fails to start or build.

This repo was created with the following steps:
```bash
pnpm create cloudflare@latest waddler-worker
```
```bash
pnpm add waddler
```

Then adding the following code to the index file cause the worker to fail:
```ts
import { sql } from 'waddler/clickhouse';

sql`SELECT 1`;
```

An bunch of errors like the following for node specific packages occur:
```bash
✘ [ERROR] Could not resolve "buffer"


  node_modules/.pnpm/@clickhouse+client@1.12.1/node_modules/@clickhouse/client/dist/utils/stream.js:10:25:
        10 │ const buffer_1 = require("buffer");
           ╵                          ~~~~~~~~

    The package "buffer" wasn't found on the file system but is built into node.
    - Add the "nodejs_compat" compatibility flag to your project.
```
