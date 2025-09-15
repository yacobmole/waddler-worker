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
