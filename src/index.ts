import { envs as env } from './config/plugins/env.plugin';
import { MongoDatabase } from './data/mongo';
import { Server } from './presentation/server';

async function main() {
	const { MONGO_URL, MONGO_DB_NAME } = env;
	await MongoDatabase.connect({ mongoURL: MONGO_URL, dbName: MONGO_DB_NAME });

	Server.start();
}

(async () => {
	main();
})();
